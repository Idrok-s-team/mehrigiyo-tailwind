import {
  DeliveryStatusKey,
  DeliveryStatusValue,
  PaymentStatusKey,
  PaymentStatusValue,
  PaymentTypeKey,
  PaymentTypeValue,
} from '@/types'

export const PaymentType: Record<PaymentTypeValue, PaymentTypeKey> = {
  1: 'PayOnDelivery',
  2: 'CreditCard',
  3: 'BankTransfer',
}

export const PaymentStatusMap: Record<PaymentStatusValue, PaymentStatusKey> = {
  1: 'Pending',
  2: 'Error',
  3: 'Completed',
  4: 'Canceled',
  5: 'Expired',
  6: 'Refunded',
}

export const DeliveryStatusMap: Record<DeliveryStatusValue, DeliveryStatusKey> = {
  1: 'Pending',
  2: 'OnDelivery',
  3: 'Delivered',
  4: 'Returned',
}
