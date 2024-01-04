'use client'

import { FC, useMemo, useState } from 'react'
import { SeeAllButton, Slider } from '@/components/common'
import { useNewsQuery, useNewsTagsQuery } from '@/hooks/queries'
import NewsCard from '@/components/specific/NewsCard'
import { NewsCardSkeleton, ProductCardSkeleton } from '@/components/specific'
import { SwiperSlide } from 'swiper/react'

const NewsListModule: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('')

  const { data: newsTagsData, isLoading: isFetchingNewsTags } = useNewsTagsQuery()
  const { data: newsData, isLoading: isFetchingNews } = useNewsQuery({ params: { tag_id: selectedFilter } })

  const filterValues = useMemo(
    () => [
      { key: '', title: 'Hammasi' },
      ...(newsTagsData?.map((value) => ({ key: value.id.toString(), title: value.tag_name })) || []),
    ],
    [newsTagsData],
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <h4>So'nggi yangiliklar</h4>
        <SeeAllButton text="Batafsil" size="md" href="/news" />
      </div>
      <nav
        className="flex items-center text-lg text-gray-primary"
        style={{ gap: 24, marginTop: 32, listStyle: 'none' }}
      >
        {isFetchingNewsTags ? (
          <div className={`w-20 h-10 grid grid-cols-4 gap-7`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="w-full h-5 duration-300 bg-gray-300 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          filterValues?.map(({ key, title }) => (
            <li
              key={key}
              className={`list-none cursor-pointer ${
                selectedFilter === key ? 'text-green-primary font-medium duration-300' : ''
              }`}
              onClick={() => setSelectedFilter(key)}
            >
              {title}
            </li>
          ))
        )}
      </nav>

      <div className="mt-10">
        {isFetchingNews ? (
          <div className="flex gap-[30px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <NewsCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : Number(newsData?.count) < 1 ? (
          <h3 className="w-full min-h-[40vh] flex items-center justify-center">
            Hozircha ushbu bo'limda yangiliklar yo'q
          </h3>
        ) : (
          <Slider slidesPerView={3.3} autoplay>
            {newsData?.results?.map((data) => (
              <SwiperSlide key={data.id} className="keen-slider__slide p-2 py-7">
                <NewsCard data={data} />
              </SwiperSlide>
            ))}
          </Slider>
        )}
      </div>
    </>
  )
}

export default NewsListModule
