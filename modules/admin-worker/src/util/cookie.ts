import { createClient } from '@scrapmetal/common/worker/fauna-client'
import { Context } from 'hono'

export const cookieName = 'SCRAP-TOKEN'

export const createClientFromCookie = (c: Context) => {
  const key = c.req.cookie(cookieName)
  return createClient(key)
}
