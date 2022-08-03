import { RouterContext } from '@tsndr/cloudflare-worker-router'

export function options({ req, res }: RouterContext) {
  const origin = req.headers.get('Origin')

  if (origin == null || origin !== 'https://projectscrapmetal.com') {
    res.status = 403
    return
  }

  res.status = 200
  res.headers.set(
    'Access-Control-Allow-Origin',
    'https://projectscrapmetal.com'
  )
  res.headers.set('Access-Control-Allow-Header', 'content-type')
  res.headers.set('Access-Control-Allow-Credentials', 'true')
}
