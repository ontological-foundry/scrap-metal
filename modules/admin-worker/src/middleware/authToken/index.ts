import { RequestError } from '@scrapmetal/common/errors'
import { Handler } from 'hono'
import { cookieName } from '../../util/cookie'

export const authToken: Handler = async (c, next) => {
  if (c.req.cookie(cookieName) == null) {
    return c.json(
      {
        code: RequestError.NoDataError,
      },
      400
    )
  }

  await next()
}
