'use client'

import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { BasketIcon, FavouriteOutlineIcon, UserIcon } from '@/assets/icons'
import { useShopCartQuery, useUserFavoriteDoctorsQuery, useUserFavoriteMedicinesQuery } from '@/hooks/queries'
import { ROUTES } from '@/constants'
import { useAuthStore } from '@/store'

const HeaderActions: FC = () => {
  const pathname = usePathname()
  const { isUserRegistered } = useAuthStore()
  const { data: favoriteProductsData } = useUserFavoriteMedicinesQuery({ options: { enabled: isUserRegistered } })
  const { data: favoriteDoctorsData } = useUserFavoriteDoctorsQuery({ options: { enabled: isUserRegistered } })
  const { data: shopCartData } = useShopCartQuery({ options: { enabled: isUserRegistered } })
  const isWithToken = !!Cookies.get('access_token')

  const actions = [
    {
      icon: <UserIcon color={pathname === ROUTES.FAVORITE_DOCTORS ? '#fff' : '#7165E3'} />,
      name: `Sevimli doktorlar`,
      href: `/favorite_doctors`,
      count: isWithToken ? favoriteDoctorsData?.count : 0,
    },
    {
      icon: <FavouriteOutlineIcon color={pathname === ROUTES.FAVORITE_PRODUCTS ? '#fff' : '#F3603F'} />,
      name: `Sevimli mahsulotlar`,
      href: `/favorite_products`,
      count: isWithToken ? favoriteProductsData?.count : 0,
    },
    {
      icon: <BasketIcon color={pathname === ROUTES.CART ? '#fff' : '#505050'} />,
      name: `Savat`,
      href: `/cart`,
      count: isWithToken ? shopCartData?.data.length : 0,
    },
  ]

  const className = clsx(
    'flex items-center shadow-action-button justify-center w-[30px] h-[30px] rounded-full bg-white',
  )

  return (
    <div className="flex items-center gap-4">
      {actions.map(({ name, href, icon, count }) => (
        <Link key={name} href={href} className="relative" title={name}>
          <div className={`${className} ${pathname === href ? '!bg-green-primary' : ''}`}>{icon}</div>
          {Number(count) > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-[#F3603F] text-white text-xs">
              {count}
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}

export default HeaderActions
