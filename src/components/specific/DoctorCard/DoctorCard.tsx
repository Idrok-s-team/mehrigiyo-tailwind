'use client'

import { type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BookmarkIcon } from '@/assets/icons'
import { createSlug } from '@/utils'
import Button from '../../common/Button'
import { IDoctor } from '@/types/doctor'
import { useChangeFavoriteDoctors } from '@/hooks/doctor'
import { useCommonStore } from '@/store'
import useAppointmentStore from '@/store/appointment'

type Props = {
  data: IDoctor
}

const DoctorCard: FC<Props> = ({ data }) => {
  const { id, full_name, image, rate, review } = data
  const slug = createSlug(full_name, id)

  const { setActiveModal } = useCommonStore()
  const { updateAppointmentState } = useAppointmentStore()
  const { isDoctorInFavorite, onChangeFavorite } = useChangeFavoriteDoctors(id)
  const [firstName, lastName] = full_name.split(' ')

  const handleAppointment = () => {
    setActiveModal('drawer')
    updateAppointmentState('selectedDoctor', data)
  }

  return (
    <article
      key={id}
      className="w-[200px h-[250px] bg-white border border-[#E2E2E2] shadow-secondary rounded-[18px] p-4"
      title={full_name}
    >
      <header className="flex items-start justify-between">
        <Link href={`/online_doctors/${slug}`}>
          <Image src={image} alt={full_name} width={100} height={100} loading="lazy" className="rounded-full" />
        </Link>
        <button aria-label="Add to favorites" className="cursor-pointer" onClick={onChangeFavorite}>
          {isDoctorInFavorite ? <BookmarkIcon color="#53B175" /> : <BookmarkIcon />}
        </button>
      </header>
      <section className="mt-2.5 h-[60px]">
        <Link href={`/online_doctors/${slug}`} className="font-medium line-clamp-1 hover:underline">
          {firstName}&nbsp;{lastName?.[0]}
        </Link>
        <p className="line-clamp-1 mt-1 text-sm text-[#7c7c7c]">
          ⭐️ {rate} ({review} ko'rishlar)
        </p>
      </section>
      <section className="mt-1">
        <Button className="bg-green-primary/10 !text-green-primary rounded-xl" onClick={handleAppointment}>
          Uchrashuv
        </Button>
      </section>
    </article>
  )
}

export default DoctorCard
