'use client'

import { PropsWithChildren, type FC } from 'react'
import { useKeenSlider, KeenSliderOptions } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

type Props = PropsWithChildren & KeenSliderOptions

const Slider: FC<Props> = ({ children, ...props }) => {
  const defaultOptions: KeenSliderOptions = {
    slides: {
      perView: 3,
      spacing: 40,
    },
  }
  const mergedOptions = { ...defaultOptions, ...props }
  const [ref] = useKeenSlider<HTMLDivElement>(mergedOptions)

  return (
    <div ref={ref} className="keen-slider">
      {children}
    </div>
  )
}

export default Slider
