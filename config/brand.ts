/**
 * Brand customization — change your logo here.
 *
 * Option A (letter logo): leave logoImage as null — uses red box + letter.
 * Option B (image logo): set logoImage to a file in /public, e.g. '/logo.png'
 *
 * Add your logo file to: public/logo.png (or any path under public/)
 */
export const brand = {
  name: 'Stacko',
  logoImage: null as string | null,
  logoLetter: 'S',
  welcomeText: 'Welcome to Stacko',
  tagline: 'Banking reimagined for the modern investor.',
}

/**
 * Slideshow images — add/replace files in: public/slideshow/
 * Supported names: slide-1.png, slide-2.png, slide-3.png (or .jpg / .webp)
 * Update paths below if you use different filenames.
 */
export const slideshowImages = {
  folder: '/slideshow',
  slides: ['slide-1.png', 'slide-2.png', 'slide-3.png'],
}
