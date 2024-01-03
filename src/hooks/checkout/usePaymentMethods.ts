import { useGetCardQuery } from '@/hooks/queries'
import { formatPlasticCardNumber } from '@/utils'
import { SwitchableRadioType } from '@/components/common/SwitchableRadio/SwitchableRadio'

const usePaymentMethods = () => {
  const { data: cardsData, isSuccess: isPaymentSuccess, refetch: refetchPayments } = useGetCardQuery()

  const cashPayment = [{ key: 1, title: 'Naqd pul', type: 'cash' }]
  const paymentMethods = cardsData?.data
    ?.filter((item) => item.verify)
    .map((data) => ({
      key: data.id,
      title: formatPlasticCardNumber(data.number),
      type: 'plastic',
      data,
    })) as SwitchableRadioType[]

  return { paymentMethods, isPaymentSuccess, refetchPayments }
}

export default usePaymentMethods
