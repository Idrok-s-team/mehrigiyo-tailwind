import React from 'react'
import Image from 'next/image'
import { Breadcrumb } from '@/components/common'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import { SendRequestModule } from '@/modules/home'
import Link from 'next/link'
import { PhoneIcon } from '@/assets/icons'
import { contactData } from '@/constants'

const Help = async () => {
  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Yordam' }]

  return (
    <div className="mt-14">
      <header className="relative flex items-center justify-between gap-32 px-24">
        <figure className="flex gap-12">
          <Image src={backgroundLeaf} alt="" priority className="-ml-[10%] object-cover w-[225px] h-[305px]" />

          <figcaption className="mt-12">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="mt-5">Mehrigiyo sizga yordam beradi</h2>
          </figcaption>
        </figure>

        <Image src={backgroundBranch} alt={''} className="absolute mt-[20%] -right-[9%]" />
      </header>

      <section className="px-24 -mt-[200px]">
        <SendRequestModule />
      </section>

      <section className="grid grid-cols-2 p-16 mx-24 bg-white gap-y-10 rounded-xl shadow-primary">
        {contactData.map(({ name, phone, address }) => (
          <div key={name} className="flex flex-col">
            <h5 className="text-[22px] font-medium">{name}</h5>
            <p className="text-lg text-gray-primary">{address}</p>
            <Link
              href={`tel:${phone}`}
              className="flex items-center gap-2.5 rounded-lg mt-2.5 text-gray-primary bg-gray-primary/10 py-2 px-5 h-10 max-w-[240px] cursor-pointer hover:bg-green-primary/10 group duration-700"
            >
              <span>
                <PhoneIcon />
              </span>
              <span className="text-lg font-medium group-hover:text-green-primary">{phone}</span>
            </Link>
          </div>
        ))}
      </section>

      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24257.508878552435!2d70.988007!3d40.537422!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x603cc83586e778d2!2sMEHRIGIYO!5e0!3m2!1sen!2sus!4v1656483407836!5m2!1sen!2sus"
          width="100%"
          height="564"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy={'no-referrer-when-downgrade'}
        />
      </section>
    </div>
  )
}

export default Help
