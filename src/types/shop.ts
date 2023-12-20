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
  payment_type: PaymentTypeValue
  payment_status: PaymentStatusValue
  delivery_status: DeliveryStatusValue
  created_at: string
  user: number
  credit_card: number
  delivery: number
}

export type PaymentTypeValue = 1 | 2 | 3
export type PaymentTypeKey = 'PayOnDelivery' | 'CreditCard' | 'BankTransfer'

export type PaymentStatusValue = 1 | 2 | 3 | 4 | 5 | 6
export type PaymentStatusKey = 'Pending' | 'Error' | 'Completed' | 'Canceled' | 'Expired' | 'Refunded'

export type DeliveryStatusValue = 1 | 2 | 3 | 4
export type DeliveryStatusKey = 'Pending' | 'OnDelivery' | 'Delivered' | 'Returned'

// PARAMS TYPES
export type ShopFieldParamsType = {
  id: number
  product: number
  amount: number
  list: string
  shipping_address: number
  credit_card: number
}
