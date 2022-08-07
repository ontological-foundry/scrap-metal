import { Hono } from 'hono'

import { signIn } from './routes/sign-in'
import { cors } from './utils/cors'
import { options } from './routes/options'

export interface Env {
  FAUNA_ACCESS_KEY: string
  ORIGIN: string
}

const app = new Hono<Env>()

app.options('*', options)

app.use('*', cors)

app.post('/sign-in', signIn)

app.post('*', async c => {
  const body = await c.req.parseBody()

  console.log('BODY', body)

  return c.json({ message: 'hi' })
})

export default app
