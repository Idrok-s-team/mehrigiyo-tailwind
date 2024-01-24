'use client'

import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { SwiperRef, SwiperSlide } from 'swiper/react'
import { SlidePrevIcon } from '@/assets/icons/about'
import { Slider } from '@/components/common'
import certificateImg1 from '@/assets/images/about/USDA.png'
import certificateImg2 from '@/assets/images/about/USDA2.png'
import certificateImg3 from '@/assets/images/about/USDA3.png'
import certificateImg4 from '@/assets/images/about/USDA4.png'

const AboutCertificatesModule: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const swiperRef = useRef<SwiperRef | null>(null)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const certificates = [certificateImg1, certificateImg2, certificateImg3, certificateImg4]

  return (
    <div className="flex items-center justify-between gap-20 max-lg:gap-10 max-md:gap-5 max-md:flex-wrap">
      <section>
        <h2 className="font-extrabold">Yutuqlar va sertifikatlar</h2>
        <p className="mt-3 text-gray-primary">
          2020 yil dekabr oyida kompaniya ikkita xalqaro organik sertifikatlarni oldi: Amerika USDA ORGANIC va Yevropa
          EU ORGANIC Gollandiyaning Control Union Certifications kompaniyasidan. Yaqin kelajakda Saudiya Arabistoni,
          Omon, AQSH, Yevropa mamlakatlariga mahsulot eksport qilish rejalashtirilgan.
        </p>
        <div className="flex gap-3.5 mt-10 max-md:hidden">
          <button onClick={() => swiperRef.current?.swiper.slidePrev()}>
            <SlidePrevIcon />
          </button>
          <button className="rotate-180" onClick={() => swiperRef.current?.swiper.slideNext()}>
            <SlidePrevIcon />
          </button>
        </div>
      </section>

      {isLoading ? (
        <div className="flex gap-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="w-[200px] h-[280px] animate-pulse bg-gray-200 rounded-md" key={`skeleton-${index}`}></div>
          ))}
        </div>
      ) : (
        <section className="w-[55%] max-md:hidden">
          <Slider slidesPerView={3} spaceBetween={40} ref={swiperRef}>
            {certificates.map((certificate, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={certificate}
                  alt={`Certificate ${index + 1}`}
                  className="w-[213px] h-[300px] object-contain"
                />
              </SwiperSlide>
            ))}
          </Slider>
        </section>
      )}

      <section className="flex items-center gap-10 overflow-x-auto no-scrollbar max-md:w-full md:hidden">
        {certificates.map((item, index) => (
          <Image src={item} alt="" key={`Certificate-${index}`} className="w-[213px] h-[300px] object-contain" />
        ))}
      </section>
    </div>
  )
}

export default AboutCertificatesModule
