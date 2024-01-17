import { FC } from 'react'
import Image from 'next/image'
import bannerHome from '@/assets/images/home/bannerHome.png'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'

const NewsListModule: FC = () => {
  return (
    <div className="overflow-hidden">
      <div className="w-full flex items-start h-[300px] bg-[#3C3C3C] rounded-3xl relative px-10 py-[50px] max-lg:flex-wrap max-sm:py-5 max-2xs:px-2">
        <Image src={bannerHome} alt="" className="absolute bottom-0" />
        <Image src={backgroundLeaf} alt="" className="absolute right-[26%] top-0" />

        <div className="relative px-5 py-2 max-xl:w-3/5 max-lg:w-full max-sm:px-0">
          <h2 className="text-white max-xs:text-2xl">Biz shifobaxsh o‘tlarimiz o‘sishiga g‘amxo‘rlik qilamiz</h2>
          <p className="text-gray-primary w-3/5 mt-4 max-xl:w-full">
            Farg‘ona vodiysi tabiati bergan bu xilma-xilliklarning barchasi noyob mahsulotlar yaratishga asos bo‘lmoqda.
          </p>
        </div>

        <div className="absolute top-0 right-0 max-lg:bottom-0 max-lg:hidden">
          <Image
            src={'https://res.cloudinary.com/mehrigiyo/image/upload/v1664251391/Mehrigiyo/factory_ngvp35.png'}
            alt="mehrigiyo"
            width={400}
            height={300}
          />
        </div>
      </div>
    </div>
  )
}

export default NewsListModule
