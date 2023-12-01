/* eslint-disable react/no-unescaped-entities */
'use client'

import { PropsWithChildren, type FC, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { CloseRoundIcon, FavoriteIcon, SharedIcon } from '@/assets/icons'
import { IShopMedicines } from '@/types'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import ActionButton from '../ActionButton'
import Button from '../Button'
import { Accordion, MultiSlider } from '..'

type Props = PropsWithChildren & {
  product: IShopMedicines | null
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setSelectedProduct: (product: IShopMedicines | null) => void
}

const Drawer: FC<Props> = ({ product, isOpen, setIsOpen, setSelectedProduct }) => {
  const pictures = product && product.pictures.length ? product.pictures : []

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
    setIsOpen(false)
    setSelectedProduct(null)
  }

  const details = [
    {
      title: 'Mahsulot haqida',
      children: product?.description,
    },
    {
      title: "Og'irligi",
      children: product?.weight,
    },
  ]

  const classNames = clsx(
    'flex flex-col justify-between fixed bottom-0 left-0 right-0 z-40 w-full px-12 py-10 overflow-x-hidden overflow-y-auto transition-transform duration-200 bg-white h-[80vh] rounded-t-[30px]',
    {
      'translate-y-0': isOpen,
      'translate-y-full': !isOpen,
    },
  )

  if (product == null) {
    return null
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={closeDrawer}></div>}

      <div id="drawer-bottom-example" className={classNames} tabIndex={-1} aria-labelledby="drawer-bottom-label">
        <header className="flex justify-end">
          <ActionButton onClick={closeDrawer}>
            <CloseRoundIcon />
          </ActionButton>
        </header>

        <Image src={backgroundLeaf} alt="" priority className="absolute left-0" />
        <main className="overflow-auto">
          <div className="relative flex m-5">
            <section className="sticky top-[20%] flex items-center justify-center h-full w-2/5">
              {/* {pictures.length > 0 && (
                <MultiSlider
                  thumbNails={(pictures || [])?.map((pic) => (
                    <div key={pic.id} className="!h-[100px] keen-slider__slide">
                      <Image src={pic.image} alt="" width={80} height={80} />
                    </div>
                  ))}
                >
                  {(pictures || [])?.map((pic) => (
                    <div key={pic.id} className="flex items-center justify-center w-full h-full keen-slider__slide">
                      <Image src={pic.image} alt="" width={270} height={270} />
                    </div>
                  ))}
                </MultiSlider>
              )} */}
              <Image key={product?.id} src={product?.image as string} alt="" width={270} height={270} />
            </section>

            <section className="flex-1">
              <div className="flex items-center justify-between">
                <h2>{product?.name}</h2>
                <div className="flex gap-4">
                  <ActionButton>
                    <FavoriteIcon color="#2D2D2D" width={20} height={20} />
                  </ActionButton>
                  <ActionButton>
                    <SharedIcon />
                  </ActionButton>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {product?.discount ? (
                  <>
                    <h2 className="font-bold text-green-primary">{product?.discount.toLocaleString('ru')} uzs</h2>
                    <p className="line-through text-lg text-[#808080] mt-2">{product?.cost.toLocaleString('ru')} uzs</p>
                  </>
                ) : (
                  <h4 className="font-bold text-green-primary">{product?.cost.toLocaleString('ru')} uzs</h4>
                )}
              </div>
              <div className="mt-7">
                <Accordion items={details as []} withIndex={false} size="sm" />
              </div>
            </section>
          </div>
        </main>

        <footer className="flex justify-end pt-5">
          <div className="w-48">
            <Button>Savatga qo'shish</Button>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Drawer
