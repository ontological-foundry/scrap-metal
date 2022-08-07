import { Handler, Context } from 'hono'
import { matchOrigin } from '../../utils/matchOrigin'

export const options: Handler = async (c: Context): Promise<Response> => {
  const origin = c.req.headers.get('Origin')

  if (origin == null || !matchOrigin(origin)) {
    return c.body(null, 403)
  }

  return c.body(null, 200, {
    'Access-Control-Allow-Origin': 'https://projectscrapmetal.com',
    'Access-Control-Allow-Header': 'content-type',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'origin'
  })
}
