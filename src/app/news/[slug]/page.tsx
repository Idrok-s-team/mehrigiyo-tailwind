import React from 'react'
import Image from 'next/image'
import { Breadcrumb } from '@/components/common'
import { HashtagTime } from '@/components/specific'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import { getNewsByIdApi } from '@/api'
import { cleanHtml } from '@/utils'
import { ROUTES } from '@/constants'
import { NewsDescriptionModule } from '@/modules/news'

type Props = {
  params: {
    slug: string
  }
}

const NewsBySlug = async ({ params }: Props) => {
  const { slug } = params
  const id = Number(slug.split('___')[1])
  const newsData = await getNewsByIdApi(id)
  const { name, hashtag, created_at } = newsData

  const breadcrumbItems = [
    { text: 'Bosh sahifa', href: ROUTES.HOME },
    { text: 'Yangiliklar', href: ROUTES.NEWS },
    { text: name },
  ]

  return (
    <div className="mt-14 mb-36 px-10 mx-auto xl:px-24 max-md:px-4 mx max-w-[1440px] max-sm:mt-0 overflow-hidden max-md:mb-12">
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
            <h2 className="my-2.5">{name}</h2>
            <HashtagTime hashtag={hashtag.tag_name} date={created_at} />
          </figcaption>
        </figure>

        <Image src={backgroundBranch} alt={''} className="absolute rotate-45 scale-75 -right-[25%] max-lg:hidden" />
      </header>

      <main className="max-lg:mt-12">
        <NewsDescriptionModule data={newsData} />
      </main>
    </div>
  )
}

export default NewsBySlug
