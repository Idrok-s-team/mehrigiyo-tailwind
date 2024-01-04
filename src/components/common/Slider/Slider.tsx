'use client'

import React, { FC } from 'react'
import { Swiper, SwiperProps } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Slider: FC<SwiperProps> = ({ children, ...props }) => {
  return (
    <Swiper {...props} modules={[FreeMode, Navigation, Pagination, Scrollbar, A11y, Autoplay]}>
      {children}
    </Swiper>
  )
}

export default Slider
