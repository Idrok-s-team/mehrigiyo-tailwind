'use client'

import React, { RefObject, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Breadcrumb, Tabs, WatchVideoButton } from '@/components/common'
import { AboutCertificatesModule, ProductCategoriesModule } from '@/modules/about'
import { BrandsListModule, HerbsBannerModule } from '@/modules/home'
import { ROUTES, aboutUsTabItems, achievementsData, stagesData } from '@/constants'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import backgroundBranch from '@/assets/images/common/backgroundBranchLeft.png'
import organicLogosIcon from '@/assets/images/product/organicLogosWide.png'
import ownerImg from '@/assets/images/about/owner.png'
import backgroundBubble1 from '@/assets/icons/common/backgroundBubble1.svg'
import backgroundBubble2 from '@/assets/icons/common/backgroundBubble2.svg'
import historyImg from '@/assets/images/about/mehrigiyo_history.png'
import nature1 from '@/assets/images/about/nature1.png'
import nature2 from '@/assets/images/about/nature2.png'

const AboutUsPage = () => {
  const originPartRef = useRef<HTMLElement>(null)
  const nowPartRef = useRef<HTMLElement>(null)
  const certificatesPartRef = useRef<HTMLElement>(null)

  const scrollToRef = (ref: RefObject<HTMLElement>, offset: number) => {
    if (ref.current) {
      const yOffset = offset
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const handleTabChange = useCallback((key: string) => {
    switch (key) {
      case 'origin':
        scrollToRef(originPartRef, -20)
        break
      case 'now':
        scrollToRef(nowPartRef, -200)
        break
      case 'certificates':
        scrollToRef(certificatesPartRef, -200)
        break
      default:
        break
    }
  }, [])

  const breadcrumbItems = [{ text: 'Bosh sahifa', href: ROUTES.HOME }, { text: 'Biz haqimizda' }]

  return (
    <div className="mt-14 px-10 mx-auto xl:px-24 max-md:px-4 mx max-w-[1440px] max-sm:mt-0 overflow-hidden">
      <section className="flex justify-between items-center max-sm:flex-wrap">
        <div className="flex gap-12 max-xl:gap-2 max-xl:w-4/5 max-lg:w-full">
          <Image
            src={backgroundLeaf}
            alt=""
            priority
            className="-ml-[10%] object-cover w-[225px] h-[305px] max-lg:hidden"
          />

          <div className="mt-10">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="mt-5">Mehrigiyo</h2>
            <p className="mt-4 text-gray-primary">
              Shifobaxsh o'simliklar yetishtirish va salomatlik va uzoq umr ko'rish uchun mahsulotlar ishlab chiqarish
              kompaniyasi
            </p>
            <WatchVideoButton
              className="mt-10 max-sm:mt-4"
              videoUrl="https://www.youtube.com/embed/CKvdClKdSJo?si=V-Hy0MKf5OdPGZWb"
            />
          </div>
        </div>
        <div className="flex items-center justify-center xl:flex-shrink-0 max-sm:w-full max-sm:mt-4">
          <Image src={organicLogosIcon} alt={''} priority width={464} height={329} />
        </div>
      </section>

      <section className="sticky z-50 mt-14 top-28 rounded-2xl max-lg:top-16">
        <Tabs
          items={aboutUsTabItems}
          className="shadow-primary bg-white !rounded-2xl"
          fullWidth={false}
          onTabChange={handleTabChange}
        />
      </section>

      <section className="flex items-center justify-between mt-24 max-sm:flex-wrap">
        <div>
          <Image src={ownerImg} alt="Mehrigiyo owner" className="sm:-ml-[16%]" />
        </div>

        <div className="w-3/5 max-lg:w-4/5 max-md:w-full">
          <h2 className="font-bold">Xush kelibsiz!</h2>
          <p className="mt-5 text-gray-primary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <h5 className="mt-20 max-sm:mt-10">Hurmat bilan, Abdurazakov Alijon G‘aniyevich</h5>
          <p className="text-sm italic text-[#505050]">
            “Mehrigiyo” shirkati asoschisi, farmatsevt, xalq tabibi, Turon Fanlar akademiyasi akademigi.
          </p>
        </div>
      </section>

      <section className="relative flex items-center justify-between max-md:flex-wrap" ref={originPartRef}>
        <div className="w-[30%] mt-[15%] max-xl:w-3/5 max-lg:w-4/5 max-md:w-full">
          <h2 className="font-extrabold text-green-primary">Kelib chiqish</h2>
          <p className="mt-4 text-gray-primary">
            1992-yildan buyon yuqori malakali shifokorlar, o‘simlikshunoslar, sharq tabobati izdoshlari, fermer va
            texnologlardan tashkil topgan “MEHRIGIYO” kompaniyasining professional jamoasi zamonaviy farmatsevtika
            sanoati yutuqlari va qadimiy ta’limotlar tajribasini muvaffaqiyatli sintez qilib, o‘z plantatsiyalarida
            yetishtirmoqda. Farg'ona vodiysi va sog'lom balzamlar, shifobaxsh choylar, yog'lar, asal, holva va
            boshqalarni ishlab chiqarish.
          </p>
        </div>

        <div>
          <Image src={backgroundBubble1} alt="" className="absolute -top-[20%] -right-[8%] -z-10" />
          <Image src={backgroundBubble2} alt="" className="absolute -top-[23%] -right-[8%] -z-10" />

          <Image src={historyImg} alt="" className="mt-[20%] max-md:mt-10" />
        </div>
      </section>

      <section className="flex items-center mt-24 max-xl:gap-10 max-md:flex-wrap max-md:mt-12">
        <div className="flex items-center xl:gap-12 max-md:w-full">
          <Image
            src={backgroundLeaf}
            alt=""
            priority
            className="-ml-[20%] object-cover w-[225px] h-[305px] max-lg:hidden"
          />

          <div className="mt-10 max-md:mx-auto">
            <h1 className="text-4xl max-md:text-3xl">30 yillik yutuqlarimiz</h1>
            <p className="mt-5 text-gray-primary max-md:mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
        </div>
        <div className="grid flex-shrink-0 grid-cols-2 gap-x-20 gap-y-10 max-lg:gap-x-10 2xs:mx-auto max-xs:gap-x-3 max-2xs:grid-cols-1">
          {achievementsData.map(({ title, text, icon }) => (
            <div key={title} className="flex items-center gap-4">
              <span>{icon}</span>
              <span>
                <h4 className="max-md:text-xl">{title}</h4>
                <p className="text-gray-primary">{text}</p>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-40 max-sm:mt-24" ref={nowPartRef}>
        <h2 className="font-extrabold text-green-primary">Hozirda</h2>
        <p className="mt-3 text-gray-primary">
          Bugungi kunda korxonada qadimiy sharq tabobati va zamonaviy farmatsevtika yutuqlarini o‘zida jamlagan
          bog‘bonlar, farmatsevtlar, shifokorlar, akademiklar mehnat qilmoqda. Ayni paytda korxonada o‘zbekistonlik va
          xorijiy iste’molchilarning munosib ishonchiga ega bo‘lgan, salomatlik uchun samarali dori vositalari ishlab
          chiqarilmoqda.
          <br /> <br />
          “Mehrigiyo” korxonasining asosiy faoliyati dorivor o‘simliklar va mevalar asosidagi mahsulotlar ishlab
          chiqarishdan iborat.
        </p>
        <h6 className="mt-8">Bizning mahsulotlar turkumlari</h6>
        <div>
          <ProductCategoriesModule />
        </div>
        <div className="flex items-center justify-between lg:gap-8 max-lg:mt-8 max-md:flex-wrap">
          <p className="text-gray-primary max-xl:w-1/2 max-md:w-full">
            Yuqori sifat va mahsulot samaradorligini oshirish maqsadida, o'simliklar va mevalar organik usulda, mineral
            o'g'itlarsiz, pestitsidlarsiz, kompaniyaning xususiy ekish maydonlarida (plantatsiyalarda) yetishtiriladi.
            Mahsulotlar jahon standartlariga muvofiq tanlab olinadi, tayyorlanadi va qadoqlanadi.
            <br /> <br />
            O'simliklarni tayyorlashning muhim qismi ularni kerakli qismlarga ajratishdir - ko'chatlar, poyalar,
            barglar, tomurciklar, gullar va urug'lar. Bundan tashqari, turli mahsulotlarni tayyorlash uchun retseptlar
            har xil darajada maydalashni, sovuq yoki issiq ishlov berishni, saqlashni talab qiladi.
            <br /> <br />
            Ushbu jarayonlarning barchasi kompaniyaning yuqori malakali xodimlari tomonidan ta'minlanadi va nazorat
            qilinadi, bu esa har bir mahsulotning sifatini kafolatlaydi.
          </p>

          <Image src={nature1} alt="" className="xl:flex-shrink-0 max-md:mx-auto" />
        </div>
        <div className="flex items-center justify-between lg:gap-8 max-lg:mt-8 max-md:flex-wrap">
          <Image src={nature2} alt="" className="xl:flex-shrink-0 max-md:order-2 max-md:mx-auto max-md:mt-6" />
          <p className="text-gray-primary max-xl:w-1/2 max-md:w-full">
            Yuqori sifat va mahsulot samaradorligini oshirish maqsadida, o'simliklar va mevalar organik usulda, mineral
            o'g'itlarsiz, pestitsidlarsiz, kompaniyaning xususiy ekish maydonlarida (plantatsiyalarda) yetishtiriladi.
            Mahsulotlar jahon standartlariga muvofiq tanlab olinadi, tayyorlanadi va qadoqlanadi.
            <br /> <br />
            O'simliklarni tayyorlashning muhim qismi ularni kerakli qismlarga ajratishdir - ko'chatlar, poyalar,
            barglar, tomurciklar, gullar va urug'lar. Bundan tashqari, turli mahsulotlarni tayyorlash uchun retseptlar
            har xil darajada maydalashni, sovuq yoki issiq ishlov berishni, saqlashni talab qiladi.
            <br /> <br />
            Ushbu jarayonlarning barchasi kompaniyaning yuqori malakali xodimlari tomonidan ta'minlanadi va nazorat
            qilinadi, bu esa har bir mahsulotning sifatini kafolatlaydi.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-gray-primary">
            «Mehrigiyo» kompaniyasi sog'liqni saqlash uchun oziq-ovqat mahsulotlari ishlab chiqarishga ixtisoslashgan
            bo'lib, profilaktik va biologik davolovchi dori-darmonlar ishlab chiqaradi. Tropik mevali daraxtlar,
            jumladan, papaya, goji, noni, feijoa, zaytun daraxtlari va boshqalar yetishtirilmoqda, shuningdek, dorivor
            o'tlardan foydalanish yangi kashfiyotlar uchun katta imkoniyatlar ochadi.
          </p>
        </div>
      </section>

      <section className="text-center mt-9">
        <h2>
          Kompaniya turli kasalliklarni <br /> tiklash uchun tizimli yondashuvdan foydalanadi,
          <br />
          <p className="font-normal">
            bu <span className="text-green-primary">3 bosqichdan</span> iborat:
          </p>
        </h2>

        <div className="flex justify-center gap-16 mt-14 max-lg:gap-10 max-md:gap-5 max-sm:flex-wrap">
          {stagesData.map(({ title, text }, index) => (
            <div key={title} className="w-80 h-[150px] p-7 pb-9 flex items-end shadow-primary rounded-2xl">
              <h1 className="text-8xl font-extrabold text-[#69CB3A]/30 absolute">{title}</h1>
              <h4 className={`text-green-primary ml-8 text-start leading-7 ${index === 2 ? 'ml-11 -mb-6' : ''}`}>
                {text}
              </h4>
            </div>
          ))}
        </div>

        <div className="relative flex justify-center mt-48 max-md:mt-24">
          <h3 className="text-[34px] text-green-primary italic font-medium">
            “Mehrigiyo” shifobaxsh mahsulotlari kasalliklarning <br /> oldini oladi hamda uzoq, sog‘lom va to‘kin hayot{' '}
            <br /> manbai bo‘lib xizmat qiladi.
          </h3>
          <Image
            src={backgroundBranch}
            alt=""
            className="absolute left-[10%] -bottom-[120%] rotate-180 max-md:hidden"
          />
          <Image src={backgroundBranch} alt="" className="absolute right-[10%] -top-full max-md:hidden" />
        </div>
      </section>

      <section className="flex justify-between mt-40 max-md:mt-24" ref={certificatesPartRef}>
        <AboutCertificatesModule />
      </section>

      <section className="mt-40 max-sm:mt-32">
        <HerbsBannerModule />
      </section>

      <section className="mt-32 mb-[70px]">
        <BrandsListModule />
      </section>
    </div>
  )
}

export default AboutUsPage
