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
} from 'faunadb'
import { User } from '../../utils/User'

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
  const { email, password } = await c.req.json<SignInRequest>()

  console.log('ACCESS', c.env.FAUNA_ACCESS_KEY)

  const client = createClient(c.env.FAUNA_ACCESS_KEY)

  const response: SignInResponse = await client.query(
    Let(
      {
        user: Get(Match(Index('user-by-email')), email),
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

  const token = response.token?.secret
  const user = response.user

  if (token == null) {
    return c.json({ code: 'Error' }, 500)
  }

  return c.json({ message: 'Good?' })
}
