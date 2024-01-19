'use client'

import React, { FC, memo, useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Mousewheel, FreeMode } from 'swiper/modules'
import { ArrowRightIcon } from '@/assets/icons'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/zoom'
import 'swiper/css/thumbs'
import { useScreenSize } from '@/hooks/common'

interface ISlide {
  name: string
  image: string
}

type Props = {
  slides: ISlide | ISlide[]
}

const ViewSlide: FC<Props> = ({ slides }): JSX.Element => {
  const [imagesNavSlider, setImagesNavSlider] = useState<any>(null)
  const sliderRef = useRef<any>()
  const { isMaxMd } = useScreenSize()

  const handleSwiper = (e: any) => {
    setImagesNavSlider(e)
    sliderRef.current = e
  }
  const slidesArray = Array.isArray(slides)

  return (
    <div className="flex items-start justify-start h-full max-md:flex-wrap">
      {/* Thumbnails slide images */}
      <section className="flex max-md:order-2 max-md:mt-3 max-md:w-full max-md:justify-start">
        <Swiper
          onSwiper={handleSwiper}
          spaceBetween={10}
          modules={[Mousewheel, FreeMode]}
          freeMode
          mousewheel
          direction={isMaxMd ? 'horizontal' : 'vertical'}
          className="!pr-4 max-h-[300px] w-full"
        >
          {slidesArray ? (
            slides.map((slide) => (
              <SwiperSlide key={slide.name} className="cursor-pointer !w-20 !h-20 bg-white">
                <Image
                  src={slide.image}
                  width={80}
                  height={80}
                  alt={slide.name}
                  className="object-contain w-full h-full"
                  loading="eager"
                />
              </SwiperSlide>
            ))
          ) : (
            <Image
              src={slides.image}
              width={80}
              height={80}
              alt={slides.name}
              className="object-contain w-full h-full"
              loading="eager"
            />
          )}
        </Swiper>
        {/* <button onClick={() => sliderRef.current?.slidePrev()} className="absolute top-0 left-8 -rotate-90 before:">
          <ArrowRightIcon />
        </button>
        <button onClick={() => sliderRef.current?.slideNext()} className="absolute z-20 bottom-10 left-7 rotate-90">
          <ArrowRightIcon />
        </button> */}
      </section>

      {/* Main view slide image */}
      <Swiper
        thumbs={{
          swiper: imagesNavSlider && !imagesNavSlider.destroyed ? imagesNavSlider : null,
        }}
        slidesPerView={1}
        spaceBetween={20}
        modules={[Thumbs]}
        className="w-full h-full flex items-center justify-center bg-white"
      >
        {slidesArray ? (
          slides.map((slide) => (
            <SwiperSlide key={slide.name}>
              <Image
                src={slide.image}
                fill
                alt={slide.name}
                loading="eager"
                className="object-contain max-sm:object-cover"
              />
            </SwiperSlide>
          ))
        ) : (
          <Image src={slides.image} fill alt={slides.name} loading="eager" className="object-contain" />
        )}
      </Swiper>
    </div>
  )
}

export default ViewSlide
