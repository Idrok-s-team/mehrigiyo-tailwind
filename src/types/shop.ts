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
  }[]
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

export interface IShopCart {
  id: number
  amount: number
  get_total_price: number
  user: string
  product: IShopMedicines
}

export type ShopCartParamsType<T extends 'product' | 'id' | 'onlyId'> = T extends 'onlyId'
  ? { id: number }
  : { [K in T]: number } & { amount: number }
