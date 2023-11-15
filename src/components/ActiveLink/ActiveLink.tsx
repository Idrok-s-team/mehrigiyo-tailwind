'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren<LinkProps>

export const ActiveLink: FC<Props> = ({ children, ...props }) => {
  const pathname = usePathname()
  const { href } = props
  const isActive = href === pathname
  return (
    <Link
      {...props}
      className={
        isActive
          ? "after:content-['sa'] after:w-5 after:h-1 after:rounded after:bg-red-200 afte after:left-1/2 after:top-full after:-translate-x-1/2"
          : ''
      }
    >
      {children}
    </Link>
  )
}
