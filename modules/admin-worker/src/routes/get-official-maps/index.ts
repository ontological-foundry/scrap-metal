import { RequestError } from '@scrapmetal/common/errors'
import { errors, Index, Match, Paginate, values } from 'faunadb'
import { Handler } from 'hono'
import { createClientFromCookie } from '../../util/cookie'

interface MapsResponse {
  data: [values.Ref, string][]
}

export const getOfficialMaps: Handler = async c => {
  const client = createClientFromCookie(c)

  let unpublishedResponse: MapsResponse
  let publishedResponse: MapsResponse
  try {
    unpublishedResponse = await client.query<MapsResponse>(
      Paginate(Match(Index('official-maps-by-published'), false))
    )

    publishedResponse = await client.query<MapsResponse>(
      Paginate(Match(Index('official-maps-by-published'), true))
    )
  } catch (error) {
    const faunaError = error as errors.FaunaHTTPError

    console.log(faunaError)
    return c.json({ code: RequestError.InternalError }, 500)
  }

  const data = {
    unpublished: unpublishedResponse.data.map(element => ({
      id: element[0].id,
      name: element[1],
    })),
    published: publishedResponse.data.map(element => ({
      id: element[0].id,
      name: element[1],
    })),
  }

  return c.json(data)
}
