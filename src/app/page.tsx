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
import { faqData } from '@/constants'

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
    <div className="px-24">
      <section className="w-full absolute inset-0 top-0 h-[97vh] bg-[url(../assets/icons/home/backgroundDarkGreen.svg)] bg-no-repeat bg-bottom bg-cover">
        <div className="w-full h-[100vh] bg-[url(../assets/icons/home/backgroundLightGreen.svg)] bg-no-repeat bg-bottom bg-cover">
          <div className="flex flex-col items-center">
            <div className="pt-40 text-center">
              <h1>Bepul shifokor maslahati kerakmi?</h1>
              <p className="mx-auto mt-3">24/7 Video maslahat Shaxsiy maslahat + Audio qo'ng'iroq</p>
              <p>
                Faqat{' '}
                <Link href="#" className="underline text-green-dark">
                  mobil ilovada
                </Link>
              </p>
            </div>
            <div className="w-2/5 mt-5">
              <Input />
            </div>
            <div>
              <Image
                src={'https://res.cloudinary.com/mehrigiyo/image/upload/v1661486824/Mehrigiyo/doctorCall_r3tuct.png'}
                alt="Doctor"
                width={900}
                height={600}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[115vh]">
        <div className="grid grid-cols-4 gap-5 border-y-[1px] border-gray-100 py-9">
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

      <section className="flex flex-col items-center mt-40 text-center">
        <h2 className="w-4/5">Har qanday sog'liq bilan bog'liq muammolar uchun onlayn shifokorlarga murojaat qiling</h2>
        <p className="mt-4 text-gray-primary">
          Eng yaxshi shifokorlarimiz, Sizning barcha savolaringizga javob berishadi
        </p>

        <div className="flex items-center gap-10 mt-14">
          {specialistTypesData.results.slice(0, 4).map(({ id, name, image, get_doctors_count }) => (
            <Link
              href={`/online_doctors/category?type=${id}`}
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

        <div className="mt-14">
          <SeeAllButton text="Bepul maslahat olish" href="/online_doctors/category" />
        </div>
      </section>

      <section className="relative flex justify-between">
        <div className="w-2/5 mt-72">
          <p className="uppercase text-gray-primary">MEHRIGIYOGA Xush kelibsiz</p>
          <h3 className="mt-2">Yaxshi kelajak uchun salomatlik</h3>
          <p className="mt-2 text-gray-primary">
            1992-yildan buyon shifokorlar, oʻsimlikshunoslar, sharq tabobati izdoshlari, fermer va texnologlardan iborat
            “MEHRIGIYO” professional jamoasi Fargʻona vodiysi va oʻz plantatsiyalarida yetishtirib, zamonaviy
            farmatsevtika sanoati yutuqlari va qadimiy taʼlimot tajribasini muvaffaqiyatli oʻzida mujassamlashtirib
            kelmoqda. shifobaxsh choy, asal, moy, sirop, holva va boshqalar ishlab chiqaradi.
          </p>
          <Image src={organicLogosIcon} alt="" className="mt-10" />
          <div className="flex items-center gap-8 mt-14">
            <SeeAllButton text="Batafsil" size="md" href="/about_us" />
            <WatchVideoButton videoUrl="https://www.youtube.com/embed/CKvdClKdSJo?si=V-Hy0MKf5OdPGZWb" />
          </div>
        </div>

        <div>
          <Image src={backgroundBubble1} alt="" className="absolute top-[3%] -right-[8%]" />
          <Image src={backgroundBubble2} alt="" className="absolute top-0 -right-[8%]" />

          <Image
            src={'https://res.cloudinary.com/mehrigiyo/image/upload/v1661489066/Mehrigiyo/organicPlantation_m9fvbp.png'}
            alt=""
            width={660}
            height={600}
            className="absolute mt-64 -right-20"
          />
        </div>
      </section>

      <section className="mt-64">
        <UrgentOnlineHelpModule />
      </section>

      <section className="mt-48">
        <ProductsListModule />
      </section>

      <section className="mt-40">
        <HerbsBannerModule />
      </section>

      <section className="mt-52">
        <MobileAppModule />
      </section>

      <section className="mt-48">
        <NewsListModule />
      </section>

      <section className="mt-20">
        <h2>Ko’p so'raladigan savollar</h2>
        <div className="flex justify-between">
          <div className="w-1/5 mt-3">
            <p className="text-green-primary">Qo'shimcha ma'lumot uchun biz bilan bog'laning</p>
            <SeeAllButton text="Batafsil" size="md" className="mt-11" href="/help/faq" />
          </div>
          <div className="w-[68%]">
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
