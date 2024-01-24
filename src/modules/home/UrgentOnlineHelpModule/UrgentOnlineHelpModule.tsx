import { FC } from 'react'
import Image from 'next/image'
import { SeeAllButton } from '@/components/common'
import onlineDoctorIcon from '@/assets/icons/home/onlineDoctorIcon.svg'
import { ROUTES } from '@/constants'

const BrandsListModule: FC = () => {
  return (
    <div className="flex items-center justify-between max-xl:flex-wrap">
      <div className="w-2/5 max-xl:w-full">
        <h2>Shoshilinch onlayn yordam</h2>
        <p className="mt-4 text-gray-primary">
          Bizga shoshilinch sog'liq bo'yicha maslahatchini ayting va biz 60 soniya ichida eng yaxshi shifokorni
          tayinlaymiz.
        </p>
        <SeeAllButton text="Onlayn uchrashuv belgilash" className="mt-10 max-2xs:w-full" href={ROUTES.ONLINE_DOCTORS_CATEGORY} />
      </div>
      <div className="relative mx-auto max-xl:mt-10">
        <Image
          src={'https://res.cloudinary.com/mehrigiyo/image/upload/v1661755312/Mehrigiyo/onlineDoctor_gwhktl.png'}
          alt=""
          width={505}
          height={412}
          className="relative"
        />
        <div
          className="absolute sm:top-[88px] bg-white p-[18px] shadow-primary rounded-2xl sm:w-[288px] md:-left-24 max-sm:bottom-0 max-2xs:-bottom-20 max-2xs:h-[130px]"
          content="card"
        >
          <div className="flex gap-2">
            <Image src={onlineDoctorIcon} alt="" />
            <h4 className="font-bold max-2xs:text-lg">Onlayn shifokorlar</h4>
          </div>
          <p className="mt-2 text-xs text-gray-primary">
            Bizga shoshilinch sog'liq bo'yicha maslahatchini ayting va biz 60 soniya ichida eng yaxshi shifokorni
            tayinlaymiz
          </p>
        </div>
      </div>
    </div>
  )
}

export default BrandsListModule
