import { FC } from 'react'
import Image from 'next/image'
import appStoreIcon from '@/assets/icons/home/appStoreIcon.svg'
import googlePlayIcon from '@/assets/icons/home/googlePlayIcon.svg'
import mobileScreenImg from '@/assets/images/home/mobileScreen.png'
import Link from 'next/link'
import { APP_DOWNLOAD_LINKS } from '@/constants'

const NewsListModule: FC = () => {
  return (
    <div className="flex justify-between items-center gap-20 max-lg:gap-5 max-xs:flex-wrap">
      <section className="w-1/2 max-lg:w-3/5 max-xs:w-full">
        <h2>
          ”Mehrigiyo” mobil ilovasini yuklab <span className="text-green-primary"> Shifokorlardan BEPUL maslahat </span>
          oling
        </h2>
        <p className="mt-5 text-gray-primary">
          O’zbekistonning yetakchi shifokorlari bilan videokonsultatsiyadan foydalaning.
        </p>
        <div className="flex gap-7 mt-10 max-2xs:gap-2">
          <Link href={APP_DOWNLOAD_LINKS.APP_STORE} target="_blank">
            <Image src={appStoreIcon} alt="" width={239} height={75} />
          </Link>
          <Link href={APP_DOWNLOAD_LINKS.PLAY_STORE} target="_blank">
            <Image src={googlePlayIcon} alt="" />
          </Link>
        </div>
      </section>
      <section className="max-lg:flex-1 max-xs:mt-5">
        <Image src={mobileScreenImg} alt="" />
      </section>
    </div>
  )
}

export default NewsListModule
