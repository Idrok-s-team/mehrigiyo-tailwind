import { SwitchableRadioType } from '@/components/common/SwitchableRadio/SwitchableRadio'
import { useUserDeliveryAddressQuery } from '@/hooks/queries'

const useUserAddresses = () => {
  const { data: addressData, isSuccess: isAddressSuccess, refetch: refetchAddresses } = useUserDeliveryAddressQuery()

  const addressDataFormatted = addressData?.results.map(
    (data) =>
      ({
        key: data.id,
        title: data.name,
        description: data.full_address,
        type: 'address',
        data,
      }) ?? [],
  ) as SwitchableRadioType[]

  return { addressData: addressDataFormatted, isAddressSuccess, refetchAddresses }
}

export default useUserAddresses
