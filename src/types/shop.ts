import { LocalizedType } from './common'
import { IUserDeliverAddress } from './user'

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
  readonly id: number
  amount: number
  get_total_price: number
  user: string
  product: IShopMedicines
}

export interface IShopCheckout {
  readonly id: number
  shipping_address: IUserDeliverAddress
  cart_products: IShopCart[]
  price: number
  payment_type: EPaymentType
  payment_status: EPaymentStatus
  delivery_status: EDelivery_Status
  created_at: string
  user: number
  credit_card: number
  delivery: number
}

// SHOP TYPES
export enum EPaymentType {
  PayOnDelivery = 1,
  CreditCard = 2,
  BankTransfer = 3,
}

export enum EPaymentStatus {
  Pending = 1,
  Error = 2,
  Completed = 3,
  Canceled = 4,
  Expired = 5,
  Refunded = 6,
}

export enum EDelivery_Status {
  Pending = 1,
  OnDelivery = 2,
  Delivered = 3,
  Returned = 4,
}

// PARAMS TYPES
export type ShopFieldParamsType = {
  id: number
  product: number
  amount: number
  list: string
  shipping_address: number
  credit_card: number
}
