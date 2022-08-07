import { Handler, Context } from 'hono'
import { matchOrigin } from '../../utils/matchOrigin'

export const options: Handler = async (c: Context): Promise<Response> => {
  const origin = c.req.headers.get('Origin')

  if (origin == null || !matchOrigin(origin)) {
    c.status(403)
  } else {
    c.status(200)

    c.res.headers.set(
      'Access-Control-Allow-Origin',
      'https://projectscrapmetal.com'
    )
    c.res.headers.set('Access-Control-Allow-Header', 'content-type')
    c.res.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  return c.res
}
