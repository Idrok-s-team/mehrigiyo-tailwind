'use client'

import { FC, useState } from 'react'
import Cookies from 'js-cookie'
import { Input, Modal, Tabs } from '@/components'
import useLoginMutation from '@/hooks/mutations/login'
import { ILoginParams } from '@/types'
import { inputHandler, parsePhoneNumber } from '@/utils'
import toast from 'react-hot-toast'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const initialFields: ILoginParams = {
  username: '',
  password: '',
}

export const AuthModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const [fields, setFields] = useState<ILoginParams>(initialFields)
  const { mutateAsync, isPending } = useLoginMutation()
  const { username, password } = fields

  const handleLogin = () => {
    if (username.length && password.length) {
      const values = {
        username: parsePhoneNumber(username),
        password,
      }
      const mutationPromise = mutateAsync(values)

      toast
        .promise(mutationPromise, {
          loading: `tizimga kirilmoqda...`,
          success: `tizimga muvaffaqqiyatli kirildi`,
          error: ({ data }) => data.detail,
        })
        .then((res) => {
          Cookies.set('access_token', res.access)
          Cookies.set('refresh_token', res.refresh)
          setIsOpen(false)
        })
    }
  }

  return (
    <>
      <Modal onClose={() => setIsOpen(false)} onSubmit={() => handleLogin()} isOpen={isOpen} disabled={isPending}>
        <div className="px-16 pb-8 bg-white">
          <section>
            <Tabs
              items={[
                { key: 'sign_in', label: 'Kirish' },
                { key: 'sign_up', label: "Ro'yxatdan o'tish" },
              ]}
            />
          </section>
          <section className="flex flex-col gap-6 mt-12">
            <Input label="Telefon raqam" type="tel" id="username" name="username" onChange={inputHandler(setFields)} />
            <Input label="Parol" type="password" id="password" name="password" onChange={inputHandler(setFields)} />
          </section>
        </div>
      </Modal>
    </>
  )
}
