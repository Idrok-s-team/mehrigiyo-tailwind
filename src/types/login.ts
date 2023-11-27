export interface ILoginParams {
  username: string
  password: string
}

export interface ILoginResponse {
  refresh: string
  access: string
}
