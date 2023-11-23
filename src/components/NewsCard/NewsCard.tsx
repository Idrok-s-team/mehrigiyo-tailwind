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
    <article className="w-[347px] h-[543px] flex flex-col shadow-card rounded-3xl">
      <figure>
        <Image
          src={image}
          alt={name}
          width={347}
          height={249}
          className="w-full h-[249px] object-cover rounded-t-3xl"
        />
      </figure>

      <main className="flex-1 p-5 pb-8">
        <section className="flex items-center gap-1 text-sm">
          <span className="text-green-primary">#{hashtag.tag_name}</span>
          <span className="w-1 h-1 rounded-full bg-[#C4C4C4]"></span>
          <span className="text-[#C4C4C4]">{formatDate(created_at)}</span>
        </section>

        <section className="mt-2 h-[75%]">
          <h5 className="text-lg text-black line-clamp-3 h-1/3">{name}</h5>
          <p className="text-sm text-gray-primary line-clamp-6">{description}</p>
        </section>

        <section className="flex items-center gap-3 mt-3 text-sm cursor-pointer text-green-primary group">
          <span>Ko'proq o'qish</span>
          <span className="duration-200 group-hover:translate-x-1">
            <ArrowRightLongerGreenIcon />
          </span>
        </section>
      </main>
    </article>
  )
})

export default NewsCard
