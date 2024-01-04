import { LocalizedType } from './index'

export interface IUserMe {
  readonly id: number
  username: string | number
  first_name: string
  last_name: string
  email: string
  avatar: string
  address: {
    id: number
    name: string
    name_uz: string
    name_ru: string
    name_en: string
    delivery_price: number
    country: number
  }
  language: string
  favorite_medicine: any[]
  favorite_doctor: any[]
  theme_mode: number
}

export interface IUserRegistration {
  username: string
  first_name: string
  last_name: string
  password: string
  email: string
  avatar: string
}

export interface IUserDeliverAddress {
  readonly id: number
  name: string
  region: IUserRegion
  full_address: string
  apartment_office: string
  floor: string
  door_or_phone: string
  instructions: string
}

export interface IUserRegion extends LocalizedType<'name'> {
  readonly id: number
  delivery_price: number
  country: number
}

export interface IUserCountry extends LocalizedType<'name'> {
  readonly id: number
}

// PARAMS TYPES
export type UserFieldParamsType = {
  region_id: number
  pk: number
  phone: string
  new_password: string
  link: boolean
}
