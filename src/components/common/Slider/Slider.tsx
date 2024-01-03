'use client'

import React, { FC, ReactNode } from 'react'
import { useKeenSlider, KeenSliderOptions } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

type Props = KeenSliderOptions & {
  children?: ReactNode
  autoPlay?: boolean
}

const defaultAnimation = { duration: 10000, easing: (t: number) => t }

const infiniteMoveOptions: KeenSliderOptions = {
  loop: true,
  renderMode: 'performance',
  drag: true,
  slides: { perView: 5 },
  created: (slider) => slider.moveToIdx(5, true, defaultAnimation),
  updated: (slider) => slider.moveToIdx(slider.track.details.abs + 5, true, defaultAnimation),
  animationEnded: (slider) => slider.moveToIdx(slider.track.details.abs + 5, true, defaultAnimation),
}

const defaultOptions: KeenSliderOptions = {
  slides: { perView: 3, spacing: 40 },
}

const Slider: FC<Props> = ({ children, autoPlay = false, ...props }) => {
  const mergedOptions = autoPlay ? infiniteMoveOptions : { ...defaultOptions, ...props }

  const [ref] = useKeenSlider<HTMLDivElement>(mergedOptions)

  return (
    <div ref={ref} className="keen-slider">
      {children}
    </div>
  )
}

export default Slider
