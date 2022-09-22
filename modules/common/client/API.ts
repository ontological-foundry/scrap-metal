import { RequestError } from '../errors'
import { getTarget, TargetName } from './apiTarget'

export interface SuccessfulAPIResponse {
  success: true
  data: unknown
}
interface FailedAPIResponse {
  success: false
  error: {
    code: RequestError
  }
}

const apiCall = async (path: string, args?: RequestInit) => {
  const finalPath = path[0] === '/' ? path : `/${path}`

  const target = getTarget()

  try {
    let response: Response
    if (target === TargetName.Edge) {
      response = await fetch(
        `http://localhost:${process.env.EDGE_API_PORT}${finalPath}`,
        {
          credentials: 'include',
          ...args,
        }
      )
    } else {
      response = await fetch(`${process.env.API_URL}/${target}${finalPath}`, {
        credentials: 'same-origin',
        ...args,
      })
    }

    const json = await response.json()

    return response.ok
      ? {
          success: true,
          data: json,
        }
      : {
          success: false,
          error: json,
        }
  } catch (error) {
    console.log('error')
    return {
      success: false,
      error: {
        code: 'Internal Error',
      },
    }
  }
}

export const postRequest = async <T extends SuccessfulAPIResponse>(
  path: string,
  args?: RequestInit
): Promise<T | FailedAPIResponse> => {
  return (await apiCall(path, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    ...args,
  })) as T | FailedAPIResponse
}

export const getRequest = async <T extends SuccessfulAPIResponse>(
  path: string,
  args?: RequestInit
): Promise<T | FailedAPIResponse> => {
  return (await apiCall(path, {
    method: 'GET',
    ...args,
  })) as T | FailedAPIResponse
}
