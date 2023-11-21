import { FC } from 'react'
import Image from 'next/image'
import bannerHome from '@/assets/images/home/bannerHome.png'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'

const NewsListModule: FC = () => {
  return (
    <div className="overflow-hidden">
      <div className="w-full flex items-start h-[300px] bg-[#3C3C3C] rounded-3xl relative px-10 py-[50px]">
        <Image src={bannerHome} alt="" className="absolute bottom-0" />
        <Image src={backgroundLeaf} alt="" className="absolute right-[26%] top-0" />

        <div className="">
          <h2 className="text-white">Biz shifobaxsh o‘tlarimiz o‘sishiga g‘amxo‘rlik qilamiz</h2>
          <p className="text-gray-primary w-3/5 mt-4">
            Farg‘ona vodiysi tabiati bergan bu xilma-xilliklarning barchasi noyob mahsulotlar yaratishga asos bo‘lmoqda.
          </p>
        </div>

        <div className="absolute top-0 right-0">
          <Image
            src={'https://res.cloudinary.com/mehrigiyo/image/upload/v1664251391/Mehrigiyo/factory_ngvp35.png'}
            alt="mehrigiyo"
            width={400}
            height={300}
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  )
}

export default NewsListModule
