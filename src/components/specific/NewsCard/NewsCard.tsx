'use client'

import { type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { INews } from '@/types'
import { ArrowRightLongerGreenIcon } from '@/assets/icons'
import { createSlug } from '@/utils'
import { HashtagTime } from '@/components/specific'
import clsx from 'clsx'

type Props = {
  data: INews
  className?: string
}

const NewsCard: FC<Props> = ({ data, className }) => {
  const { name, id, hashtag, image, created_at, description } = data

  const slug = createSlug(name, id)

  const cardClasses = clsx(
    'h-[543px] flex flex-col shadow-card rounded-3xl bg-white group overflow-hidden max-xs:w-full',
    className,
  )

  return (
    <article className={cardClasses}>
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
        <HashtagTime hashtag={hashtag.tag_name} date={created_at} />

        <section className="mt-2 h-[78%] max-sm:h-[75%]">
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
          className="flex items-center gap-3 mt-3 text-sm cursor-pointer text-green-primary group max-xs:mt-1"
        >
          <span>Ko'proq o'qish</span>
          <span className="duration-200 group-hover:translate-x-1">
            <ArrowRightLongerGreenIcon />
          </span>
        </Link>
      </main>
    </article>
  )
}

export default NewsCard
