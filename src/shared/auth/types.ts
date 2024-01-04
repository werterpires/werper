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

export interface IUserFromJwt {
  email: string
  userId: number
  name: string
  surname: string
  active: boolean
}
