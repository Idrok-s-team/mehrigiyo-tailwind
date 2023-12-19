import React, { FC, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { clearObject, inputHandler } from '@/utils'
import { Input, Modal, Select } from '@/components'
import { ISelectOption, IUserDeliverAddress } from '@/types'
import { useAddUserDeliverAddressMutation } from '@/hooks/mutations'
import { useUserCountryQuery, useUserRegionQuery } from '@/hooks/queries'

interface ICardActionModal {
  isOpenModal: boolean
  setIsOpenModal: (modal: boolean) => void
  refetchAddress: () => void
}

const initialAddressDetails = {
  name: '',
  full_address: '',
  apartment_office: '',
  floor: '',
  door_or_phone: '',
  instructions: '',
}

const AddressActionModal: FC<ICardActionModal> = ({ isOpenModal, setIsOpenModal, refetchAddress }) => {
  const [addressDetails, setAddressDetails] = useState(initialAddressDetails)
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null)
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null)

  const { data: countryData } = useUserCountryQuery({ options: { enabled: !!isOpenModal } })
  const { data: regionData } = useUserRegionQuery(
    { pk: selectedCountryId as number },
    { options: { enabled: !!selectedCountryId } },
  )
  const { mutateAsync: addAddress, isPending: isAddingAddress } = useAddUserDeliverAddressMutation()

  const countrySelectOptions: ISelectOption[] = useMemo(
    () =>
      countryData?.data.map((item) => ({
        label: item.name,
        value: item.id,
        selected: item.name === "O'zbekiston",
      })) || [],
    [countryData?.data],
  )

  const regionSelectOptions = useMemo(() => {
    if (regionData?.data) {
      return (
        (regionData?.data.map((item) => ({
          label: item.name,
          value: item.id,
          selected: item.name === "O'zbekiston",
        })) as ISelectOption[]) || []
      )
    }
  }, [regionData?.data])

  useEffect(() => {
    countrySelectOptions.forEach((item) => {
      if (item.selected) {
        setSelectedCountryId(Number(item.value))
      }
    })
  }, [countrySelectOptions])

  const handleAddAddress = async () => {
    const { name, full_address, apartment_office } = addressDetails

    if (name.length && full_address.length && apartment_office.length) {
      const clearData = clearObject({ ...addressDetails, region: selectedRegionId })
      const response = await addAddress(clearData as IUserDeliverAddress)

      try {
        toast.success("Manzil muvaffaqiyatli qo'shildi")
        setAddressDetails(initialAddressDetails)
        refetchAddress()
        setIsOpenModal(false)
      } catch (error) {
        toast.error("Nimadur xato bo'ldi, iltimos qayta tekshirib ko'ring!")
      }
    }
  }

  const handleCloseModal = () => {
    setAddressDetails(initialAddressDetails)
    setIsOpenModal(false)
  }

  return (
    <Modal
      onSubmit={handleAddAddress}
      onClose={handleCloseModal}
      isOpen={isOpenModal}
      disabled={isAddingAddress}
      buttonText={isAddingAddress ? "Manzil qo'shilmoqda..." : "Manzil qo'shish"}
    >
      <h4 className="text-center">Manzil qo'shish</h4>
      <div className="mt-3 flex flex-col gap-8 max-h-[50vh] overflow-auto">
        <Select
          id="country"
          name="country"
          label="Mamlakat"
          options={countrySelectOptions || []}
          onChange={(e) => setSelectedCountryId(Number(e.target.value))}
        />
        <Select
          id="country"
          name="country"
          label="Shahar yoki tuman"
          options={regionSelectOptions || []}
          required
          onChange={(e) => setSelectedRegionId(Number(e.target.value))}
        />
        <Input
          id="name"
          name="name"
          label="Manzil nomi"
          placeholder="e.g., Toshkent shahar, Yunusobod tumani"
          autoComplete="address"
          required
          onChange={inputHandler(setAddressDetails)}
        />
        <Input
          id="full_address"
          name="full_address"
          label="To'liq manzil"
          placeholder="e.g., 12-kvartal, 10-uy"
          autoComplete="full_address"
          required
          onChange={inputHandler(setAddressDetails)}
        />
        <div className="flex items-center justify-between">
          <Input
            id="apartment_office"
            name="apartment_office"
            label="Ofis yoki kvartira"
            placeholder="e.g., ofis"
            autoComplete="apartment_office"
            required
            onChange={inputHandler(setAddressDetails)}
          />
          <Input
            id="floor"
            name="floor"
            label="Qavat (ixtiyoriy)"
            placeholder="e.g., 4-qavat"
            autoComplete="floor"
            className="mt-2"
            onChange={inputHandler(setAddressDetails)}
          />
        </div>
        <Input
          id="door_or_phone"
          name="door_or_phone"
          label="Eshik raqami (ixtiyoriy)"
          placeholder="e.g., 14"
          autoComplete="door_or_phone"
          onChange={inputHandler(setAddressDetails)}
        />
        <Input
          id="instructions"
          name="instructions"
          label="Kuryer uchun qo'shimcha ma'lumot (ixtiyoriy)"
          placeholder="e.g., 5-dom"
          autoComplete="instructions"
          onChange={inputHandler(setAddressDetails)}
        />
      </div>
    </Modal>
  )
}

export default AddressActionModal
