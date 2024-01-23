import React from 'react'
import { ActiveLink, Dropdown } from '@/components/common'
import { useDoctorTypesQuery, useShopTypesQuery } from '@/hooks/queries'
import { ROUTES } from '@/constants'

const useNavElements = () => {
  const { data: shopTypesData } = useShopTypesQuery()
  const { data: doctorTypesData } = useDoctorTypesQuery()

  const createProductDropdownItems = () => {
    const productItems =
      shopTypesData?.results?.slice(0, 4).map((product) => ({
        label: product.name,
        path: `${ROUTES.PRODUCTS_CATEGORY}?type=${product.id}`,
      })) || []

    return [...productItems, { label: 'Hammasi+', path: ROUTES.PRODUCTS_CATEGORY }]
  }

  const createDoctorDropdownItems = () => {
    const doctorItems =
      doctorTypesData?.results?.slice(0, 4).map((doctor) => ({
        label: doctor.name,
        path: `${ROUTES.ONLINE_DOCTORS_CATEGORY}?type=${doctor.id}`,
      })) || []

    return [...doctorItems, { label: 'Hammasi+', path: ROUTES.ONLINE_DOCTORS_CATEGORY }]
  }

  const navElements = [
    { label: 'Bosh sahifa', mainPath: ROUTES.HOME, selected: true },
    { label: 'Mahsulotlar', mainPath: ROUTES.PRODUCTS, dropdownItems: createProductDropdownItems() },
    { label: 'Onlayn shifokorlar', mainPath: ROUTES.ONLINE_DOCTORS, dropdownItems: createDoctorDropdownItems() },
    { label: 'Biz haqimizda', mainPath: ROUTES.ABOUT_US },
    { label: 'Yangiliklar', mainPath: ROUTES.NEWS },
    {
      label: 'Yordam',
      mainPath: ROUTES.HELP,
      dropdownItems: [
        { label: 'Yordam', path: ROUTES.HELP },
        { label: "Ko'p so'raladigan savollar", path: ROUTES.HELP_FAQ },
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
