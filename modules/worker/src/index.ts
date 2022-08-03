import Router from '@tsndr/cloudflare-worker-router'
import { signIn } from './routes/sign-in'
import { cors } from './utils/cors'
import { options } from './utils/options'

export interface Env {
  FAUNA_ACCESS_KEY: string
  ORIGIN: string
}

const router = new Router()

router.options('*', options)

router.post('/sign-in', cors, signIn)

router.any('*', ({ res }) => {
  res.status = 404
})

export default {
  async fetch(request: Request, env: Env) {
    return router.handle(env, request)
  },
}
