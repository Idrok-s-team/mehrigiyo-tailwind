import { LocalizedNamesType } from './common'

export interface IShopTypes extends LocalizedNamesType {
  readonly id: number
  image: string
  icon: string
}

export interface IShopMedicines extends LocalizedNamesType {
  readonly id: number
  pictures: {
    id: number
    image: string
  }
  image: string
  title: string
  title_uz: string
  title_ru: string
  title_en: string
  order_count: number
  description: string
  description_uz: string
  description_ru: string
  description_en: string
  quantity: number
  review: number
  rate: number
  weight: number
  cost: number
  discount: number
  created_at: string
  type_medicine: number
}
