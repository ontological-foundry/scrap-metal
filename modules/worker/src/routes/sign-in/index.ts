import { ErrorCode } from '@scrapmetal/common-types'
import {
  errors,
  Get,
  Index,
  Let,
  Login,
  Match,
  Now,
  Select,
  values,
  Var,
} from 'faunadb'
import { Handler } from 'hono'
import { createClient } from '../../utils/faunaClient'

import { User } from '../../utils/User'
import { validateSignInRequest } from './api-types.validator'

interface SignInResponse {
  token: {
    secret: string
  }
  user: User
  now: values.FaunaTime
}

export const signIn: Handler = async c => {
  // Look for credentials already existing

  const { email, password } = validateSignInRequest(await c.req.json())

  const client = createClient(c.env.FAUNA_ACCESS_KEY)

  let response: SignInResponse
  try {
    response = await client.query(
      Let(
        {
          user: Get(Match(Index('user-by-email'), email)),
          token: Login(Select(['ref'], Var('user')), {
            password: password,
            data: {
              created: Now(),
              lastUsed: Now(),
            },
          }),
        },
        {
          token: Var('token'),
          user: Var('user'),
        }
      )
    )
  } catch (error) {
    const faunaError = error as errors.FaunaHTTPError
    switch (faunaError.requestResult.responseContent.errors[0].code) {
      case 'instance not found':
        return c.json({ code: ErrorCode.BadData }, 400)
      default:
        return c.json({ code: ErrorCode.InternalError }, 500)
    }
  }

  const token = response.token?.secret
  const user = response.user

  if (token == null) {
    return c.json({ code: ErrorCode.InternalError }, 500)
  }

  c.header('Set-Cookie', `SCRAP-TOKEN=${token}`)

  return c.json({ user })
}
