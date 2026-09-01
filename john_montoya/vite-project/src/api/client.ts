const BASE_URL = import.meta.env.VITE_API_URL

export type FieldErrors = Record<string, string[]>

/** Error carrying Laravel's 422 field errors, when the response had any. */
export class ApiError extends Error {
  readonly status: number
  readonly errors: FieldErrors

  constructor(message: string, status: number, errors: FieldErrors = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(
      body?.message ?? `Request failed with status ${response.status}`,
      response.status,
      body?.errors ?? {},
    )
  }

  return body as T
}
