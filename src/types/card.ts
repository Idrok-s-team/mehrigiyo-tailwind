export interface ICard {
  readonly id: number
  number: string
  expire: string
  verify: boolean
  is_deleted: boolean
}

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

export interface IDeleteCardResponse {
  result: {
    success: boolean
  }
  jsonrpc: string
}

// PARAMS TYPES
export type CardFieldParamsType = {
  number: string
  expire: string
  card_id: number
  code: string
}
