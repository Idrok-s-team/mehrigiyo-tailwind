'use client'

import { FC, useEffect } from 'react'
import Image from 'next/image'
import { cleanHtml } from '@/utils'
import { INews } from '@/types'

type Props = {
  data: INews
}

const DoctorDescriptionModule: FC<Props> = ({ data }) => {
  const { image, name, description } = data

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="flex justify-center ">
      <article className="w-full">
        <div>
          <Image
            src={image}
            alt={name}
            width={600}
            height={600}
            loading="eager"
            priority
            className="w-full rounded-[20px]"
          />
        </div>
        <div
          className="mt-8 leading-7"
          dangerouslySetInnerHTML={{ __html: cleanHtml(description.replace(/\n/g, '<br>')) }}
        />
      </article>
    </div>
  )
}

export default DoctorDescriptionModule
