import { RouterContext } from '@tsndr/cloudflare-worker-router'

export function cors({ req, res, env }: RouterContext) {
  console.log(env.ORIGIN)
}
