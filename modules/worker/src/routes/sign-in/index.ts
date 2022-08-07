import { Handler } from 'hono'
import { createClient } from '../../utils/faunaClient'
import {
  Let,
  Get,
  Match,
  Index,
  Var,
  Login,
  Select,
  Now,
  values,
  errors,
} from 'faunadb'

import { User } from '../../utils/User'
import { ErrorCode } from '@scrapmetal/common-types'

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  token: {
    secret: string
  }
  user: User
  now: values.FaunaTime
}

export const signIn: Handler = async c => {
  // Look for credentials already existing

  const { email, password } = await c.req.json<SignInRequest>()

  if (
    email == null ||
    email.length < 1 ||
    password == null ||
    password.length < 1
  ) {
    // TODO: More validation?

    return c.json({ code: ErrorCode.BadData }, 400)
  }

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
        return c.json({ code: 'Unknown' }, 500)
    }
  }

  const token = response.token?.secret
  const user = response.user

  if (token == null) {
    return c.json({ code: 'Error' }, 500)
  }

  return c.json({ message: 'Good?' })
}
