'use client'

import { FC, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dropdown } from '@/components/common'
import { LogoIcon, MenuIcon } from '@/assets/icons'
import { useLanguageItems, useNavElements } from './hooks'
import { HeaderActions, AuthModal, AddressDisplay, UserInfo, MenuDrawer } from './components'
import { useCommonStore } from '@/store'
import { ROUTES } from '@/constants'

const HeaderModule: FC = () => {
  const pathname = usePathname()
  const { activeModal, setActiveModal } = useCommonStore()

  const { renderNavElements } = useNavElements()
  const languageItems = useLanguageItems()

  const handleOpenDrawer = useCallback(() => {
    setActiveModal('drawerMobile')
  }, [])

  const titles = [
    { text: `Mahsulotlar katalogi`, href: `#` },
    { text: `Foto-lavhalar`, href: `#` },
    { text: `Yetkazib berish va to'lash`, href: `#` },
    { text: `Aksiya`, href: `#`, color: `#AB7A19` },
    { text: `Yangi`, href: `#`, color: `#53B175` },
  ]

  return (
    <div>
      <nav
        className={`h-10 text-sm px-10 max-xs:px-4 xl:px-24 max-lg:hidden
        ${pathname === ROUTES.HOME ? 'bg-green-light' : 'bg-gray-background'}
        `}
      >
        <div className="h-full w-full max-w-[1440px] flex items-center justify-end mx-auto max-xs:flex-wrap">
          {/* <TopNavLinks titles={titles} /> */}
          <ul className="flex items-center gap-5 max-xs:gap-2">
            {/* <div>
              <Dropdown items={languageItems} />
            </div> */}
            <AddressDisplay />
            <UserInfo />
          </ul>
        </div>
      </nav>

      <nav
        className={`px-10 max-xs:px-4 xl:px-24 py-4 ${
          pathname === ROUTES.HOME ? 'bg-[#addabe]' : 'bg-gray-background'
        }`}
      >
        <div className="w-full max-w-[1440px] flex items-center justify-between mx-auto max-xs:flex-wrap">
          <section className="flex items-center gap-8 max-2xs:w-full max-xs:justify-center xl:gap-12">
            <div>
              <Link href="/">
                <LogoIcon />
              </Link>
            </div>
            <div className="flex gap-3 text-sm max-lg:hidden">{renderNavElements()}</div>
          </section>

          <section className="flex items-center gap-6 max-2xs:mt-4 max-2xs:w-full max-2xs:justify-between">
            <HeaderActions />
            <div className="lg:hidden" onClick={handleOpenDrawer}>
              <MenuIcon />
            </div>
          </section>

          <AuthModal />
        </div>
      </nav>
      <MenuDrawer />
    </div>
  )
}

export default HeaderModule
