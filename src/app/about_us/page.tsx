/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import { Breadcrumb, Slider, Tabs, WatchVideoButton } from '@/components'
import { ProductCategoriesModule } from '@/modules/about'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import backgroundBranch from '@/assets/images/common/backgroundBranch.png'
import organicLogosIcon from '@/assets/images/product/organicLogosWide.png'
import ownerImg from '@/assets/images/about/owner.png'
import backgroundBubble1 from '@/assets/icons/common/backgroundBubble1.svg'
import backgroundBubble2 from '@/assets/icons/common/backgroundBubble2.svg'
import historyImg from '@/assets/images/about/mehrigiyo_history.png'
import nature1 from '@/assets/images/about/nature1.png'
import nature2 from '@/assets/images/about/nature2.png'
import certificateImg1 from '@/assets/images/about/USDA.png'
import certificateImg2 from '@/assets/images/about/USDA2.png'
import certificateImg3 from '@/assets/images/about/USDA3.png'
import certificateImg4 from '@/assets/images/about/USDA4.png'
import { ClientsInfoIcon, CountriesInfoIcon, DownloadDayIcon, UsersInfoIcon } from '@/assets/icons/about'
import { BrandsListModule, HerbsBannerModule } from '@/modules/home'

const AboutUsPage = () => {
  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Biz haqimizda' }]

  const tabItems = [
    { key: 1, label: 'Kelib chiqishi' },
    { key: 2, label: 'Tarixi' },
    { key: 3, label: 'Hozirda' },
    { key: 4, label: 'Yutuqlar va sertifikatlar' },
  ]

  const achievementsData = [
    {
      title: '10,000+',
      text: 'Kuniga yuklab olish',
      icon: <DownloadDayIcon />,
    },
    {
      title: '2 million',
      text: 'Foydalanuvchilar',
      icon: <UsersInfoIcon />,
    },
    {
      title: '50 000+',
      text: 'Mijozlar',
      icon: <ClientsInfoIcon />,
    },
    {
      title: '12',
      text: 'Mamlakatlar',
      icon: <CountriesInfoIcon />,
    },
  ]

  const stagesData = [
    { title: 1, text: 'Tozalash' },
    { title: 2, text: "To'ldirish" },
    { title: 3, text: "Texnik xizmat ko'rsatish" },
  ]

  const certificates = [certificateImg1, certificateImg2, certificateImg3, certificateImg4]

  return (
    <div className="mt-14">
      <section className="flex items-center gap-32 justify-between">
        <div className="flex gap-12">
          <Image src={backgroundLeaf} alt="" priority className="-ml-[10%] object-cover w-[225px] h-[305px]" />

          <div className="mt-10">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="mt-5">Mehrigiyo</h2>
            <p className="text-gray-primary mt-4">
              Shifobaxsh o'simliklar yetishtirish va salomatlik va uzoq umr ko'rish uchun mahsulotlar ishlab chiqarish
              kompaniyasi
            </p>
            <WatchVideoButton className="mt-10" />
          </div>
        </div>
        <div className="flex-shrink-0">
          <Image src={organicLogosIcon} alt={''} priority width={464} height={329} />
        </div>
      </section>

      <section className="mt-14 sticky top-28 z-50 bg-white rounded-2xl">
        <Tabs items={tabItems} />
      </section>

      <section className="mt-24 flex items-center justify-between">
        <div>
          <Image src={ownerImg} alt="Mehrigiyo owner" className="-ml-[16%]" />
        </div>

        <div className="w-3/5">
          <h2 className="font-bold">Xush kelibsiz!</h2>
          <p className="text-gray-primary mt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <h5 className="mt-20">Hurmat bilan, Abdurazakov Alijon G‘aniyevich</h5>
          <p className="text-sm italic text-[#505050]">
            “Mehrigiyo” shirkati asoschisi, farmatsevt, xalq tabibi, Turon Fanlar akademiyasi akademigi.
          </p>
        </div>
      </section>

      <section className="flex justify-between relative">
        <div className="w-[30%] mt-72">
          <h2 className="font-extrabold text-green-primary">Kelib chiqish</h2>
          <p className="text-gray-primary mt-4">
            1992-yildan buyon yuqori malakali shifokorlar, o‘simlikshunoslar, sharq tabobati izdoshlari, fermer va
            texnologlardan tashkil topgan “MEHRIGIYO” kompaniyasining professional jamoasi zamonaviy farmatsevtika
            sanoati yutuqlari va qadimiy ta’limotlar tajribasini muvaffaqiyatli sintez qilib, o‘z plantatsiyalarida
            yetishtirmoqda. Farg'ona vodiysi va sog'lom balzamlar, shifobaxsh choylar, yog'lar, asal, holva va
            boshqalarni ishlab chiqarish.
          </p>
        </div>

        <div>
          <Image src={backgroundBubble1} alt="" className="absolute -top-[20%] -right-[8%]" />
          <Image src={backgroundBubble2} alt="" className="absolute -top-[23%] -right-[8%]" />

          <Image src={historyImg} alt="" className="absolute -right-[5%] top-[30%]" />
        </div>
      </section>

      <section className="mt-60 flex items-center">
        <div className="flex items-center gap-12">
          <Image src={backgroundLeaf} alt="" priority className="-ml-[20%] object-cover w-[225px] h-[305px]" />

          <div className="mt-10">
            <h1 className="text-4xl">30 yillik yutuqlarimiz</h1>
            <p className="mt-5 text-gray-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
        </div>
        <div className="flex-shrink-0 grid grid-cols-2 gap-x-20 gap-y-10">
          {achievementsData.map(({ title, text, icon }) => (
            <div key={title} className="flex items-center gap-4">
              <span>{icon}</span>
              <span>
                <h4>{title}</h4>
                <p className="text-gray-primary">{text}</p>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-40">
        <h2 className="font-extrabold text-green-primary">Hozirda</h2>
        <p className="text-gray-primary mt-3">
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
        <div className="flex items-center gap-8">
          <p className="text-gray-primary">
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

          <Image src={nature1} alt="" className="flex-shrink-0" />
        </div>
        <div className="flex items-center gap-8">
          <Image src={nature2} alt="" className="flex-shrink-0" />
          <p className="text-gray-primary">
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

      <section className="mt-9 text-center">
        <h2>
          Kompaniya turli kasalliklarni <br /> tiklash uchun tizimli yondashuvdan foydalanadi,
          <br />
          <p className="font-normal">
            bu <span className="text-green-primary">3 bosqichdan</span> iborat:
          </p>
        </h2>

        <div className="flex justify-center gap-16 mt-14">
          {stagesData.map(({ title, text }, index) => (
            <div key={title} className="w-80 h-[150px] p-7 pb-9 flex items-end shadow-primary rounded-2xl">
              <h1 className="text-8xl font-extrabold text-[#69CB3A]/30 absolute">{title}</h1>
              <h4 className={`text-green-primary ml-8 text-start leading-7 ${index === 2 ? 'ml-11 -mb-6' : ''}`}>
                {text}
              </h4>
            </div>
          ))}
        </div>

        <div className="mt-48 flex justify-center relative">
          <h3 className="text-[34px] text-green-primary italic font-medium">
            “Mehrigiyo” shifobaxsh mahsulotlari kasalliklarning <br /> oldini oladi hamda uzoq, sog‘lom va to‘kin hayot{' '}
            <br /> manbai bo‘lib xizmat qiladi.
          </h3>
          <Image src={backgroundBranch} alt="" className="absolute left-[10%] -bottom-[120%] rotate-180" />
          <Image src={backgroundBranch} alt="" className="absolute right-[10%] -top-full " />
        </div>
      </section>

      <section className="mt-40 flex justify-between">
        <div className="w-1/3 flex-shrink-0">
          <h2 className="font-extrabold">Yutuqlar va sertifikatlar</h2>
          <p className="text-gray-primary mt-3">
            2020 yil dekabr oyida kompaniya ikkita xalqaro organik sertifikatlarni oldi: Amerika USDA ORGANIC va Yevropa
            EU ORGANIC Gollandiyaning Control Union Certifications kompaniyasidan. Yaqin kelajakda Saudiya Arabistoni,
            Omon, AQSH, Yevropa mamlakatlariga mahsulot eksport qilish rejalashtirilgan.
          </p>
        </div>

        <div className="w-[55%]">
          <Slider>
            {certificates.map((certificate, index) => (
              <div key={index} className="keen-slider__slide">
                <Image src={certificate} alt={`Certificate ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="mt-52">
        <HerbsBannerModule />
      </section>

      <section className='mt-32'>
        <BrandsListModule />
      </section>
    </div>
  )
}

export default AboutUsPage
