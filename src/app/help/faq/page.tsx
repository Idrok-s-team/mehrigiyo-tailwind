import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Accordion, Breadcrumb } from '@/components/common'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import { faqData } from '@/constants'

const Faq = () => {
  const breadcrumbItems = [
    { text: 'Bosh sahifa', href: '/' },
    { text: 'Yordam', href: '/help' },
    { text: "Ko'p so'raladigan savollar" },
  ]

  return (
    <div className="mt-14 px-10 mb-[70px] mx-auto xl:px-24 max-md:px-4 mx max-w-[1440px] max-sm:mt-0 overflow-hidden">
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
            <h2 className="mt-5">Ko’p so'raladigan savollar</h2>
            <Link href="/help" className="text-green-primary mt-2.5">
              Qo'shimcha ma'lumot uchun biz bilan bog'laning
            </Link>
          </figcaption>
        </figure>

        <Image src={backgroundBranch} alt={''} className="absolute mt-[20%] -right-[9%] max-lg:hidden" />
      </header>

      <section className="relative mt-10">
        <Accordion items={faqData} isFirstItemOpened withIndex={false} size="md" />
      </section>
    </div>
  )
}

export default Faq
