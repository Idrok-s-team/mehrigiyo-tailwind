import { FC } from 'react'
import Image from 'next/image'
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
      <Slider autoPlay>
        {brands.map((brand, index) => (
          <div key={index} className="keen-slider__slide flex items-center">
            <div className="w-full">
              <Image src={brand} alt="" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default BrandsListModule
