'use client'

import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { BasketIcon, FavouriteOutlineIcon, UserIcon } from '@/assets/icons'
import { useShopCartQuery, useUserFavoriteMedicinesQuery } from '@/hooks/queries'

const HeaderActions: FC = ({}) => {
  const pathname = usePathname()
  const { data: favoritesData } = useUserFavoriteMedicinesQuery()
  const { data: shopCartData } = useShopCartQuery()

  const actions = [
    {
      icon: <UserIcon color={pathname === '/saved_doctors' ? '#fff' : '#7165E3'} />,
      name: `Sevimli doktorlar`,
      href: `/saved_doctors`,
      // count: favoriteDoctors.data?.count,
    },
    {
      icon: <FavouriteOutlineIcon color={pathname === '/favorites' ? '#fff' : '#F3603F'} />,
      name: `Sevimli mahsulotlar`,
      href: `/favorites`,
      count: favoritesData?.count,
    },
    {
      icon: <BasketIcon color={pathname === '/cart' ? '#fff' : '#505050'} />,
      name: `Savat`,
      href: `/cart`,
      count: shopCartData?.data.length,
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
