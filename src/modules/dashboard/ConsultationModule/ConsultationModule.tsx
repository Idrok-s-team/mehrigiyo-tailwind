'use client'

import { FC } from 'react'
import Link from 'next/link'
import { Loader, Tabs } from '@/components/common'
import { useChatRoomsQuery } from '@/hooks/queries'
import Image from 'next/image'
import dayjs from 'dayjs'
import { baseUrl } from '@/constants'
import { UpcomingTimeIcon } from '@/assets/icons'
import { useChatStore } from '@/store'
import { IChatRoom } from '@/types'
import { useLocalStorage } from 'usehooks-ts'

const ConsultationModule: FC = () => {
  const { updateChatState } = useChatStore()
  const { data: chatRoomsData, isLoading } = useChatRoomsQuery({})

  const handleSelectRoom = (room: IChatRoom) => {
    updateChatState('selectedChatRoom', room)
    localStorage.setItem('selectedChatRoom', JSON.stringify(room))
  }

  const Ongoing = () => {
    return (
      <div className="flex flex-col bg-white rounded-[20px] shadow-sidebar overflow-hidden">
        {chatRoomsData?.results.map((room) => {
          const { doktor } = room
          return (
            <Link
              key={room.id}
              href={`/dashboard/consultation/chat/${room.id}`}
              className="flex gap-[13px] pt-5 px-[30px] cursor-pointer duration-100 hover:bg-green-primary/10"
              onClick={() => handleSelectRoom(room)}
            >
              <Image
                src={`${baseUrl}/${doktor.image}`}
                alt={doktor.name}
                width={50}
                height={50}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="flex-1 flex justify-between border-b-[#D7D7D7] border-b-[0.5px] pb-5 text-[#181725]/80">
                <section>
                  <h6>{doktor.name}</h6>
                  <p>{doktor.type}</p>
                </section>
                <section className="mt-1 flex items-center gap-2">
                  <UpcomingTimeIcon />
                  <p>
                    {dayjs(room.created_at).format('DD-MMMM')},&nbsp;
                    <span className="font-semibold">{dayjs(room.created_at).format('HH:mm')}</span>
                  </p>
                </section>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <div className="w-full min-h-[78.5vh] pr-24 relative">
        {isLoading ? (
          <div className="w-full relative flex items-center justify-center min-h-[50vh]">
            <Loader />
          </div>
        ) : (
          <div className="animate-fade-in">
            <section className="flex items-center justify-between">
              <div>
                <h4>Konsultatsiya</h4>
                <p className="text-sm text-gray-primary">Bugun bemorlarimizga xizmat qilish uchun ajoyib kun.</p>
              </div>
            </section>
            <div className="mt-10">
              <Tabs
                items={[
                  { key: 'ongoing', label: 'Hozirgi', children: <Ongoing /> },
                  { key: 'finished', label: 'Tugatilgan' },
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ConsultationModule
