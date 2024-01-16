'use client'

import React, { FC, useCallback } from 'react'
import { Accordion, DrawerMobile } from '@/components/common'
import { useCommonStore } from '@/store'
import { useNavElements } from '../hooks'
import { UserInfo } from '.'
import Link from 'next/link'

type Props = {}

const MenuDrawer: FC<Props> = () => {
  const { activeModal, setActiveModal } = useCommonStore()
  const { navElements } = useNavElements()

  const handleClose = useCallback(() => {
    setActiveModal(null)
  }, [setActiveModal])

  return (
    <DrawerMobile isOpen={activeModal === 'drawerMobile'} onClose={handleClose}>
      <div className="mb-5">
        <UserInfo size="lg" />
      </div>
      <div>
        <Accordion
          items={navElements.map(({ label, dropdownItems }) => ({
            title: label,
            children: dropdownItems?.map((item) => (
              <ul key={item.label} className="mt-3">
                <Link href={item.path}>{item.label}</Link>
              </ul>
            )),
          }))}
          size="sm"
          withIndex={false}
        />
      </div>
      <div></div>
    </DrawerMobile>
  )
}

export default MenuDrawer
