'use client'

import { FC, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useUserMeQuery } from '@/hooks/queries'
import {
  ConsultationIcon,
  ControlPanelIcon,
  DeliveryAddressIcon,
  LogoutIcon,
  NotificationIcon,
  OrderIcon,
  PaymentIcon,
  SettingsIcon,
} from '@/assets/icons'

const SidebarModule: FC = () => {
  const { data: userData } = useUserMeQuery()

  const pathname = usePathname()
  const subPath = pathname.split('/')[2]

  const sidebarData = useMemo(
    () => [
      {
        icon: <ControlPanelIcon />,
        title: 'Boshqaruv paneli',
        href: `/control-panel`,
      },
      {
        icon: <ConsultationIcon />,
        title: 'Konsultatsiya',
        href: `/consultation`,
      },
      { icon: <OrderIcon />, title: 'Buyurtmalar', href: `/orders` },
      {
        icon: <DeliveryAddressIcon />,
        title: 'Yetkazish manzili',
        href: `/delivery-address`,
      },
      {
        icon: <PaymentIcon />,
        title: "To'lov usullari",
        href: `/payment-methods`,
      },
      {
        icon: <NotificationIcon />,
        title: 'Bildirishnomalar',
        href: `/notifications`,
      },
      {
        icon: <SettingsIcon />,
        title: 'Sozlamalar',
        href: `/settings`,
      },
    ],
    [],
  )

  const getLinkClassName = (href: string) => {
    const isActive = `/${subPath}` === href
    return clsx('flex items-center gap-[14px] px-2.5 py-2 rounded-xl hover:bg-green-primary/10 duration-200', {
      'bg-green-primary/10': isActive,
    })
  }

  return (
    <div className="flex flex-col w-[272px] sidebar-dashboard  bg-white rounded-t-[30px] shadow-sidebar">
      <section className="flex gap-3 pt-6 pb-4 pl-9 border-b border-b-[#E2E2E280]/50">
        {userData && (
          <Image
            src={userData?.avatar}
            alt={`${userData?.first_name} ${userData?.last_name}`}
            width={35}
            height={35}
            className="border rounded-full border-green-primary shadow-avatar w-9 h-9"
          />
        )}
        <div>
          <h6 className="text-sm">{`${userData?.first_name} ${userData?.last_name}`}</h6>
          <p className="mt-1 text-xs text-gray-primary">{userData?.username}</p>
        </div>
      </section>
      <section className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-3 p-[30px]">
          {sidebarData.map(({ icon, title, href }) => (
            <Link key={title} href={`/dashboard${href}`} className={getLinkClassName(href)}>
              <span>{icon}</span>
              <span>{title}</span>
            </Link>
          ))}
        </div>
        <div>
          <button className="flex items-center gap-[14px] py-5 pr-3 ml-9">
            <span>
              <LogoutIcon />
            </span>
            <span className="text-gray-primary">Chiqish</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export default SidebarModule
