export interface IUserMe {
  id: number
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

export type UserFavoriteParamsType = {
  pk: number
}
