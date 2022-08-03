import type { RouterHandler } from '@tsndr/cloudflare-worker-router'
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

export const signIn: RouterHandler = async ({ req, res, env }) => {
  const { email, password } = req.body as SignInRequest

  const client = createClient(env.FAUNA_ACCESS_KEY)

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
    res.status = 500
    res.body = {
      code: 'Error',
    }
    return
  }

  res.status = 200
  res.body = {
    message: 'Good?',
  }
}
