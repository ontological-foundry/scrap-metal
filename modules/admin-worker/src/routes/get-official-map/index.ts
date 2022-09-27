import { MapData } from '@scrapmetal/common/types/MapData'
import { Collection, Get, Ref } from 'faunadb'
import { Handler } from 'hono'
import { createClientFromCookie } from '../../util/cookie'
import { handleFaunaHTTPError } from '../../util/handleFaunaHTTPError'

interface OfficialMapResponse {
  data: MapData
}

export const getOfficialMap: Handler = async c => {
  const id = c.req.param('id')

  const client = createClientFromCookie(c)

  let map
  try {
    const result = await client.query<OfficialMapResponse>(
      Get(Ref(Collection('official-maps'), id))
    )

    map = result.data
  } catch (error) {
    return handleFaunaHTTPError(error, c)
  }

  return c.json(map)
}
