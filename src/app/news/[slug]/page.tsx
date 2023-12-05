import React from 'react'
import Image from 'next/image'
import { Breadcrumb, HashtagTime } from '@/components'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import { getNewsByIdApi } from '@/api'

type Props = {
  params: {
    slug: string
  }
}

const NewsBySlug = async ({ params }: Props) => {
  const { slug } = params
  const id = Number(slug.split('___')[1])
  const { name, hashtag, created_at, image, description } = await getNewsByIdApi(id)

  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Yangiliklar', href: '/news' }, { text: name }]

  return (
    <div className="px-24 overflow-hidden mt-14 mb-36">
      <header className="relative flex items-center justify-between gap-32">
        <figure className="flex gap-12">
          <Image src={backgroundLeaf} alt="" priority className="-ml-[10%] object-cover w-[225px] h-[305px]" />

          <figcaption className="mt-12">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="my-2.5">{name}</h2>
            <HashtagTime hashtag={hashtag.tag_name} date={created_at} />
          </figcaption>
        </figure>

        <Image src={backgroundBranch} alt={''} className="absolute rotate-45 scale-75 -right-[25%]" />
      </header>

      <main className="flex">
        <article className="w-4/5">
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
          <div className="mt-7" dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }} />
        </article>
      </main>
    </div>
  )
}

export default NewsBySlug
