'use client'

import { FC } from 'react'
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

  const onCopyToClipboard = () => {
    copy(location.href)
  }

  return (
    <>
      <div className="flex gap-14 relative">
        <section className="w-80 h-80 sticky top-32">
          <Image src={image} fill alt={full_name} loading="eager" className="object-contain rounded-full" />
        </section>

        <div className="flex-1 mt-5">
          <section className="flex items-end justify-between">
            <h2>{full_name}</h2>

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

          <section className="flex items-center gap-6 mt-5">
            <div className="w-[170px] h-[90px] rounded-2xl shadow-doctor-card flex flex-col items-center justify-center">
              <p className="text-[#7C7C7C]">Sharhlar</p>
              <h3 className="font-bold text-[#FFC86D]">{review}+</h3>
            </div>
            <div className="w-[170px] h-[90px] rounded-2xl shadow-doctor-card flex flex-col items-center justify-center">
              <p className="text-[#7C7C7C]">Tajriba</p>
              <h3 className="font-bold text-green-primary">{experience} yil</h3>
            </div>
            <div
              className="w-[170px] h-[90px] px-4 rounded-2xl shadow-doctor-card flex flex-col items-center justify-center"
              title={type_doctor.name}
            >
              <Image src={type_doctor.image} alt={type_doctor.name} width={32} height={32} className="object-contain" />
              <p className="font-medium mt-1">{type_doctor.name}</p>
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

          <section className="flex justify-end mt-10">
            <div className="w-56">
              <Button aria-label="Add to cart">Uchrashuv</Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default DoctorDescriptionModule
