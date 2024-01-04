export interface IUserPayload {
  email: string
  sub: number
  name: string
  surname: string
  active: boolean
  iat?: number
  exp?: number
}

export interface UserToken {
  accessToken: string
}
