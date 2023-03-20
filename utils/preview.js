export function linkPreviewStyle(ctx) {
  const ua = ctx.req.headers['user-agent']?.toLowerCase() || ''

  if (ua.includes('telegrambot')) return 'telegram'
  if (ua.includes('twitterbot')) return 'twitter'
  if (!ctx.req.headers['accept']?.includes('text/html')) return 'unknown'
  return null
}
