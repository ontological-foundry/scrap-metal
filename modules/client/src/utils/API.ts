import { RequestError } from '@scrapmetal/common/errors'
import { TargetName, getTarget } from '@scrapmetal/common/api-target'

export interface SuccessfulAPIResponse extends Response {
  success: true
  data: unknown
}
interface FailedAPIResponse extends Response {
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
      response = await fetch(`http://localhost:9000${finalPath}`, {
        credentials: 'include',
        ...args,
      })
    } else {
      response = await fetch(
        `https://api.projectscrapmetal.com/${target}${finalPath}`,
        {
          credentials: 'same-origin',
          ...args,
        }
      )
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
