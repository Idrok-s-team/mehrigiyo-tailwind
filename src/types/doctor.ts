import { LocalizedType } from './common'

export interface IDoctorTypes extends LocalizedType<'name'> {
  readonly id: number
  image: string
  get_doctors_count: number
}

export interface IDoctor extends LocalizedType<'full_name' | 'description'> {
  readonly id: number
  user: string
  type_doctor: IDoctorTypes
  rate: string
  is_favorite: boolean
  top: boolean
  image: string
  review: number
  experience: string
  created_at: string
}

export interface IDoctorAppointmentResponse {
  readonly id: number
  doctor: IDoctor
  start_time: string
  end_time: string
  status: boolean
  client: number
}

// PARAMS TYPES
export type DoctorFieldParamsType = {
  id: number
  start_time: string
  end_time: string
}
