import { Handler } from 'hono'
import { matchOrigin } from './matchOrigin'

export const cors: Handler = async (c, next) => {
  const origin = c.req.headers.get('origin')

  console.log('ORIGIN', origin)

  if (origin == null || !matchOrigin(origin)) {
    return c.body(null, 403)
  }

  await next()

  c.header('Access-Control-Allow-Origin', origin)
  c.header('Access-Control-Allow-Headers', 'content-type')
  c.header('Access-Control-Allow-Credentials', 'true')
  c.header('Vary', 'origin')
}
