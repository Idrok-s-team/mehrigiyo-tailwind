'use client'

import { type FC, memo } from 'react'
import clsx from 'clsx'
import { VideoPlayIcon } from '@/assets/icons'

type Props = {
  className?: string
}

const WatchVideoButton: FC<Props> = ({ className }) => {
  const classNames = clsx('flex items-center gap-3', className)
  return (
    <button className={classNames}>
      <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-primary">
        <VideoPlayIcon />
      </span>
      <span className="text-gray-primary">Videoni ko’rish</span>
    </button>
  )
}

export default WatchVideoButton
