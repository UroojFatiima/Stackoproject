import nodemailer from 'nodemailer'

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? 'sani123456@protonmail.com'

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
      from: process.env.RESEND_FROM ?? 'Stacko <onboarding@resend.dev>',
      to: [NOTIFY_EMAIL],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[Stacko Email - Resend error]', error)
    return false
  }

  return true
}

async function sendEmail(payload: EmailPayload): Promise<{ sent: boolean; message: string }> {
  if (process.env.RESEND_API_KEY) {
    const sent = await sendViaResend(payload)
    if (sent) {
      return { sent: true, message: 'Email sent via Resend.' }
    }
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpPort = Number(process.env.SMTP_PORT ?? '587')

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log('──────────────────────────────────────────────')
    console.log('[Stacko Email] SMTP NOT CONFIGURED — email was NOT sent')
    console.log(`To: ${NOTIFY_EMAIL}`)
    console.log(`Subject: ${payload.subject}`)
    console.log(payload.text)
    console.log('Fix: add RESEND_API_KEY or SMTP_* to .env.local (see README.md)')
    console.log('──────────────────────────────────────────────')
    return {
      sent: false,
      message:
        'Email not sent — SMTP/Resend not configured. Check server console or README for setup steps.',
    }
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? smtpUser,
    to: NOTIFY_EMAIL,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  })

  return { sent: true, message: 'Email sent successfully via SMTP.' }
}

export async function notifyAuthEvent(
  type: 'signup' | 'signin',
  email: string,
): Promise<{ sent: boolean; message: string }> {
  const action = type === 'signup' ? 'signed up' : 'signed in'
  const subject = `[Stacko] User ${action}: ${email}`
  const text = `A user has ${action} to Stacko.\n\nEmail: ${email}\nTime: ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}`
  const html = `
    <h2>Stacko — User ${action}</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Time:</strong> ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}</p>
  `

  return sendEmail({ subject, text, html })
}

export async function notifyOnboardingSubmit(
  details: Record<string, string>,
): Promise<{ sent: boolean; message: string }> {
  const subject = `[Stacko] New onboarding submission: ${details.fullName ?? details.email}`
  const lines = Object.entries(details)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')

  const htmlRows = Object.entries(details)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px;border:1px solid #eee;font-weight:600;">${key}</td><td style="padding:8px;border:1px solid #eee;">${value}</td></tr>`,
    )
    .join('')

  return sendEmail({
    subject,
    text: `New Stacko onboarding submission:\n\n${lines}`,
    html: `
      <h2>Stacko — Onboarding Details Submitted</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        ${htmlRows}
      </table>
      <p style="margin-top:16px;">500 AED investment bonus has been credited to the user's account.</p>
    `,
  })
}
