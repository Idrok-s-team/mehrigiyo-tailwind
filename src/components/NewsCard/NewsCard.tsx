/* eslint-disable react/no-unescaped-entities */
'use client'

import { memo, type FC } from 'react'
import Image from 'next/image'
import { INews } from '@/types'
import { ArrowRightLongerGreenIcon } from '@/assets/icons'
import { formatDate } from '@/utils'

type Props = {
  data: INews
  setSelectedNews: (product: INews) => void
}

const NewsCard: FC<Props> = memo(function NewsCard({ data, setSelectedNews }) {
  const { name, hashtag, image, created_at, description } = data

  return (
    <article className="w-[347px] h-[543px] flex flex-col shadow-card rounded-3xl mb-[200px]">
      <figure>
        <Image
          src={image}
          alt={name}
          width={347}
          height={249}
          className="rounded-t-3xl w-full h-[249px] object-cover"
        />
      </figure>

      <main className="flex-1 p-5 pb-8">
        <section className="text-sm flex items-center gap-1">
          <span className="text-green-primary">#{hashtag.tag_name}</span>
          <span className="w-1 h-1 rounded-full bg-[#C4C4C4]"></span>
          <span className="text-[#C4C4C4]">{formatDate(created_at)}</span>
        </section>

        <section className="mt-2 h-[75%]">
          <h5 className="text-lg text-black line-clamp-3 h-1/3">{name}</h5>
          <p className=" text-gray-primary text-sm line-clamp-6">{description}</p>
        </section>

        <section className="flex items-center gap-3 text-green-primary text-sm mt-3 cursor-pointer group">
          <span>Ko'proq o'qish</span>
          <span className="group-hover:translate-x-1 duration-200">
            <ArrowRightLongerGreenIcon />
          </span>
        </section>
      </main>
    </article>
  )
})

export default NewsCard
