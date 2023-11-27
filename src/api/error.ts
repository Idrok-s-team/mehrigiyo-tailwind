import { IApiErrorData } from '@/types'

export class ApiError extends Error {
  data: IApiErrorData

  constructor(message: string, data: IApiErrorData) {
    super(message)
    this.data = data
    this.name = 'ApiError'
  }
}
