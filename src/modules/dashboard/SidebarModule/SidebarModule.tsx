'use client'

import { FC, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
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
import { Confirm } from '@/components/common'
import { useCommonStore } from '@/store'
import { ROUTES } from '@/constants'

const SidebarModule: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const subPath = pathname.split('/')[2]

  const { activeModal, setActiveModal } = useCommonStore()
  const { data: userData, refetch } = useUserMeQuery()

  const handleLogout = async () => {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    await router.push('/')
    setActiveModal(null)
    refetch()
    toast.success('Akkountdan chiqildi!')
  }

  const sidebarData = useMemo(
    () => [
      {
        icon: <ControlPanelIcon />,
        title: 'Boshqaruv paneli',
        href: ROUTES.DASHBOARD_CONTROL_PANEL,
      },
      {
        icon: <ConsultationIcon />,
        title: 'Konsultatsiya',
        href: ROUTES.DASHBOARD_CONSULTATION,
      },
      { icon: <OrderIcon />, title: 'Buyurtmalar', href: ROUTES.DASHBOARD_ORDERS },
      {
        icon: <DeliveryAddressIcon />,
        title: 'Yetkazish manzili',
        href: ROUTES.DASHBOARD_DELIVERY_ADDRESS,
      },
      {
        icon: <PaymentIcon />,
        title: "To'lov usullari",
        href: ROUTES.DASHBOARD_PAYMENT_METHODS,
      },
      // {
      //   icon: <NotificationIcon />,
      //   title: 'Bildirishnomalar',
      //   href: ROUTES.DASHBOARD_NOTIFICATIONS,
      // },
      {
        icon: <SettingsIcon />,
        title: 'Sozlamalar',
        href: ROUTES.DASHBOARD_SETTINGS,
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
            <Link key={title} href={href} className={getLinkClassName(href)}>
              <span>{icon}</span>
              <span>{title}</span>
            </Link>
          ))}
        </div>
        <div>
          <button
            className="flex items-center gap-[14px] py-5 pr-3 ml-9"
            onClick={() => setActiveModal('logoutConfirm')}
          >
            <span>
              <LogoutIcon />
            </span>
            <span className="text-gray-primary">Chiqish</span>
          </button>
        </div>
      </section>

      <Confirm
        confirmText="Akkountdan chiqmoqchimisiz?"
        isOpen={activeModal === 'logoutConfirm'}
        onClose={() => setActiveModal(null)}
        onSubmit={handleLogout}
        submitButtonText="Tasdiqlash"
      />
    </div>
  )
}

export default SidebarModule
