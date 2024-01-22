'use client'

import { FC, useMemo, useState } from 'react'
import { useNewsQuery, useNewsTagsQuery } from '@/hooks/queries'
import { NewsCard, NewsCardSkeleton } from '@/components/specific'

const AllNewsModule: FC = () => {
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
        <h4>Yangiliklar</h4>
      </div>
      <nav
        className="flex items-center text-lg text-gray-primary overflow-x-auto no-scrollbar"
        style={{ gap: 24, marginTop: 32, listStyle: 'none' }}
      >
        {isFetchingNewsTags ? (
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={`skeleton-filter-${index}`} className="w-24 h-7 bg-gray-300 rounded-full animate-pulse" />
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
          <div className="flex gap-[60px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <NewsCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : Number(newsData?.count) < 1 ? (
          <h3 className="w-full min-h-[40vh] flex items-center justify-center">
            Hozircha ushbu bo'limda yangiliklar yo'q
          </h3>
        ) : (
          <div className="grid grid-cols-3 gap-x-[60px] gap-y-[50px] max-xl:gap-x-10 max-lg:gap-x-5 max-[900px]:grid-cols-2 max-[900px]:gap-x-[60px] max-md:gap-x-5 max-md:gap-y-8 max-sm:grid-cols-1">
            {newsData?.results
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((data) => <NewsCard key={data.id} data={data} />)}
          </div>
        )}
      </div>
    </>
  )
}

export default AllNewsModule
