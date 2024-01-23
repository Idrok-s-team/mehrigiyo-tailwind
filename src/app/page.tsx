import Image from 'next/image'
import Link from 'next/link'

import { getDoctorTypesApi } from '@/api'
import { Accordion, Input, SeeAllButton, WatchVideoButton } from '@/components/common'
import { DeliveryIcon, FastPaymentIcon, OnlineHelpIcon, PermanentDiscountIcon } from '@/assets/icons'
import {
  BrandsListModule,
  HerbsBannerModule,
  MobileAppModule,
  NewsListModule,
  SendRequestModule,
  UrgentOnlineHelpModule,
} from '@/modules/home'
import { ProductsListModule } from '@/modules/products'
import organicLogosIcon from '@/assets/icons/home/organicLogosIcon.svg'
import backgroundBubble1 from '@/assets/icons/common/backgroundBubble1.svg'
import backgroundBubble2 from '@/assets/icons/common/backgroundBubble2.svg'
import backgroundDarkGreen from '@/assets/icons/home/backgroundDarkGreen.svg'
import backgroundLightGreen from '@/assets/icons/home/backgroundLightGreen.svg'
import { ROUTES, faqData } from '@/constants'

export default async function Home() {
  const specialistTypesData = await getDoctorTypesApi()

  const infoCard = [
    {
      icon: <DeliveryIcon />,
      title: `Yetkazib berish bepul`,
      description: `100 000 so'mdan ortiq
        buyurtma berganingizda`,
    },
    {
      icon: <FastPaymentIcon />,
      title: `Tez to'lov`,
      description: `100% xavfsiz to'lov`,
    },
    {
      icon: <PermanentDiscountIcon />,
      title: `Doimiy chegirmalar`,
      description: `Ular allaqachon ishlamoqda`,
    },
    {
      icon: <OnlineHelpIcon />,
      title: `Onlayn yordam`,
      description: `Ish vaqti: 08:00 - 18:00`,
    },
  ]

  return (
    <div className="px-10 xl:px-24 max-md:px-4 max-lg:relative max-w-[1440px] mx-auto">
      <section className="w-full">
        <Image src={backgroundDarkGreen} alt="Doctor" className="w-full absolute left-0 top-0 -z-10" priority />
        <Image src={backgroundLightGreen} alt="Doctor" className="w-full absolute left-0 top-0 -z-10" priority />
        <div className="flex flex-col items-center">
          <div className="pt-16 max-lg:pt-10 text-center">
            <h1 className="max-md:text-3xl">Bepul shifokor maslahati kerakmi?</h1>
            <p className="mx-auto mt-3">24/7 Video maslahat Shaxsiy maslahat + Audio qo'ng'iroq</p>
            <p>
              Faqat{' '}
              <Link href="#" className="underline text-green-dark">
                mobil ilovada
              </Link>
            </p>
          </div>
          <div className="w-2/5 max-xs:w-full max-sm:w-4/5 max-lg:w-3/5 mt-5">
            <Input />
          </div>
          <div className="flex items-center justify-center mt-2 max-md:w-[100vw] max-lg:w-[80vw]">
            <Image
              src={'https://res.cloudinary.com/mehrigiyo/image/upload/v1661486824/Mehrigiyo/doctorCall_r3tuct.png'}
              alt="Doctor"
              className="w-full"
              width={900}
              height={600}
              priority
            />
          </div>
        </div>
      </section>

      <section className="mt-28 max-xs:mt-4 max-lg:mt-16">
        <div className="grid grid-cols-4 gap-5 border-y-[1px] border-gray-100 py-9 max-xs:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3">
          {infoCard.map(({ icon, title, description }) => (
            <div key={title} className="flex items-center gap-5">
              <div>{icon}</div>
              <div>
                <p className="text-lg font-medium">{title}</p>
                <p className="text-sm">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center mt-40 text-center max-lg:mt-20">
        <h2 className="w-4/5">Har qanday sog'liq bilan bog'liq muammolar uchun onlayn shifokorlarga murojaat qiling</h2>
        <p className="mt-4 text-gray-primary">
          Eng yaxshi shifokorlarimiz, Sizning barcha savolaringizga javob berishadi
        </p>

        <div className="flex items-center mt-14 gap-10 max-xs:gap-4 max-sm:justify-center max-sm:gap-8 max-lg:gap-3 max-md:flex-wrap max-md:gap-8">
          {specialistTypesData.results.slice(0, 4).map(({ id, name, image, get_doctors_count }) => (
            <Link
              href={`${ROUTES.ONLINE_DOCTORS_CATEGORY}?type=${id}`}
              key={id}
              className="flex flex-col items-center justify-center bg-white shadow-primary w-[188px] h-[118px] rounded-2xl duration-300 transition-colors hover:bg-green-light hover:border-[0.5px] hover:border-green-primary"
            >
              <div>
                <Image src={image} alt={name} width={30} height={30} />
              </div>
              <p className="my-2 font-semibold">{name}</p>
              <span className="text-[#6b779a] text-xs">{get_doctors_count} shifokor</span>
            </Link>
          ))}
        </div>

        <div className="mt-14 max-xs:mt-8">
          <SeeAllButton text="Bepul maslahat olish" href={ROUTES.ONLINE_DOCTORS_CATEGORY} />
        </div>
      </section>

      <section className="relative flex justify-between max-lg:flex-wrap">
        <div className="w-2/5 mt-72 max-lg:w-full max-lg:mt-52 max-sm:mt-20">
          <p className="uppercase text-gray-primary">MEHRIGIYOGA Xush kelibsiz</p>
          <h3 className="mt-2">Yaxshi kelajak uchun salomatlik</h3>
          <p className="mt-2 text-gray-primary">
            1992-yildan buyon shifokorlar, oʻsimlikshunoslar, sharq tabobati izdoshlari, fermer va texnologlardan iborat
            “MEHRIGIYO” professional jamoasi Fargʻona vodiysi va oʻz plantatsiyalarida yetishtirib, zamonaviy
            farmatsevtika sanoati yutuqlari va qadimiy taʼlimot tajribasini muvaffaqiyatli oʻzida mujassamlashtirib
            kelmoqda. shifobaxsh choy, asal, moy, sirop, holva va boshqalar ishlab chiqaradi.
          </p>
          <Image src={organicLogosIcon} alt="" className="mt-10" />
          <div className="flex items-center gap-8 mt-14 max-2xs:flex-wrap max-2xs:justify-center">
            <SeeAllButton text="Batafsil" size="md" href={ROUTES.ABOUT_US} />
            <WatchVideoButton videoUrl="https://www.youtube.com/embed/CKvdClKdSJo?si=V-Hy0MKf5OdPGZWb" />
          </div>
        </div>

        <div className="overflow-hidden -z-10 max-lg:w-full max-lg:min-h-screen max-xs:min-h-[80vh]">
          <div className="max-md:hidden">
            <Image src={backgroundBubble1} alt="" className="absolute top-[3%] -right-[8%] max-lg:-right-[12%]" />
            <Image src={backgroundBubble2} alt="" className="absolute top-0 -right-[8%] max-lg:-right-[12%]" />
          </div>

          <Image
            src={'https://res.cloudinary.com/mehrigiyo/image/upload/v1661489066/Mehrigiyo/organicPlantation_m9fvbp.png'}
            alt=""
            width={660}
            height={600}
            className="object-contain mx-auto md:absolute md:mt-64 md:-right-20 max-lg:mt-24 max-lg:right-10 max-md:mt-20"
          />
        </div>
      </section>

      <section className="mt-64 max-sm:mt-0 max-2xs:-mt-24">
        <UrgentOnlineHelpModule />
      </section>

      <section className="mt-48 max-sm:mt-24 max-2xs:mt-36">
        <ProductsListModule />
      </section>

      <section className="mt-40">
        <HerbsBannerModule />
      </section>

      <section className="mt-52 max-sm:mt-24">
        <MobileAppModule />
      </section>

      <section className="mt-48 max-sm:mt-24">
        <NewsListModule />
      </section>

      <section className="mt-20">
        <h2>Ko’p so'raladigan savollar</h2>
        <div className="flex justify-between max-lg:gap-5 max-xs:flex-wrap">
          <div className="flex-1 mt-3">
            <p className="text-green-primary w-3/5 max-lg:w-full">Qo'shimcha ma'lumot uchun biz bilan bog'laning</p>
            <SeeAllButton text="Batafsil" size="md" className="mt-11 max-xs:mt-3" href={ROUTES.HELP_FAQ} />
          </div>
          <div className="w-[68%] max-xs:w-full">
            <Accordion items={faqData} />
          </div>
        </div>
      </section>

      <section>
        <SendRequestModule />
      </section>

      <section className="mt-24 mb-[70px]">
        <BrandsListModule />
      </section>
    </div>
  )
}
