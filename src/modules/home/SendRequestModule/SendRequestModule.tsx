import { FC } from 'react'
import { Input, SeeAllButton } from '@/components'
import Image from 'next/image'
import contactPersonIcon from '@/assets/icons/home/contactPersonIcon.svg'
import contactBublesIcon from '@/assets/icons/home/contactBublesIcon.svg'
import { ContactSendIcon } from '@/assets/icons'

const NewsListModule: FC = () => {
  return (
    <div className="relative flex w-full gap-20">
      <Image src={contactBublesIcon} alt="" className="absolute top-0 -left-[10%]" />
      <div className="mt-40">
        <Image src={contactPersonIcon} alt="" className="" />
      </div>

      <div className="mt-40">
        <p className="z-10 text-green-primary">Biz bilan bog'lanish</p>
        <h2>So'rovingizni yuboring</h2>
        <div className="relative flex flex-col gap-6 mt-10">
          <Input label="Foydalanuvchi nomi" />
          <Input label="Elektron pochta (ixtiyoriy)" />
          <Input label="Telefon raqam" />
          <Input label="Sizning savolingiz" />
          <SeeAllButton text="Xabar yuborish" icon={<ContactSendIcon />} size="md" className="w-2/3" />
        </div>
      </div>
    </div>
  )
}

export default NewsListModule
