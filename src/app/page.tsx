/* eslint-disable react/no-unescaped-entities */
import { Input } from '@/components'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  return (
    <>
      <div className="w-full absolute inset-0 top-0 h-[97vh] bg-[url(../assets/icons/background/backgroundDarkGreen.svg)] bg-no-repeat bg-bottom bg-cover">
        <div className="w-full h-[100vh] bg-[url(../assets/icons/background/backgroundLightGreen.svg)] bg-no-repeat bg-bottom bg-cover">
          <div className="flex flex-col items-center">
            <section className="text-center pt-40 px-24">
              <h1 className="text-[44px] font-bold">Bepul shifokor maslahati kerakmi?</h1>
              <p className="mx-auto mt-3">24/7 Video maslahat Shaxsiy maslahat + Audio qo'ng'iroq</p>
              <p>
                Faqat{' '}
                <Link href="#" className="text-green-dark underline">
                  mobil ilovada
                </Link>
              </p>
            </section>

            <section className="w-2/5 mt-5">
              <Input size="lg" />
            </section>

            <section>
              <Image
                src={'https://res.cloudinary.com/mehrigiyo/image/upload/v1661486824/Mehrigiyo/doctorCall_r3tuct.png'}
                alt="Doctor"
                width={900}
                height={600}
                priority
              />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
