import { RequestError } from '@scrapmetal/common/errors'
import { errors } from 'faunadb'
import { Context } from 'hono'

export const handleFaunaHTTPError = (error: unknown, c: Context) => {
  const faunaError = error as errors.FaunaHTTPError
  const responseError = faunaError.requestResult.responseContent.errors.at(0)

  console.log(responseError)

  return c.json(
    {
      code: RequestError.InternalError,
      dCode: responseError?.code,
      description: responseError?.description,
    },
    400
  )
}
