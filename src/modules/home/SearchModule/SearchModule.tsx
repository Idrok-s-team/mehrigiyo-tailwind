'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'usehooks-ts'
import { EmptyBox, Input, Loader } from '@/components/common'
import { useShopSearchQuery } from '@/hooks/queries'
import { ROUTES, baseUrl } from '@/constants'
import { createSlug } from '@/utils'

const SearchModule: FC = () => {
  const [searchText, setSearchText] = useState('')
  const [visible, setVisible] = useState(false)
  const debouncedSearchValue = useDebounce<string>(searchText, 1000)
  const router = useRouter()

  const {
    data: shopSearchData,
    isFetching,
    refetch,
  } = useShopSearchQuery(
    { key: debouncedSearchValue, doctors: true, medicines: false, news: false },
    { options: { enabled: false } },
  )

  const data = Object.entries(Object(shopSearchData?.data)).map(([key, values]) => ({
    title: key,
    items: values,
  }))
  const item = data.map((items) => items.items)
  const isEmpty = item.every((item: any) => !item.length)
  console.log(isEmpty)

  useEffect(() => {
    if (debouncedSearchValue.length > 1) {
      refetch()
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [debouncedSearchValue, refetch])

  const renderTitle = (key: string) => {
    const titles = {
      medicines: 'Mahsulotlar',
      doctors: 'Shifokorlar',
      news: 'Yangiliklar',
    } as any
    return titles[key] || ''
  }

  const renderLink = (key: string, name: string, id: number) => {
    const slug = createSlug(name, id)
    const routes = {
      medicines: `${ROUTES.PRODUCTS}/${slug}`,
      doctors: `${ROUTES.ONLINE_DOCTORS}/${slug}`,
      news: `${ROUTES.NEWS}/${slug}`,
    } as any
    return routes[key] || ''
  }

  const renderLinkAll = (key: string) => {
    const categoryRoutes = {
      medicines: ROUTES.PRODUCTS_CATEGORY,
      doctors: ROUTES.ONLINE_DOCTORS_CATEGORY,
      news: ROUTES.NEWS,
    } as any
    router.push(categoryRoutes[key] || '')
  }

  return (
    <div className="flex flex-col items-center">
      <section className="pt-16 max-lg:pt-10 text-center">
        <h1 className="max-md:text-3xl">Bepul shifokor maslahati kerakmi?</h1>
        <p className="mx-auto mt-3">24/7 Video maslahat Shaxsiy maslahat + Audio qo'ng'iroq</p>
        <p>
          Faqat{' '}
          <Link href="#" className="underline text-green-dark">
            mobil ilovada
          </Link>
        </p>
      </section>
      <section className="relative w-2/5 max-xs:w-full max-sm:w-4/5 max-lg:w-3/5 mt-5">
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="!p-0 rounded-3xl !px-3 !py-3"
          placeholder="Nima izlayapsiz?"
        />
        {visible && (
          <div className="absolute w-full top-[50px] h-96 bg-white rounded-2xl shadow-2xl pb-4 overflow-auto">
            {isFetching ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader />
              </div>
            ) : !isEmpty ? (
              data.map(
                ({ items, title }: any) =>
                  items.length > 0 && (
                    <div key={title} className="mt-4">
                      <div className="flex justify-between px-3">
                        <h5>{renderTitle(title)}</h5>
                        <button
                          className="hover:text-green-primary duration-300 transition-colors"
                          onClick={() => renderLinkAll(title)}
                        >
                          Barchasi
                        </button>
                      </div>
                      {items?.map((item: any) => (
                        <Link
                          key={`${title}_${item.id}`}
                          href={renderLink(title, item.name || item.full_name, item.id)}
                          className="mt-2 flex items-center gap-4 p-3 duration-300 cursor-pointer transition-colors hover:bg-green-light"
                        >
                          <Image
                            src={`${baseUrl}/${item.image}`}
                            alt={item.name || ''}
                            width={50}
                            height={50}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div>
                            <h6 className="line-clamp-1">{item.name || item.full_name}</h6>
                            <p className="line-clamp-2 text-sm leading-4">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ),
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <EmptyBox title="Hech narsa topilmadi" withoutButton />
              </div>
            )}
          </div>
        )}
      </section>
      <section className="flex items-center justify-center mt-2 max-md:w-[100vw] max-lg:w-[80vw]">
        <Image
          src={'https://res.cloudinary.com/mehrigiyo/image/upload/v1661486824/Mehrigiyo/doctorCall_r3tuct.png'}
          alt="Doctor"
          className="w-full"
          width={900}
          height={600}
          priority
        />
      </section>
    </div>
  )
}

export default SearchModule
