'use client'

import { PropsWithChildren, type FC, useEffect } from 'react'
import clsx from 'clsx'
import { CloseRoundIcon } from '@/assets/icons'
import ActionButton from '../ActionButton'

interface IProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
}

const DrawerMobile: FC<IProps> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    const body = document.body
    const originalStyle = window.getComputedStyle(body).overflow

    if (isOpen) {
      body.style.overflow = 'hidden'
    }

    return () => {
      body.style.overflow = originalStyle
    }
  }, [isOpen])

  const closeDrawer = () => {
    onClose()
  }

  const backdropClasses = clsx('fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300', {
    'opacity-0 pointer-events-none': !isOpen,
    'opacity-100': isOpen,
  })

  const drawerClasses = clsx(
    'flex flex-col justify-between fixed top-0 right-0 z-40 p-10 pb-2 pt-4 overflow-x-hidden overflow-y-auto transition-transform duration-200 bg-white h-full rounded-l-[10px] w-[480px] max-xs:w-full',
    {
      'translate-x-0': isOpen,
      'translate-x-full': !isOpen,
    },
  )

  return (
    <>
      {isOpen && <div className={backdropClasses} onClick={closeDrawer}></div>}

      <div id="drawer-bottom-example" className={drawerClasses} tabIndex={-1} aria-labelledby="drawer-bottom-label">
        <header className="flex justify-end mb-4">
          <ActionButton onClick={closeDrawer}>
            <CloseRoundIcon />
          </ActionButton>
        </header>

        <main className="overflow-auto flex-1">{children}</main>
      </div>
    </>
  )
}

export default DrawerMobile
