/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'

import { getSpecialistTypes } from '@/api'
import { ProductsListModule } from '@/modules/home'
import { Input, ProductCardSkeleton, SeeAllButton, WatchVideoButton } from '@/components'
import organicLogosIcon from '@/assets/icons/home/organicLogosIcon.svg'
import backgroundBubble1 from '@/assets/icons/home/backgroundPlantationBubble1.svg'
import backgroundBubble2 from '@/assets/icons/home/backgroundPlantationBubble2.svg'
import onlineDoctorIcon from '@/assets/icons/home/onlineDoctorIcon.svg'
import { DeliveryIcon, FastPaymentIcon, OnlineHelpIcon, PermanentDiscountIcon } from '@/assets/icons'

export default async function Home() {
  const specialistTypesData = await getSpecialistTypes()

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
    <>
      {/* <section className="w-full absolute inset-0 top-0 h-[97vh] bg-[url(../assets/icons/home/backgroundDarkGreen.svg)] bg-no-repeat bg-bottom bg-cover">
        <div className="w-full h-[100vh] bg-[url(../assets/icons/home/backgroundLightGreen.svg)] bg-no-repeat bg-bottom bg-cover">
          <div className="flex flex-col items-center">
            <div className="text-center pt-40">
              <h1 className="text-[44px] font-bold">Bepul shifokor maslahati kerakmi?</h1>
              <p className="mx-auto mt-3">24/7 Video maslahat Shaxsiy maslahat + Audio qo'ng'iroq</p>
              <p>
                Faqat{' '}
                <Link href="#" className="text-green-dark underline">
                  mobil ilovada
                </Link>
              </p>
            </div>
            <div className="w-2/5 mt-5">
              <Input size="lg" />
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

      <section className="mt-40 flex flex-col items-center text-center">
        <h2 className="text-3xl w-4/5 font-semibold">
          Har qanday sog'liq bilan bog'liq muammolar uchun onlayn shifokorlarga murojaat qiling
        </h2>
        <p className="text-gray-primary mt-4">
          Eng yaxshi shifokorlarimiz, Sizning barcha savolaringizga javob berishadi
        </p>

        <div className="flex items-center gap-10 mt-14">
          {specialistTypesData.results.slice(0, 4).map(({ id, name, image, get_doctors_count }) => (
            <Link
              href="#"
              key={id}
              className="flex flex-col items-center justify-center bg-white shadow-primary w-[188px] h-[118px] rounded-2xl duration-300 transition-colors hover:bg-green-light hover:border-[0.5px] hover:border-green-primary"
            >
              <div>
                <Image src={image} alt={name} width={30} height={30} />
              </div>
              <h4 className="font-semibold my-2">{name}</h4>
              <span className="text-[#6b779a] text-xs">{get_doctors_count} shifokor</span>
            </Link>
          ))}
        </div>

        <div className="mt-14">
          <SeeAllButton text="Bepul maslahat olish" />
        </div>
      </section>

      <section className="flex justify-between relative">
        <div className="w-2/5 mt-72">
          <h4 className="uppercase text-gray-primary">MEHRIGIYOGA Xush kelibsiz</h4>
          <h2 className="text-[26px] font-semibold mt-2">Yaxshi kelajak uchun salomatlik</h2>
          <p className="text-gray-primary mt-2">
            1992-yildan buyon shifokorlar, oʻsimlikshunoslar, sharq tabobati izdoshlari, fermer va texnologlardan iborat
            “MEHRIGIYO” professional jamoasi Fargʻona vodiysi va oʻz plantatsiyalarida yetishtirib, zamonaviy
            farmatsevtika sanoati yutuqlari va qadimiy taʼlimot tajribasini muvaffaqiyatli oʻzida mujassamlashtirib
            kelmoqda. shifobaxsh choy, asal, moy, sirop, holva va boshqalar ishlab chiqaradi.
          </p>
          <Image src={organicLogosIcon} alt="" className="mt-10" />
          <div className="flex items-center gap-8 mt-14">
            <SeeAllButton text="Batafsil" size="md" />
            <WatchVideoButton />
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
            className="mt-64 absolute -right-20"
          />
        </div>
      </section>

      <section className="mt-64 flex justify-between items-center">
        <div className="w-2/5">
          <h2 className="text-[30px] font-semibold">Shoshilinch onlayn yordam</h2>
          <p className="text-gray-primary mt-4">
            Bizga shoshilinch sog'liq bo'yicha maslahatchini ayting va biz 60 soniya ichida eng yaxshi shifokorni
            tayinlaymiz.
          </p>
          <SeeAllButton text="Onlayn uchrashuv belgilash" className="mt-10" />
        </div>

        <div className="relative">
          <Image
            src={'https://res.cloudinary.com/mehrigiyo/image/upload/v1661755312/Mehrigiyo/onlineDoctor_gwhktl.png'}
            alt=""
            width={505}
            height={412}
            className="relative"
          />
          <div
            className="w-[288px] absolute -left-24 top-[88px] bg-white p-[18px] shadow-primary rounded-2xl"
            content="card"
          >
            <div className="flex gap-2">
              <Image src={onlineDoctorIcon} alt="" />
              <h4 className="font-bold">Onlayn shifokorlar</h4>
            </div>
            <p className="text-gray-primary text-xs mt-2">
              Bizga shoshilinch sog'liq bo'yicha maslahatchini ayting va biz 60 soniya ichida eng yaxshi shifokorni
              tayinlaymiz
            </p>
          </div>
        </div>
      </section> */}

      <section className="mt-48">
        <ProductsListModule />
      </section>
    </>
  )
}
