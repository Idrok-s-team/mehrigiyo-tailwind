'use client'

import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LogoIcon } from '@/assets/icons'
import googlePlayIcon from '@/assets/icons/layout/googlePlayIcon.svg'
import appStoreIcon from '@/assets/icons/layout/appStoreIcon.svg'
import bannerHome from '@/assets/images/home/bannerHome.png'
import { usePathname } from 'next/navigation'
import { footerContactDatas, legalDatas, privacyLinks, socialDatas } from '@/constants'

const FooterModule: FC = () => {
  const pathname = usePathname()
  const showFooter = !pathname.includes('/dashboard')

  return showFooter ? (
    <div className="bg-[#282828]">
      <div className="flex justify-between gap-10 relative py-[60px] max-w-[1440px] mx-auto pb-0 px-10 max-xs:px-4 max-sm:flex-col xl:px-24">
        <section className="text-white flex-1 max-sm:w-full max-lg:w-[55%] xl:w-[45%]">
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
            <div className="max-w-[553px] bg-green-primary/60 rounded-t-3xl py-6 px-9 flex justify-between mt-3 max-sm:rounded-3xl max-md:flex-wrap max-lg:px-4 max-xl:px-6">
              {footerContactDatas.map(({ title, text, href }, index) => (
                <div key={title} className={`mr-12 max-lg:mr-0 max-xl:mr-6 ${index === 0 ? 'max-md:mb-5' : ''}`}>
                  <p className="text-sm text-white/60 mb-2 max-md:m-0">{title}</p>
                  <Link href={href} className="text-lg font-semibold">
                    {text}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative w-2/5 text-white flex justify-between max-sm:w-full max-sm:justify-between max-md:flex-wrap max-md:justify-end max-md:w-[30%]">
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
          <div className="max-md:mr-2">
            <h4 className="text-lg font-medium">Ilovani yuklab olish</h4>
            <div className="flex flex-col gap-4 mt-6 max-md:mt-3">
              <Image src={googlePlayIcon} alt="Mehrigiyo google play" />
              <Image src={appStoreIcon} alt="Mehrigiyo app store" />
            </div>
          </div>
          <Image src={bannerHome} alt="" className="w-full absolute object-cover bottom-0 right-0" />
        </section>
      </div>

      <section className="bg-gray-background py-6 text-xs flex items-center justify-between px-10 max-xs:px-4 xl:px-24">
        <section>
          <p>© 1996-{new Date().getFullYear()}. Mehrigiyo. Barcha huquqlar himoyalangan.</p>
          <p className="mt-0.5">Saytdan olingan barcha maʼlumotlar chop etilganda veb-saytga havola qilish majburiy.</p>
        </section>

        <section className="flex items-center gap-7 max-lg:hidden">
          {privacyLinks.map(({ text, href }) => (
            <Link key={text} href={href} className="hover:text-green-primary duration-200 text-sm">
              {text}
            </Link>
          ))}
        </section>
      </section>
    </div>
  ) : null
}

export default FooterModule
