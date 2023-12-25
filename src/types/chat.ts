export interface IChat {
  readonly id: number
  get_doctor_fullname: string
  get_client_fullname: string
  token: string
  created_at: string
}

export interface IChatFile {
  readonly id: number
  image: string
  file: string
  size: string
  video: boolean
}

export interface IChatMessage {
  readonly id: number
  file_message: IChatFile
  text: string
  created_at: string
  owner: boolean
}

export interface IChatRoom {
  readonly id: number
  client: string
  doktor: string
  last_message: IChatMessage
  advice_time: string
  token: string
  created_at: string
}

// PARAMS TYPES
export type ChatFieldParamsType = {
  pk: number
  size: string
  video: boolean
  chat_id: number
}
