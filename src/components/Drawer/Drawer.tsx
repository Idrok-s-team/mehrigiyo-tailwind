'use client'

import { CloseRoundIcon } from '@/assets/icons'
import clsx from 'clsx'
import { PropsWithChildren, type FC, useState, useEffect } from 'react'
import Button from '../Button'

type Props = PropsWithChildren & {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Drawer: FC<Props> = ({ children, isOpen, setIsOpen }) => {
  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const classNames = clsx(
    'flex flex-col justify-between fixed bottom-0 left-0 right-0 z-40 w-full px-12 py-10 overflow-y-auto transition-transform duration-300 bg-white min-h-[70vh] rounded-t-[30px]',
    {
      'translate-y-0': isOpen,
      'translate-y-full': !isOpen,
    },
  )

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={toggleDrawer}>
          qwef
        </div>
      )}

      <div id="drawer-bottom-example" className={classNames} tabIndex={-1} aria-labelledby="drawer-bottom-label">
        <header className="flex justify-end">
          <button onClick={toggleDrawer}>
            <CloseRoundIcon />
          </button>
        </header>
        <main>{children}</main>
        <footer className="flex justify-end">
          <Button>Savatga qo'shish</Button>
        </footer>
      </div>
    </>
  )
}

export default Drawer
