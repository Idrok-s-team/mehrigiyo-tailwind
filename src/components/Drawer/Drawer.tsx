/* eslint-disable react/no-unescaped-entities */
'use client'

import { PropsWithChildren, type FC } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { CloseRoundIcon, FavoriteIcon, SharedIcon } from '@/assets/icons'
import { IShopMedicines } from '@/types'
import ActionButton from '../ActionButton'
import Button from '../Button'

type Props = PropsWithChildren & {
  product: IShopMedicines | null
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Drawer: FC<Props> = ({ product, children, isOpen, setIsOpen }) => {
  const { id, name, image, description, cost, discount } = (product as IShopMedicines) ?? {}

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const classNames = clsx(
    'flex flex-col justify-between fixed bottom-0 left-0 right-0 z-40 w-full px-12 py-10 overflow-x-hidden overflow-y-auto transition-transform duration-200 bg-white h-[70vh] rounded-t-[30px]',
    {
      'translate-y-0': isOpen,
      'translate-y-full': !isOpen,
    },
  )

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={toggleDrawer}></div>}

      <div id="drawer-bottom-example" className={classNames} tabIndex={-1} aria-labelledby="drawer-bottom-label">
        <header className="flex justify-end">
          <ActionButton onClick={toggleDrawer}>
            <CloseRoundIcon />
          </ActionButton>
        </header>

        <main className="overflow-auto">
          <div className="absolute w-[225px] h-[305px] bg-[url(../assets/icons/common/backgroundLeafIcon.svg)]"></div>
          <div className="flex m-5 ml-52 bg-red-200">
            <section>
              <Image src={image} alt={name} width={270} height={270} />
            </section>
            <section className="flex-1">
              <div className="flex items-center justify-between">
                <h2>{name}</h2>
                <div className="flex gap-4">
                  <ActionButton>
                    <FavoriteIcon color="#2D2D2D" width={20} height={20} />
                  </ActionButton>
                  <ActionButton>
                    <SharedIcon />
                  </ActionButton>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="flex justify-end">
          <Button>Savatga qo'shish</Button>
        </footer>
      </div>
    </>
  )
}

export default Drawer
