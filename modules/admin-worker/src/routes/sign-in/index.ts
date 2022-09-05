import { RequestError } from '@scrapmetal/common/errors'
import {
  errors,
  Let,
  Get,
  Login,
  Match,
  Index,
  Var,
  Select,
  Now,
} from 'faunadb'

import { createClient } from '@scrapmetal/common/worker/fauna-client'
import { Handler } from 'hono'
import { validateSignInRequest } from './api-types.validator'

interface SignInResponse {
  token: {
    secret: string
  }
}

export const signIn: Handler = async c => {
  let username: string, password: string
  try {
    const validated = validateSignInRequest(await c.req.json())

    username = validated.username
    password = validated.password
  } catch (error) {
    return c.json({ code: RequestError.NoDataError }, 400)
  }

  const client = createClient(c.env.FAUNA_ACCESS_KEY)

  let response: SignInResponse
  try {
    response = await client.query(
      Let(
        {
          user: Get(Match(Index('admin-by-username'), username)),
          token: Login(Select(['ref'], Var('user')), {
            password,
            data: {
              created: Now(),
              lastUsed: Now(),
            },
          }),
        },
        {
          token: Var('token'),
        }
      )
    )
  } catch (error) {
    const faunaError = error as errors.FaunaHTTPError

    switch (faunaError.requestResult.responseContent.errors[0].code) {
      case 'instance not found':
        return c.json({ code: RequestError.SignInError }, 400)
      default:
        return c.json({ code: RequestError.InternalError }, 500)
    }
  }

  const token = response.token?.secret

  if (token == null) {
    return c.json({ code: RequestError.InternalError }, 500)
  }

  c.cookie('SCRAP-TOKEN', token)

  return c.json({ signedIn: true })
}
