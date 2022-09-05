import { Handler, Context } from 'hono'
import { matchOrigin } from '../../middleware/cors/matchOrigin'

export const options: Handler = async (c: Context) => {
  const origin = c.req.headers.get('origin')

  if (origin == null || !matchOrigin(origin)) {
    return c.body(null, 403)
  }

  return c.body(null, 200, {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'origin'
  })
}