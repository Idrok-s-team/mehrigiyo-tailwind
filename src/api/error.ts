import { ApiErrorDetail } from '@/types'

export class ApiError extends Error {
  public statusCode: number
  public errorData: ApiErrorDetail

  constructor(errorData: ApiErrorDetail, statusCode: number) {
    super(errorData.detail)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errorData = errorData
  }
}
