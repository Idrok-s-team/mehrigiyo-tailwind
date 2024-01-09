'use client'

import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FacebookIcon, InstagramIcon, LogoIcon, TelegramIcon, YoutubeIcon } from '@/assets/icons'
import googlePlayIcon from '@/assets/icons/layout/googlePlayIcon.svg'
import appStoreIcon from '@/assets/icons/layout/appStoreIcon.svg'
import bannerHome from '@/assets/images/home/bannerHome.png'
import { usePathname } from 'next/navigation'

const FooterModule: FC = () => {
  const pathname = usePathname()
  const showFooter = !pathname.includes('/dashboard')

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
  return showFooter ? (
    <>
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
            <Image src={bannerHome} alt="" className="absolute bottom-0 right-0" />
          </div>
        </section>
      </div>

      <section className="px-24 py-6 text-xs flex items-center justify-between">
        <section>
          <p>© 1996-{new Date().getFullYear()}. Mehrigiyo. Barcha huquqlar himoyalangan.</p>
          <p className="mt-0.5">Saytdan olingan barcha maʼlumotlar chop etilganda veb-saytga havola qilish majburiy.</p>
        </section>

        <section className="flex items-center gap-7">
          {privacyLinks.map(({ text, href }) => (
            <Link key={text} href={href} className="hover:text-green-primary duration-200 text-sm">
              {text}
            </Link>
          ))}
        </section>
      </section>
    </>
  ) : null
}

export default FooterModule
