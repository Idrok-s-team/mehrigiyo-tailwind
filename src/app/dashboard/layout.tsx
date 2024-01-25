import React, { FC, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@/components/common'
import { SidebarModule } from '@/modules/dashboard'

interface IProps {
  children: ReactNode
}

const DashboardLayout: FC<IProps> = ({ children }) => {
  // const router = useRouter()
  // const { isUserRegistered } = useAuthStore()

  // useEffect(() => {
  //   if (!isUserRegistered) {
  //     router.push('/')
  //   }
  // }, [isUserRegistered, router])

  // if (!isUserRegistered) {
  //   return (
  //     <div className="flex items-center justify-center w-full min-h-[70vh]">
  //       <Loader />
  //     </div>
  //   )
  // }

  return (
    <div className="flex gap-[34px]">
      <aside className="sticky top-[200px] z-20">
        <SidebarModule />
      </aside>
      <section className="flex-1 mt-12 ml-[272px]">{children}</section>
    </div>
  )
}

export default DashboardLayout
