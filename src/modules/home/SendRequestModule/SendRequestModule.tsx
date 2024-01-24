'use client'

import { FC, FormEvent, useState } from 'react'
import { Input, MaskInput, SeeAllButton } from '@/components/common'
import Image from 'next/image'
import contactPersonIcon from '@/assets/icons/home/contactPersonIcon.svg'
import contactBublesIcon from '@/assets/icons/home/contactBublesIcon.svg'
import { ContactSendIcon } from '@/assets/icons'
import { useAddCommentQuestion } from '@/hooks/mutations'
import { ICommentQuestion } from '@/types'
import toast from 'react-hot-toast'
import { inputHandler } from '@/utils'
import { WARNING_TEXTS } from '@/constants'

type FieldsType = Omit<ICommentQuestion, 'answer' | 'id'>
const initialFields: FieldsType = {
  full_name: '',
  email: '',
  phone: '',
  question: '',
}

const SendRequestModule: FC = () => {
  const [fields, setFields] = useState<FieldsType>(initialFields)
  const { full_name, email, phone, question } = fields

  const { mutateAsync: addQuestion, isPending } = useAddCommentQuestion()

  const handleSend = async (e: FormEvent) => {
    e.preventDefault()

    const response = await addQuestion({
      full_name,
      email,
      phone,
      question,
      answer: false,
    })

    if (response.status === 'success') {
      toast.success("So'rovingiz yuborildi!")
      setFields(initialFields)
    } else {
      toast.error(WARNING_TEXTS.SOMETHING_WENT_WRONG)
    }
  }

  return (
    <div className="relative flex w-full gap-20 max-xl:gap-10 max-xl:justify-between max-lg:gap-0 max-sm:flex-wrap">
      <Image src={contactBublesIcon} alt="" className="sm:absolute top-0 -left-[10%] max-lg:hidden -z-10" />
      <div className="flex-1 mt-40 max-lg:flex">
        <Image src={contactPersonIcon} alt="" className="" />
      </div>

      <form className="flex-shrink-0 mt-40 lg:w-1/2 lg:pr-40 max-sm:w-full max-sm:mt-24" onSubmit={handleSend}>
        <p className="z-10 text-green-primary">Biz bilan bog'lanish</p>
        <h2>So'rovingizni yuboring</h2>
        <div className="relative flex flex-col gap-6 mt-10">
          <Input
            id="full_name"
            label="Foydalanuvchi nomi"
            className="bg-transparent"
            required
            name="full_name"
            value={full_name}
            onChange={inputHandler(setFields)}
          />
          <Input
            id="email"
            label="Elektron pochta"
            className="bg-transparent"
            name="email"
            required
            value={email}
            onChange={inputHandler(setFields)}
          />
          <MaskInput
            mask="+\9\98 99 999 99 99"
            placeholder="+998 _ _  _ _ _ - _ _ - _ _"
            maskChar="_"
            id="phone"
            name="phone"
            label="Telefon raqam"
            required
            value={phone}
            className="bg-transparent"
            onChange={inputHandler(setFields)}
          />
          <div>
            <label htmlFor="question" className="flex items-center text-sm text-[#C3C3C3]">
              Sizning savolingiz *
            </label>
            <textarea
              id="question"
              required
              name="question"
              rows={4}
              value={question}
              placeholder="Savolingizni bu yerga kiriting"
              onChange={inputHandler(setFields)}
              className="mt-2 w-full px-3 pb-3 pt-2 pr-8 text-sm text-gray-900 border-b border-[#B0B7C3]/50 rounded-xl focus:outline-none focus:ring-0 focus:border-green-primary placeholder:text-gray-primary/40"
            />
          </div>
          <SeeAllButton
            text={isPending ? 'Xabar yuborilmoqda...' : 'Xabar yuborish'}
            icon={<ContactSendIcon />}
            size="md"
            className="w-[213px]"
            useLink={false}
            type="submit"
            disabled={isPending}
          />
        </div>
      </form>
    </div>
  )
}

export default SendRequestModule
