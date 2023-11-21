/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { ActiveLink, Dropdown, HeaderActions } from '@/components'
import {
  AvatarIcon,
  FacebookIcon,
  FlagUzIcon,
  InstagramIcon,
  LocationIcon,
  LogoIcon,
  TelegramIcon,
  YoutubeIcon,
} from '@/assets/icons'
import { getShopTypes } from '@/api'
import Providers from './providers'
import googlePlayIcon from '@/assets/icons/layout/googlePlayIcon.svg'
import appStoreIcon from '@/assets/icons/layout/appStoreIcon.svg'
import bannerHomeIcon from '@/assets/icons/home/bannerHomeIcon.svg'

import './globals.css'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mehrigiyo',
  description:
    'Korxona turli dorivor o‘simliklarni yetishtirish va qayta ishlash, shuningdek, sog‘lom ovqatlanish uchun ekologik toza, tabiiy oziq-ovqat va kosmetika mahsulotlarini ishlab chiqarish bilan muvaffaqiyatli shug‘ullanadi.',
}

interface IProps {
  children: ReactNode
}

const RootLayout: FC<IProps> = async ({ children }) => {
  const shopTypesData = await getShopTypes()

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
    { label: 'Onlayn shifokorlar', mainPath: '/online_doctors' },
    {
      label: 'Mahsulotlar',
      mainPath: '/products',
      dropdownItems: shopTypesData.results
        ?.slice(0, 4)
        .map((product) => ({
          label: product.name,
          path: `/products/all?type=${product.id.toString()}`,
        }))
        .concat([{ label: `Hammasi+`, path: `/products/all` }]),
    },
    { label: 'Biz haqimizda', mainPath: '/about_us' },
    { label: 'Yangiliklar', mainPath: '/news' },
    { label: 'Yordam', mainPath: '/help' },
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

  const socialDatas = [
    { icon: <FacebookIcon />, href: `https://www.facebook.com/mehrigiyo.uz/` },
    { icon: <InstagramIcon />, href: `https://www.instagram.com/mehrigiyo.uz/` },
    { icon: <TelegramIcon />, href: `https://t.me/mehrigiyo` },
    {
      icon: <YoutubeIcon />,
      href: `https://www.youtube.com/channel/UCcVLbbnCH90qc-2WfX3trmA`,
    },
  ]

  const contactDatas = [
    { title: `E-mail`, text: `info@mehrigiyo.uz`, href: 'mailto:' },
    { title: `Bizga qo'ng'iroq qiling`, text: `+998 98 007 31 03`, href: 'tel:+998980073103' },
  ]

  const legalDatas = [
    { text: `Maxfiylik siyosati`, href: `#` },
    { text: `Xizmat ko'rsatish shartlari`, href: `#` },
    { text: `Huquqni muhofaza qilish`, href: `#` },
  ]

  const privacyLinks = [
    { text: `Bosh sahifa`, href: `/` },
    { text: `Biz haqimizda`, href: `/about_us` },
    { text: `Yangiliklar`, href: `/news` },
  ]

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="sticky top-0 z-10">
            <nav className="flex items-center justify-between bg-green-light h-10 text-sm px-24">
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
                <div className="flex items-center gap-2">
                  <div>Kirish</div>
                  <div>
                    <AvatarIcon />
                  </div>
                </div>
              </ul>
            </nav>

            <nav className="flex items-center justify-between px-24 py-4 bg-[#addabe]">
              <section className="flex items-center gap-12">
                <div>
                  <Link href={'#'}>
                    <LogoIcon />
                  </Link>
                </div>
                <div className="flex gap-3 text-sm">{getNavElements()}</div>
              </section>

              <section>
                <HeaderActions />
              </section>
            </nav>
          </header>

          <main className="px-24 overflow-hidden">{children}</main>

          <footer className="mt-[70px]">
            <div className="flex justify-between relative bg-[#282828] py-[60px] px-24 pb-0">
              <section className="w-[45%] text-white">
                <div className="flex flex-col gap-[18px]">
                  <LogoIcon />
                  <p className="w-3/5">Bu sog'liq va hayot sifatini yaxshilash uchun mahsulotlar</p>
                  <p>
                    <strong>Ish vaqti:</strong> Har kuni 8:00 dan 20:00 gacha
                  </p>
                  <div className="flex gap-6">
                    {socialDatas.map(({ icon, href }) => (
                      <Link
                        key={href}
                        href={href}
                        target="_blank"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10"
                      >
                        {icon}
                      </Link>
                    ))}
                  </div>
                  <div className="bg-green-primary/60 rounded-t-3xl py-6 px-9 flex justify-between mt-3">
                    {contactDatas.map(({ title, text, href }) => (
                      <div key={title} className="mr-12">
                        <p className="text-sm text-white/60 mb-2">{title}</p>
                        <Link href={href} className="text-lg font-semibold">
                          {text}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="w-2/5 text-white flex justify-between">
                <div>
                  <h4 className="text-lg font-medium">Huquqiy</h4>
                  <div className="flex flex-col gap-4 mt-6 text-sm text-gray-primary">
                    {legalDatas.map(({ text, href }) => (
                      <Link href={href} key={text} className="hover:text-green-primary duration-200">
                        {text}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Ilovani yuklab olish</h4>
                  <div className="flex flex-col gap-4 mt-6">
                    <Image src={googlePlayIcon} alt="Mehrigiyo google play" />
                    <Image src={appStoreIcon} alt="Mehrigiyo app store" />
                  </div>
                  <Image src={bannerHomeIcon} alt="" className="absolute bottom-0 right-0" />
                </div>
              </section>
            </div>

            <section className="px-24 py-6 text-xs flex items-center justify-between">
              <section>
                <p>© 1996-{new Date().getFullYear()}. Mehrigiyo. Barcha huquqlar himoyalangan.</p>
                <p className="mt-0.5">
                  Saytdan olingan barcha maʼlumotlar chop etilganda veb-saytga havola qilish majburiy.
                </p>
              </section>

              <section className="flex items-center gap-7">
                {privacyLinks.map(({ text, href }) => (
                  <Link key={text} href={href} className="hover:text-green-primary duration-200 text-sm">
                    {text}
                  </Link>
                ))}
              </section>
            </section>
          </footer>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
