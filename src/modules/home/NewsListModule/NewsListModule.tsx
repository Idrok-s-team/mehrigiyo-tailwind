'use client'

import { FC, useMemo, useState } from 'react'
import { SeeAllButton, Slider } from '@/components/common'
import { useNewsQuery, useNewsTagsQuery } from '@/hooks/queries'
import NewsCard from '@/components/specific/NewsCard'
import { NewsCardSkeleton } from '@/components/specific'
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
      <div className="flex items-center justify-between max-sm:flex-wrap">
        <h4>So'nggi yangiliklar</h4>
        <SeeAllButton text="Batafsil" size="md" href="/news" className="max-sm:mt-2" />
      </div>
      <nav
        className="w-1/2 flex items-center text-lg text-gray-primary animate-fade-in max-md:w-full"
        style={{ gap: 24, marginTop: 32, listStyle: 'none' }}
      >
        {isFetchingNewsTags ? (
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={`skeleton-filter-${index}`} className="w-24 h-7 bg-gray-300 rounded-full animate-pulse" />
            ))}
          </div>
        ) : (
          <Slider
            breakpoints={{
              360: {
                slidesPerView: 3,
              },
              240: {
                slidesPerView: 2,
              },
            }}
          >
            {filterValues?.map(({ key, title }) => (
              <SwiperSlide key={key} className="mx-2">
                <li
                  className={`list-none cursor-pointer ${
                    selectedFilter === key ? 'text-green-primary font-medium duration-300' : ''
                  }`}
                  onClick={() => setSelectedFilter(key)}
                >
                  {title}
                </li>
              </SwiperSlide>
            ))}
          </Slider>
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
          <Slider
            autoplay
            breakpoints={{
              1345: {
                slidesPerView: 3.3,
              },
              1240: {
                slidesPerView: 3,
              },
              1070: {
                slidesPerView: 2.5,
              },
              930: {
                slidesPerView: 2.1,
              },
              630: {
                slidesPerView: 1.6,
              },
              480: {
                slidesPerView: 1.3,
              },
              420: {
                slidesPerView: 1.1,
              },
              360: {
                slidesPerView: 1,
              },
            }}
          >
            {newsData?.results?.map((data) => (
              <SwiperSlide key={data.id} className="p-2 py-7">
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
