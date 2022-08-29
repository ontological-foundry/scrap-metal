import { createClient } from '@scrapmetal/common/worker/fauna-client'
import { Handler } from 'hono'
import { validateSignInRequest } from './api-types.validator'

export const signIn: Handler = async c => {
  const { email, password } = validateSignInRequest(await c.req.json())

  const client = createClient('')
}
