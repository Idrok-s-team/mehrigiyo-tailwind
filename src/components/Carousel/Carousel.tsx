'use client'

import { PropsWithChildren, type FC } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'

type Props = PropsWithChildren & EmblaOptionsType

const Carousel: FC<Props> = ({ children, ...options }) => {
  const [emblaRef] = useEmblaCarousel(options)

  return (
    <div className="embla">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-7">{children}</div>
      </div>
    </div>
  )
}

export default Carousel
