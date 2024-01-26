'use client'

import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { Button, Input, MaskInput, Modal, Tabs } from '@/components/common'
import { useAuthStore, useCommonStore } from '@/store'
import { getCookie, inputHandler, parsePhoneNumber } from '@/utils'
import { useLoginMutation, useRefreshTokenMutation, useUserRegisterMutation } from '@/hooks/mutations'
import { useShopCartQuery, useUserFavoriteMedicinesQuery, useUserMeQuery } from '@/hooks/queries'
import Upload from '@/components/common/InputUpload/InputUpload'
import { EyeIcon, EyeOffIcon } from '@/assets/icons'

type Props = {}

const initialFields = {
  phoneNumber: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

const AuthModal: FC<Props> = () => {
  const [fields, setFields] = useState(initialFields)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState('sign_in')
  const hasRefreshed = useRef(false)

  const { activeModal, setActiveModal } = useCommonStore()
  const { selectedAuthImage, isUserRegistered, updateAuthState } = useAuthStore()

  const userMeQuery = useUserMeQuery()
  const shopCartQuery = useShopCartQuery({ options: { enabled: isUserRegistered } })
  const userFavoriteMedicinesQuery = useUserFavoriteMedicinesQuery({ options: { enabled: isUserRegistered } })

  const { mutateAsync: login, isPending: isLoginLoading } = useLoginMutation()
  const { mutateAsync: register, isPending: isRegisterLoading } = useUserRegisterMutation()
  const { mutateAsync: refreshToken } = useRefreshTokenMutation()

  const { phoneNumber, firstName, lastName, email, password } = fields

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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    if (phoneNumber.length && password.length) {
      const values = {
        username: parsePhoneNumber(phoneNumber),
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

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    if (selectedAuthImage) {
      formData.append('avatar', selectedAuthImage)
    } else {
      formData.delete('avatar')
    }
    formData.append('first_name', firstName)
    formData.append('last_name', lastName)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('username', parsePhoneNumber(phoneNumber))

    const registerPromise = await register(formData)

    if (registerPromise.status === 'success') {
      toast.success("Ro'yxatdan o'tildi!")
    } else {
      toast.error(registerPromise.data)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleCloseModal = () => {
    setActiveModal(null)
    setActiveTabKey('sign_in')
    updateAuthState('selectedAuthImage', null)
  }

  return (
    <>
      <Modal onClose={handleCloseModal} onSubmit={() => {}} withFooter={false} isOpen={activeModal === 'auth'}>
        <div className="xs:px-16 pb-3">
          <section className="flex items-center justify-center">
            <div className="w-full">
              <Tabs
                isItemWhiteBg
                onTabChange={(key) => {
                  setActiveTabKey(key)
                  setFields(initialFields)
                }}
                items={[
                  {
                    key: 'sign_in',
                    label: 'Kirish',
                    children: (
                      <form onSubmit={handleLogin}>
                        <div className="flex flex-col gap-6 mt-10">
                          <MaskInput
                            mask="+\9\98 99 999 99 99"
                            placeholder="+998 _ _  _ _ _ - _ _ - _ _"
                            maskChar="_"
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Telefon raqam"
                            autoComplete="phone-number"
                            required
                            onChange={inputHandler(setFields)}
                          />
                          <Input
                            label="Parol"
                            id="password"
                            name="password"
                            autoComplete="password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={inputHandler(setFields)}
                            icon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            onClickIcon={togglePasswordVisibility}
                          />
                        </div>
                        <Button disabled={isLoginLoading} type="submit" className="mt-12">
                          Tizimga kirish
                        </Button>
                      </form>
                    ),
                  },
                  {
                    key: 'sign_up',
                    label: "Ro'yxatdan o'tish",
                    children: (
                      <form onSubmit={handleRegister}>
                        <div className="flex flex-col gap-6 pt-5 max-h-[50vh] overflow-auto">
                          <Upload />
                          <MaskInput
                            mask="+\9\98 99 999 99 99"
                            placeholder="+998 _ _  _ _ _ - _ _ - _ _"
                            maskChar="_"
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Telefon raqam"
                            autoComplete="phone-number"
                            required
                            onChange={inputHandler(setFields)}
                          />
                          <Input
                            id="firstName"
                            name="firstName"
                            label="Ism"
                            required
                            placeholder="e.g., Abdulla"
                            autoComplete="first_name"
                            onChange={inputHandler(setFields)}
                          />
                          <Input
                            id="lastName"
                            name="lastName"
                            label="Familiya"
                            required
                            placeholder="e.g., Akbarov"
                            autoComplete="last_name"
                            onChange={inputHandler(setFields)}
                          />
                          <Input
                            id="email"
                            name="email"
                            label="Elektron pochta (ixtiyoriy)"
                            placeholder="e.g., asilov@gmail.com"
                            autoComplete="email"
                            onChange={inputHandler(setFields)}
                          />
                          <Input
                            label="Parol"
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={inputHandler(setFields)}
                            icon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            onClickIcon={togglePasswordVisibility}
                          />
                        </div>
                        <Button disabled={isRegisterLoading} type="submit" className="mt-12">
                          Ro'yxatdan o'tish
                        </Button>
                      </form>
                    ),
                  },
                ]}
              />
            </div>
          </section>
        </div>
      </Modal>
    </>
  )
}

export default AuthModal
