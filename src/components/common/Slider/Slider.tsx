'use client'

import React, { forwardRef } from 'react'
import { Swiper, SwiperProps, SwiperRef } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Slider = forwardRef<SwiperRef, SwiperProps>(({ children, ...props }, ref) => {
  return (
    <Swiper {...props} ref={ref} modules={[FreeMode, Navigation, Pagination, Scrollbar, A11y, Autoplay]}>
      {children}
    </Swiper>
  )
})

export default Slider
