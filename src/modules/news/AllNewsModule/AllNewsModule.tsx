/* eslint-disable react/no-unescaped-entities */
'use client'

import { FC, useMemo, useState } from 'react'
import { useNewsQuery, useNewsTagsQuery } from '@/hooks/queries'
import { INews } from '@/types'
import NewsCard from '@/components/NewsCard'

const AllNewsModule: FC = () => {
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
        <h4>Yangiliklar</h4>
      </div>
      <nav
        className="flex items-center text-lg text-gray-primary"
        style={{ gap: 24, marginTop: 32, listStyle: 'none' }}
      >
        {filterValues?.map(({ key, title }) => (
          <li key={key} className="list-none cursor-pointer">
            {title}
          </li>
        ))}
      </nav>

      <div className="grid grid-cols-3 justify-between gap-x-[60px] gap-y-[50px] mt-10">
        {newsData?.results?.map((data) => (
          <NewsCard key={data.id} data={data} setSelectedNews={setSelectedNews} />
        ))}
      </div>
    </>
  )
}

export default AllNewsModule
