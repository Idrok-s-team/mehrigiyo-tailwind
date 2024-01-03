'use client'

import React, { FC, MutableRefObject, ReactNode } from 'react'
import { useKeenSlider, KeenSliderOptions, KeenSliderInstance, KeenSliderPlugin } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

type Props = KeenSliderOptions & {
  thumbNails?: ReactNode
  children?: ReactNode
}

function ThumbnailPlugin(mainRef: MutableRefObject<KeenSliderInstance | null>): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active')
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add('active')
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on('created', () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on('animationStarted', (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

const MultiSlider: FC<Props> = ({ thumbNails, children }) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 1,
    vertical: true,
  })
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
      vertical: true,
    },
    [ThumbnailPlugin(instanceRef)],
  )

  return (
    <div className="flex w-full gap-[30px]" style={{ transform: 'rotateY(180deg)' }}>
      <div ref={sliderRef} className="bg-yellow-100 keen-slider" style={{ transform: 'rotateY(180deg)' }}>
        {children}
      </div>
      <div
        ref={thumbnailRef}
        className="flex flex-col !w-[112px] keen-slider thumbnail bg-fuchsia-300"
        style={{ transform: 'rotateY(180deg)' }}
      >
        {thumbNails}
      </div>
    </div>
  )
}

export default MultiSlider
