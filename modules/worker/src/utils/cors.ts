import { Handler } from 'hono'
import { matchOrigin } from './matchOrigin'

export const cors: Handler = async (c, next) => {
  const origin = c.req.headers.get('origin')

  if (origin == null || !matchOrigin(origin)) {
    return c.body(null, 403)
  }

  await next()

  c.header('Access-Control-Allow-Origin', origin)
  c.header('Vary', 'origin')
  c.header('Access-Control-Allow-Header', 'content-type')
  c.header('Access-Control-Allow-Credentials', 'true')
}
