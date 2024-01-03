'use client'

import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dropdown } from '@/components'
import { LogoIcon } from '@/assets/icons'
import { useLanguageItems, useNavElements } from './hooks'
import { HeaderActions, AuthModal, TopNavLinks, AddressDisplay, UserInfo } from './components'

const HeaderModule: FC = () => {
  const pathname = usePathname()

  const navElements = useNavElements()
  const languageItems = useLanguageItems()

  const titles = [
    { text: `Mahsulotlar katalogi`, href: `#` },
    { text: `Foto-lavhalar`, href: `#` },
    { text: `Yetkazib berish va to'lash`, href: `#` },
    { text: `Aksiya`, href: `#`, color: `#AB7A19` },
    { text: `Yangi`, href: `#`, color: `#53B175` },
  ]

  return (
    <>
      <nav
        className={`flex items-center justify-between h-10 text-sm px-24 ${
          pathname === '/' ? 'bg-green-light' : 'bg-gray-background'
        }`}
      >
        <TopNavLinks titles={titles} />
        <ul className="flex items-center gap-5">
          <div>
            <Dropdown items={languageItems} />
          </div>
          <AddressDisplay />
          <UserInfo />
        </ul>
      </nav>

      <nav
        className={`flex items-center justify-between px-24 py-4 ${
          pathname === '/' ? 'bg-[#addabe]' : 'bg-gray-background'
        }`}
      >
        <section className="flex items-center gap-12">
          <div>
            <Link href="/">
              <LogoIcon />
            </Link>
          </div>
          <div className="flex gap-3 text-sm">{navElements}</div>
        </section>

        <section>
          <HeaderActions />
        </section>

        <AuthModal />
      </nav>
    </>
  )
}

export default HeaderModule
