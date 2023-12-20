'use client'

import { FC, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { Input, Modal, Tabs } from '@/components'
import { ILoginParams } from '@/types'
import { getCookie, inputHandler, parsePhoneNumber } from '@/utils'
import { useShopCartQuery, useUserFavoriteMedicinesQuery, useUserMeQuery } from '@/hooks/queries'
import { useLoginMutation, useRefreshTokenMutation } from '@/hooks/mutations'
import { useCommonStore } from '@/store'

type Props = {}

const initialFields: ILoginParams = {
  username: '',
  password: '',
}

const AuthModal: FC<Props> = () => {
  const [fields, setFields] = useState<ILoginParams>(initialFields)
  const hasRefreshed = useRef(false)

  const { activeModal, setActiveModal } = useCommonStore()
  const userMeQuery = useUserMeQuery()
  const userFavoriteMedicinesQuery = useUserFavoriteMedicinesQuery()
  const shopCartQuery = useShopCartQuery()
  const { mutateAsync: login } = useLoginMutation()
  const { mutateAsync: refreshToken } = useRefreshTokenMutation()

  const { username, password } = fields

  useEffect(() => {
    const accessToken = getCookie('access_token')

    if (accessToken) {
      const shouldRefreshToken =
        userFavoriteMedicinesQuery.error?.data?.statusCode === 401 ||
        userMeQuery.error?.data?.statusCode === 401 ||
        shopCartQuery.error?.data?.statusCode === 401

      if (shouldRefreshToken && !hasRefreshed.current) {
        hasRefreshed.current = true
        refreshToken({ refresh: getCookie('refresh_token') as string })
          .then((res) => {
            Cookies.set('access_token', res.access)
            Cookies.set('refresh_token', res.refresh)
            // Refetch queries after refreshing tokens
            userMeQuery.refetch()
            userFavoriteMedicinesQuery.refetch()
            shopCartQuery.refetch()
          })
          .finally(() => {
            hasRefreshed.current = false
          })
      }
    }
  }, [userFavoriteMedicinesQuery, userMeQuery, shopCartQuery, refreshToken])

  const handleLogin = () => {
    if (username.length && password.length) {
      const values = {
        username: parsePhoneNumber(username),
        password,
      }
      const mutationPromise = login(values)

      toast
        .promise(mutationPromise, {
          loading: `tizimga kirilmoqda...`,
          success: `tizimga muvaffaqqiyatli kirildi`,
          error: ({ data }) => data.detail,
        })
        .then((res) => {
          Cookies.set('access_token', res.access)
          Cookies.set('refresh_token', res.refresh)
          setActiveModal(null)
          userMeQuery.refetch()
          userFavoriteMedicinesQuery.refetch()
          shopCartQuery.refetch()
        })
    }
  }

  return (
    <>
      <Modal onClose={() => setActiveModal(null)} onSubmit={() => handleLogin()} isOpen={activeModal === 'auth'}>
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

export default AuthModal
