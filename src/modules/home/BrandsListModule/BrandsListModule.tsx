'use client'

import { FC } from 'react'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'
import { Slider } from '@/components/common'
import grandpharmIcon from '@/assets/icons/home/grandpharmIcon.svg'
import asklepiyIcon from '@/assets/icons/home/asklepiyIcon.svg'
import doriDarmonIcon from '@/assets/icons/home/doriDarmonIcon.svg'
import nikapharmIcon from '@/assets/icons/home/nikapharmIcon.svg'
import laxisamIcon from '@/assets/icons/home/laxisamIcon.svg'
import jayxunInvestIcon from '@/assets/icons/home/jayxunInvestIcon.svg'

const BrandsListModule: FC = () => {
  const brands = [grandpharmIcon, asklepiyIcon, doriDarmonIcon, nikapharmIcon, laxisamIcon, jayxunInvestIcon]

  return (
    <div className="py-6 border-y-[1px] border-gray-100">
      <Slider
        effect="fade"
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={1000}
        loopAdditionalSlides={3}
        breakpoints={{
          1024: {
            slidesPerView: 5,
          },
          880: {
            slidesPerView: 4,
          },
          600: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 2.5,
          },
          400: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1,
          },
        }}
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[105px] flex items-center justify-center">
              <Image src={brand} alt="Mehrigiyo brands" />
            </div>
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  )
}

export default BrandsListModule
