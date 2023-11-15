'use client'

import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { BasketIcon, FavouriteOutlineIcon, UserIcon } from '@/assets/icons'

export const HeaderActions: FC = ({}) => {
  const pathname = usePathname()

  const actions = [
    {
      icon: <UserIcon color={pathname === '/saved_doctors' ? '#fff' : '#7165E3'} />,
      name: `Sevimli doktorlar`,
      href: `/saved_doctors`,
      // count: favoriteDoctors.data?.count,
    },
    {
      icon: <FavouriteOutlineIcon color={pathname === '/favourite_products' ? '#fff' : '#F3603F'} />,
      name: `Sevimli mahsulotlar`,
      href: `/favourite_products`,
      // // count: favoriteProducts.data?.count,
    },
    {
      icon: <BasketIcon color={pathname === '/basket' ? '#fff' : '#505050'} />,
      name: `Savat`,
      href: `/basket`,
      // count: shopCartQuery.data?.data.length,
    },
  ]

  const className = clsx('flex items-center justify-center w-7 h-7 rounded-full bg-red-200')

  return (
    <div className="flex items-center gap-3">
      {actions.map(({ name, href, icon }) => (
        <Link key={name} href={href}>
          <div className={`${className} ${pathname === href && 'bg-green-primary'}`}>{icon}</div>
        </Link>
      ))}
    </div>
  )
}
