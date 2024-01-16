import React from 'react'
import { ActiveLink, Dropdown } from '@/components/common'
import { useDoctorTypesQuery, useShopTypesQuery } from '@/hooks/queries'

const useNavElements = () => {
  const { data: shopTypesData } = useShopTypesQuery()
  const { data: doctorTypesData } = useDoctorTypesQuery()

  const createProductDropdownItems = () => {
    const productItems =
      shopTypesData?.results?.slice(0, 4).map((product) => ({
        label: product.name,
        path: `/products/category?type=${product.id}`,
      })) || []

    return [...productItems, { label: 'Hammasi+', path: '/products/category' }]
  }

  const createDoctorDropdownItems = () => {
    const doctorItems =
      doctorTypesData?.results?.slice(0, 4).map((doctor) => ({
        label: doctor.name,
        path: `/online_doctors/category?type=${doctor.id}`,
      })) || []

    return [...doctorItems, { label: 'Hammasi+', path: '/online_doctors/category' }]
  }

  const navElements = [
    { label: 'Bosh sahifa', mainPath: '/', selected: true },
    { label: 'Mahsulotlar', mainPath: '/products', dropdownItems: createProductDropdownItems() },
    { label: 'Onlayn shifokorlar', mainPath: '/online_doctors', dropdownItems: createDoctorDropdownItems() },
    { label: 'Biz haqimizda', mainPath: '/about_us' },
    { label: 'Yangiliklar', mainPath: '/news' },
    {
      label: 'Yordam',
      mainPath: '/help',
      dropdownItems: [
        { label: 'Yordam', path: '/help' },
        { label: "Ko'p so'raladigan savollar", path: '/help/faq' },
      ],
    },
  ]

  const renderNavElements = () =>
    navElements.map(({ label, mainPath, dropdownItems }) =>
      dropdownItems ? (
        <ActiveLink href={mainPath} key={label}>
          <Dropdown
            title={label}
            items={dropdownItems.map((item) => ({ label: item.label, id: item.path, path: item.path }))}
            linkable
          />
        </ActiveLink>
      ) : (
        <ActiveLink href={mainPath} key={label}>
          {label}
        </ActiveLink>
      ),
    )

  return { navElements, renderNavElements }
}

export default useNavElements
