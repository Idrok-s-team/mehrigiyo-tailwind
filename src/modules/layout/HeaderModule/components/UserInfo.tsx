import React, { FC, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AvatarIcon } from '@/assets/icons'
import { useUserMeQuery } from '@/hooks/queries'
import { useAuthStore, useCommonStore } from '@/store'
import { ElementSizeType } from '@/types'

interface IProps {
  size?: ElementSizeType
}

const UserInfo: FC<IProps> = ({ size = 'md' }) => {
  const { setActiveModal } = useCommonStore()
  const { updateAuthState } = useAuthStore()
  const { data: userData, isSuccess, isLoading } = useUserMeQuery()

  useEffect(() => {
    updateAuthState('isUserRegistered', isSuccess)
  }, [isSuccess])

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 animate-pulse">
        <div className="w-6 h-6 rounded-full  bg-gray-primary/50"></div>
        <div className="w-16 h-4 bg-gray-primary/50 rounded"></div>
        <div className="w-16 h-4 bg-gray-primary/50 rounded"></div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <Link href="/dashboard" className="flex items-center gap-2">
        {userData && (
          <Image
            src={userData?.avatar}
            alt={`${userData?.first_name} ${userData?.last_name}`}
            width={size === 'md' ? 25 : 50}
            height={size === 'md' ? 25 : 5025}
            className="border rounded-full border-green-primary shadow-avatar"
          />
        )}
        <p>
          {userData?.first_name} {userData?.last_name}
        </p>
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveModal('auth')}>
      <div>Kirish</div>
      <div>
        <AvatarIcon />
      </div>
    </div>
  )
}

export default UserInfo
