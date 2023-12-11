export interface ICard {
  readonly id: number
  number: string
  expire: string
  verify: boolean
  is_deleted: boolean
}

export type AddCardParamsType = Pick<ICard, 'number' | 'expire'>

export interface ICardError {
  uz: string
  error: {
    message: string
    code: number
    data: string
  }
  jsonrpc: string
}

export interface IVerifyCard {
  result: {
    phone: string
    sent: boolean
  }
  jsonrpc: string
}
