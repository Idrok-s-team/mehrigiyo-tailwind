import { LocalizedType } from './common'

export interface IShopTypes extends LocalizedType<'name'> {
  readonly id: number
  image: string
  icon: string
}

export interface IShopMedicines extends LocalizedType<'name' | 'title' | 'description'> {
  readonly id: number
  pictures: {
    id: number
    image: string
  }
  image: string
  quantity: number
  review: number
  rate: number
  weight: number
  cost: number
  discount: number
  created_at: string
  type_medicine: number
}
