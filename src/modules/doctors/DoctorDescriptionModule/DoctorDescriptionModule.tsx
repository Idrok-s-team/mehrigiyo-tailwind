'use client'

import { FC, useEffect } from 'react'
import Image from 'next/image'
import { useCopyToClipboard } from 'usehooks-ts'
import { BookmarkIcon, SharedIcon } from '@/assets/icons'
import { ActionButton, Button, Tooltip } from '@/components/common'
import { IDoctor } from '@/types/doctor'
import { useChangeFavoriteDoctors } from '@/hooks/doctor'
import { cleanHtml } from '@/utils'

type Props = {
  data: IDoctor
}

const DoctorDescriptionModule: FC<Props> = ({ data }) => {
  const { id, full_name, description, image, type_doctor, review, experience } = data

  const { isDoctorInFavorite, onChangeFavorite } = useChangeFavoriteDoctors(id)
  const [__, copy] = useCopyToClipboard()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const onCopyToClipboard = () => {
    copy(location.href)
  }

  return (
    <div className="flex gap-14 relative max-lg:gap-7 max-md:flex-wrap">
      <div className="w-80 h-80 md:sticky top-32 max-lg:flex-shrink-0 max-md:w-full max-2xs:h-60">
        <Image
          src={image}
          fill
          alt={full_name}
          loading="eager"
          className="object-contain rounded-full !w-80 !h-80 max-md:mx-auto max-2xs:!w-60 max-2xs:!h-60"
        />
      </div>

      <div className="flex-1 mt-5">
        <section className="flex items-end justify-between max-2xs:flex-wrap">
          <h2 className="max-2xs:text-2xl">{full_name}</h2>

          <div className="flex gap-4">
            <ActionButton onClick={onChangeFavorite}>
              {isDoctorInFavorite ? <BookmarkIcon color="#53B175" /> : <BookmarkIcon color="black" />}
            </ActionButton>
            <Tooltip text="Nusxa olish">
              <ActionButton onClick={onCopyToClipboard}>
                <SharedIcon />
              </ActionButton>
            </Tooltip>
          </div>
        </section>

        <section className="flex items-center gap-6 mt-5 w-4/5 max-lg:w-full max-lg:gap-3 max-2xs:flex-wrap">
          <div className="w-full h-[90px] rounded-2xl shadow-doctor-card flex flex-col items-center justify-center">
            <p className="text-[#7C7C7C]">Sharhlar</p>
            <h3 className="font-bold text-[#FFC86D]">{review}+</h3>
          </div>
          <div className="w-full h-[90px] rounded-2xl shadow-doctor-card flex flex-col items-center justify-center">
            <p className="text-[#7C7C7C]">Tajriba</p>
            <h3 className="font-bold text-green-primary">{experience} yil</h3>
          </div>
          <div
            className="w-full h-[90px] rounded-2xl shadow-doctor-card flex flex-col items-center justify-center"
            title={type_doctor.name}
          >
            <Image src={type_doctor.image} alt={type_doctor.name} width={32} height={32} className="object-contain" />
            <p className="font-medium mt-1 px-2 line-clamp-1">{type_doctor.name}</p>
          </div>
        </section>

        <article className="mt-4 bg-gray-primary/10 px-6 py-4 rounded-2xl">
          <p className="font-semibold">Shifokor haqida</p>
          {description && (
            <div
              className="mt-2.5 text-[#222222]/60"
              dangerouslySetInnerHTML={{ __html: cleanHtml(description.replace(/\n/g, '<br>')) }}
            />
          )}
        </article>

        <section className="flex justify-end mt-10 max-md:justify-start">
          <div className="w-56">
            <Button aria-label="Add to cart">Uchrashuv</Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DoctorDescriptionModule
