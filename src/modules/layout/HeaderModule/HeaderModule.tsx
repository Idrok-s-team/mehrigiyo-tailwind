'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { ActiveLink, Dropdown, HeaderActions } from '@/components'
import { AvatarIcon, FlagUzIcon, LocationIcon, LogoIcon } from '@/assets/icons'
import AuthModal from './components/AuthModal'
import { useUserMeQuery } from '@/hooks/queries'

const HeaderModule: FC = () => {
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false)
  const pathname = usePathname()
  const { data: userDatas, isSuccess } = useUserMeQuery()
  const userData = userDatas?.results[0]

  const titles = [
    { text: `Mahsulotlar katalogi`, href: `#` },
    { text: `Foto-lavhalar`, href: `#` },
    { text: `Yetkazib berish va to'lash`, href: `#` },
    { text: `Aksiya`, href: `#`, color: `#AB7A19` },
    { text: `Yangi`, href: `#`, color: `#53B175` },
  ]

  const languageItems = [
    {
      label: (
        <div className="flex items-center">
          <span>
            <FlagUzIcon />
          </span>
          <span>Uzbek</span>
        </div>
      ),
      id: 'uz',
      selected: true,
    },
  ]

  const navElements = [
    { label: 'Bosh sahifa', mainPath: '/', selected: true },

    {
      label: 'Mahsulotlar',
      mainPath: '/products',
      // dropdownItems: shopTypesData.results
      //   ?.slice(0, 4)
      //   .map((product) => ({
      //     label: product.name,
      //     path: `/products/all?type=${product.id.toString()}`,
      //   }))
      //   .concat([{ label: `Hammasi+`, path: `/products/all` }]),
    },
    { label: 'Onlayn shifokorlar', mainPath: '/online_doctors' },
    { label: 'Biz haqimizda', mainPath: '/about_us' },
    { label: 'Yangiliklar', mainPath: '/news' },
    {
      label: 'Yordam',
      mainPath: '/help',
      dropdownItems: [
        {
          label: 'Yordam',
          path: '/help',
        },
        {
          label: "Ko'p so'raladigan savollar",
          path: '/help/faq',
        },
      ],
    },
  ]

  const getNavElements = () => {
    return navElements.map(({ label, mainPath, dropdownItems }) => {
      if (dropdownItems) {
        const dropdownChildren = dropdownItems.map((item) => ({
          label: item.label,
          id: item.path,
        }))

        return (
          <ActiveLink href={mainPath} key={label}>
            <Dropdown items={dropdownChildren} />
          </ActiveLink>
        )
      } else {
        return (
          <ActiveLink href={mainPath} key={label}>
            {label}
          </ActiveLink>
        )
      }
    })
  }

  return (
    <>
      <nav
        className={`flex items-center justify-between h-10 text-sm px-24 ${
          pathname === '/' ? 'bg-green-light' : 'bg-gray-background'
        }`}
      >
        <ul className="flex gap-5">
          {titles.map(({ text, href }) => (
            <Link href={href} key={text}>
              {text}
            </Link>
          ))}
        </ul>
        <ul className="flex items-center gap-5">
          <div>
            <Dropdown items={languageItems} />
          </div>
          <div className="flex items-center gap-2">
            <div>Toshkent shahar</div>
            <div>
              <LocationIcon />
            </div>
          </div>
          {isSuccess ? (
            <div className="flex items-center gap-2">
              <Image
                src={userData?.avatar as string}
                alt={`${userData?.first_name} ${userData?.last_name}`}
                width={25}
                height={25}
                className="border rounded-full border-green-primary shadow-avatar"
              />
              <p>
                {userData?.first_name} {userData?.last_name}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpenAuthModal(true)}>
              <div>Kirish</div>
              <div>
                <AvatarIcon />
              </div>
            </div>
          )}
        </ul>
      </nav>

      <nav className={`flex items-center justify-between px-24 py-4 ${pathname === '/' ? 'bg-[#addabe]' : 'bg-gray-background'}`}>
        <section className="flex items-center gap-12">
          <div>
            <Link href="/">
              <LogoIcon />
            </Link>
          </div>
          <div className="flex gap-3 text-sm">{getNavElements()}</div>
        </section>

        <section>
          <HeaderActions />
        </section>

        <AuthModal isOpen={isOpenAuthModal} setIsOpen={setIsOpenAuthModal} />
      </nav>
    </>
  )
}

export default HeaderModule
