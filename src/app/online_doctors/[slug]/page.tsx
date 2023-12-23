import React from 'react'
import { Breadcrumb } from '@/components'
import { getDoctorByIdApi } from '@/api'
import { DoctorDescriptionModule } from '@/modules/doctors'

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
    { text: 'Bosh sahifa', href: '/' },
    { text: 'Shifokorlar', href: '/online_doctors/category' },
    { text: doctor.full_name },
  ]

  return (
    <div className="px-24 mt-14 mb-36">
      <header className="relative flex items-center justify-between gap-32">
        <figure className="flex gap-12">
          {/* <Image src={backgroundLeaf} alt="" priority className="-ml-[15%]" /> */}

          <figcaption className="mt-12">
            <Breadcrumb items={breadcrumbItems} />
          </figcaption>
        </figure>
      </header>

      <main className="mt-10">
        <DoctorDescriptionModule data={doctor} />
      </main>
    </div>
  )
}

export default DoctorBySlug
