import React from 'react'
import Image from 'next/image'
import { Breadcrumb, SeeAllButton } from '@/components/common'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import { getNewsApi } from '@/api'
import { createSlug } from '@/utils'
import { AllNewsModule } from '@/modules/news'
import { HashtagTime } from '@/components/specific'

const News = async () => {
  const newsData = await getNewsApi()
  const firstNewsData = newsData.results[0]
  const firstSlug = createSlug(firstNewsData.name, firstNewsData.id)

  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Yangiliklar' }]

  return (
    <div className="mt-14 px-10 mx-auto xl:px-24 max-md:px-4 max-w-[1440px] max-sm:mt-0 overflow-hidden">
      <header className="relative flex items-center justify-between gap-32">
        <figure className="flex gap-12">
          <Image
            src={backgroundLeaf}
            alt=""
            priority
            className="-ml-[10%] object-cover w-[225px] h-[305px] max-lg:hidden"
          />

          <figcaption className="mt-12">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="mt-5">So'nggi yangiliklar</h2>
          </figcaption>
        </figure>

        <Image src={backgroundBranch} alt={''} className="absolute rotate-45 scale-75 -right-[25%] max-lg:hidden" />
      </header>

      <article className="lg:-mt-20 bg-white relative flex items-center justify-between xl:gap-[50px] p-10 shadow-primary rounded-3xl max-xl:gap-8 max-md:flex-wrap max-lg:mt-10 max-xs:p-5">
        <figure className="w-1/2 max-md:w-full">
          <Image
            src={firstNewsData.image}
            alt={firstNewsData.name}
            width={582}
            height={388}
            className="rounded-l-3xl w-full h-[388px] object-cover max-md:w-full"
          />
        </figure>
        <div className="flex-1">
          <div className="flex items-center gap-1 text-sm">
            <HashtagTime hashtag={firstNewsData.hashtag.tag_name} date={firstNewsData.created_at} />
          </div>

          <h2 className="mt-3 max-xl:text-2xl">{firstNewsData.name}</h2>
          <p className="mt-5 text-gray-primary line-clamp-4">{firstNewsData.description}</p>

          <SeeAllButton
            text="Ko’proq o’qish"
            className="mt-7 text-green-primary"
            size="md"
            href={`/news/${firstSlug}`}
          />
        </div>
      </article>

      <section className="mt-36 mb-[75px]">
        <AllNewsModule />
      </section>
    </div>
  )
}

export default News
