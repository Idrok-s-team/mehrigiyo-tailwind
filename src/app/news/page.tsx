/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import { Breadcrumb, SeeAllButton, Slider } from '@/components'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import { getNewsApi } from '@/api'
import { formatDate } from '@/utils'
import { NewsListModule } from '@/modules/home'
import { AllNewsModule } from '@/modules/news'

const News = async () => {
  const newsData = await getNewsApi()
  const firstNewsData = newsData.results[0]

  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Yangiliklar' }]

  return (
    <div className="mt-14">
      <header className="relative flex items-center justify-between gap-32">
        <figure className="flex gap-12">
          <Image src={backgroundLeaf} alt="" priority className="-ml-[10%] object-cover w-[225px] h-[305px]" />

          <figcaption className="mt-12">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="mt-5">So'nggi yangiliklar</h2>
          </figcaption>
        </figure>

        <Image src={backgroundBranch} alt={''} className="absolute rotate-45 scale-75 -right-[25%]" />
      </header>

      <article className="-mt-20 bg-white relative flex items-center justify-between gap-[50px] p-10 shadow-primary rounded-3xl">
        <figure className="flex-shrink-0">
          <Image
            src={firstNewsData.image}
            alt={firstNewsData.name}
            width={582}
            height={388}
            className="rounded-l-3xl"
          />
        </figure>
        <div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-green-primary">#{firstNewsData.hashtag.tag_name}</span>
            <span className="w-1 h-1 rounded-full bg-[#C4C4C4]"></span>
            <span className="text-[#C4C4C4]">{formatDate(firstNewsData.created_at)}</span>
          </div>

          <h2 className="mt-3">{firstNewsData.name}</h2>
          <p className="mt-5 text-gray-primary line-clamp-4">{firstNewsData.description}</p>

          <SeeAllButton text="Ko’proq o’qish" className="mt-7 text-green-primary" size="md" />
        </div>
      </article>

      <section className="mt-[60px]">
        <Slider slides={{ perView: 1.6, spacing: 30 }}>
          {newsData.results.map(({ image, name, description, id }) => (
            <div key={id} className="keen-slider__slide">
              <div className="flex items-center gap-6 p-5 bg-white w-[684px] shadow-lg rounded-3xl">
                <Image src={image} alt={name} width={272} height={170} />
                <div>
                  <h6>{name}</h6>
                  <p className="mt-3 text-gray-primary line-clamp-3">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className='mt-36 mb-[75px]'>
        <AllNewsModule />
      </section>
    </div>
  )
}

export default News
