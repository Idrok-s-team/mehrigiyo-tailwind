'use client'

import { memo, type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { INews } from '@/types'
import { ArrowRightLongerGreenIcon } from '@/assets/icons'
import { createSlug, formatDate } from '@/utils'

type Props = {
  data: INews
}

const NewsCard: FC<Props> = memo(function NewsCard({ data }) {
  const { name, id, hashtag, image, created_at, description } = data

  const slug = createSlug(name, id)

  return (
    <article className="w-[347px] h-[543px] flex flex-col shadow-card rounded-3xl bg-white group overflow-hidden">
      <Link
        href={`/news/${slug}`}
        aria-label={`${name} yangiliklar rasmi`}
        className="group-hover:scale-110 transition-transform duration-300 cursor-pointer"
      >
        <Image
          src={image}
          alt={`${name} yangiliklari rasmi`}
          width={347}
          height={249}
          className="w-full h-[249px] object-cover rounded-t-3xl"
        />
      </Link>

      <main className="flex-1 p-5 pb-8">
        <section className="flex items-center gap-1 text-sm">
          <span className="text-green-primary">#{hashtag.tag_name}</span>
          <span className="w-1 h-1 rounded-full bg-[#C4C4C4]"></span>
          <span className="text-[#C4C4C4]">{formatDate(created_at)}</span>
        </section>

        <section className="mt-2 h-[78%]">
          <Link
            href={`/news/${slug}`}
            aria-label={`${name} yangiliklari`}
            className="text-lg font-semibold text-black line-clamp-2 h-1/3 hover:underline"
          >
            {name}
          </Link>
          <p className="text-sm text-gray-primary line-clamp-6">{description}</p>
        </section>

        <Link
          href={`/news/${slug}`}
          aria-label={`Ko'proq o'qish: ${name}`}
          className="flex items-center gap-3 mt-3 text-sm cursor-pointer text-green-primary group"
        >
          <span>Ko'proq o'qish</span>
          <span className="duration-200 group-hover:translate-x-1">
            <ArrowRightLongerGreenIcon />
          </span>
        </Link>
      </main>
    </article>
  )
})

export default NewsCard
