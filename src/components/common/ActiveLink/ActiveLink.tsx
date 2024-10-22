'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren<LinkProps> & {
  className?: string
}

const ActiveLink: FC<Props> = ({ children, ...props }) => {
  const pathname = usePathname()
  const isActive = props.href === pathname

  return (
    <Link
      {...props}
      className={
        isActive
          ? "relative font-semibold after:content-[''] after:block after:w-6 after:h-[3px] after:absolute after:bg-green-primary after:rounded after:left-[30%]  after:-bottom-1"
          : ''
      }
    >
      {children}
    </Link>
  )
}

export default ActiveLink
