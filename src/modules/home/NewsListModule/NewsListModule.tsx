/* eslint-disable react/no-unescaped-entities */
'use client'

import { FC, useMemo, useState } from 'react'
import { ProductCardSkeleton, SeeAllButton, Slider } from '@/components'
import { useNewsQuery, useNewsTagsQuery } from '@/hooks/queries'
import { INews } from '@/types'
import NewsCard from '@/components/NewsCard'

const NewsListModule: FC = () => {
  const [selectedNews, setSelectedNews] = useState<INews | null>(null)

  const { data: newsData, isFetching: isFetchingNews } = useNewsQuery()
  const { data: newsTagsData, isFetching: isFetchingNewsTags } = useNewsTagsQuery()

  const filterValues = useMemo(
    () => [
      { key: '', title: 'Hammasi' },
      ...(newsTagsData?.map((value) => ({ key: value.id, title: value.tag_name })) || []),
    ],
    [newsTagsData],
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <h4>So'nggi yangiliklar</h4>
        <SeeAllButton text="Batafsil" size="md" />
      </div>
      <nav
        className="flex items-center text-lg text-gray-primary"
        style={{ gap: 24, marginTop: 32, listStyle: 'none' }}
      >
        {isFetchingNewsTags ? (
          <div className={`w-20 h-10 grid grid-cols-4 gap-7`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-full h-5 duration-300 bg-gray-300 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : (
          filterValues?.map(({ key, title }) => (
            <li key={key} className="list-none cursor-pointer">
              {title}
            </li>
          ))
        )}
      </nav>

      <div className="flex mt-10">
        {isFetchingNews ? (
          <div className="grid grid-cols-5 gap-7 ">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <Slider slides={{ perView: 3.3 }}>
            {newsData?.results?.map((data) => (
              <div key={data.id} className="keen-slider__slide p-2 py-7">
                <NewsCard data={data} setSelectedNews={setSelectedNews} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  )
}

export default NewsListModule
