import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AvatarIcon } from '@/assets/icons'
import { useUserMeQuery } from '@/hooks/queries'
import { useCommonStore } from '@/store'
import { ElementSizeType } from '@/types'
import clsx from 'clsx'

interface IProps {
  size?: ElementSizeType
}

const UserInfo: FC<IProps> = ({ size = 'md' }) => {
  const { setActiveModal } = useCommonStore()
  const { data: userData, isSuccess } = useUserMeQuery()

  return isSuccess ? (
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
  ) : (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveModal('auth')}>
      <div>Kirish</div>
      <div>
        <AvatarIcon />
      </div>
    </div>
  )
}

export default UserInfo
