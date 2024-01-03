import { FC } from 'react'
import { Input } from '@/components/common'
import Image from 'next/image'
import appStoreIcon from '@/assets/icons/home/appStoreIcon.svg'
import googlePlayIcon from '@/assets/icons/home/googlePlayIcon.svg'
import mobileScreenIcon from '@/assets/icons/home/mobileScreenIcon.svg'

const NewsListModule: FC = () => {
  return (
    <div className="flex justify-between items-center gap-20">
      <div className="w-1/2">
        <h2>
          ”Mehrigiyo” mobil ilovasini yuklab <span className="text-green-primary"> Shifokorlardan BEPUL maslahat </span>
          oling
        </h2>
        <p className="mt-5 text-gray-primary">
          O’zbekistonning yetakchi shifokorlari bilan videokonsultatsiyadan foydalaning.
        </p>
        <div className="mt-[54px]">
          <label htmlFor="">Ilovani yuklab olish uchun havolani oling</label>
          <Input className="mt-4" />
        </div>
        <div className="flex gap-7 mt-10">
          <button>
            <Image src={appStoreIcon} alt="" />
          </button>
          <button>
            <Image src={googlePlayIcon} alt="" />
          </button>
        </div>
      </div>
      <div>
        <Image src={mobileScreenIcon} alt="" />
      </div>
    </div>
  )
}

export default NewsListModule
