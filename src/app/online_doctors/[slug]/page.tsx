import React from 'react'
import { Breadcrumb } from '@/components/common'
import { getDoctorByIdApi } from '@/api'
import { DoctorDescriptionModule } from '@/modules/doctors'
import { ROUTES } from '@/constants'

type Props = {
  params: {
    slug: string
  }
}

const DoctorBySlug = async ({ params }: Props) => {
  const { slug } = params
  const id = Number(slug.split('___')[1])
  const doctor = await getDoctorByIdApi(id)

  const breadcrumbItems = [
    { text: 'Bosh sahifa', href: ROUTES.HOME },
    { text: 'Shifokorlar', href: ROUTES.ONLINE_DOCTORS_CATEGORY },
    { text: doctor.full_name },
  ]

  return (
    <div className="mt-14 mb-36 mx-auto px-10 max-xs:px-4 xl:px-24 max-w-[1440px] max-md:mb-16">
      <header className="relative flex items-center justify-between gap-32">
        <div>
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </header>

      <main className="mt-10">
        <DoctorDescriptionModule data={doctor} />
      </main>
    </div>
  )
}

export default DoctorBySlug
