import React, { FC, ReactNode } from 'react'
import { SidebarModule } from '@/modules/dashboard'

interface IProps {
  children: ReactNode
}

const DashboardLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="flex gap-[34px]">
      <aside className="sticky top-[200px]">
        <SidebarModule />
      </aside>
      <section className='mt-12'>{children}</section>
    </div>
  )
}

export default DashboardLayout
