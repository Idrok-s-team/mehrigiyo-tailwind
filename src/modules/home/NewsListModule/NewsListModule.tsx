/* eslint-disable react/no-unescaped-entities */
'use client'

import { FC, useMemo, useState } from 'react'
import { Carousel, ProductCardSkeleton, SeeAllButton } from '@/components'
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
        <SeeAllButton text="Batafsil" />
      </div>
      <nav
        className="flex items-center text-lg text-gray-primary"
        style={{ gap: 24, marginTop: 32, listStyle: 'none' }}
      >
        {isFetchingNewsTags ? (
          <div className={`w-20 h-10 grid grid-cols-4 gap-7`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-full h-5 bg-gray-300 rounded-md duration-300 animate-pulse"></div>
            ))}
          </div>
        ) : (
          filterValues?.map(({ key, title }) => (
            <li key={key} className="cursor-pointer list-none">
              {title}
            </li>
          ))
        )}
      </nav>

      <div className="mt-10 flex">
        {isFetchingNews ? (
          <div className="grid grid-cols-5 gap-7 ">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <Carousel>
            {newsData?.results?.map((data) => (
              <NewsCard key={data.id} data={data} setSelectedNews={setSelectedNews} />
            ))}
          </Carousel>
        )}
      </div>
    </>
  )
}

export default NewsListModule
