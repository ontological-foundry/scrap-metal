import { Hono } from 'hono'
import { options } from './routes/options'

import { signIn } from './routes/sign-in'
import { cors } from './utils/cors'

interface Bindings {
  FAUNA_ACCESS_KEY: string
  ORIGIN: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.options('*', options)

app.use('*', cors)

app.post('/sign-in', signIn)

app.onError((error: any, c) => {
  return c.text(error.message, 500)
})

export default app
