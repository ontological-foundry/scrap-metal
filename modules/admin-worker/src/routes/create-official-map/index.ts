import { Collection, Create, values } from 'faunadb'
import { Handler } from 'hono'
import { createClientFromCookie } from '../../util/cookie'
import { handleFaunaHTTPError } from '../../util/handleFaunaHTTPError'
import { validateCreateMapRequest } from './api-types.validator'

interface CreateMapResponse {
  ref: values.Ref
}

export const createOfficialMap: Handler = async c => {
  const body = validateCreateMapRequest(await c.req.json())

  const client = createClientFromCookie(c)

  const defaultContent = {
    size: {
      height: 15,
      width: 15,
    },
    terrain: Array(15).fill(Array(15).fill(0)),
  }

  let response: CreateMapResponse
  try {
    response = await client.query(
      Create(Collection('official-maps'), {
        data: {
          name: body.name,
          content: defaultContent,
          published: false,
        },
      })
    )
  } catch (error) {
    return handleFaunaHTTPError(error, c)
  }

  return c.json({ id: response.ref.id })
}
