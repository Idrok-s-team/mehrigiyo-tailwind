import React from 'react'
import { Breadcrumb } from '@/components/common'
import { CartModule } from '@/modules/cart'
import { ROUTES } from '@/constants'

const Cart = async () => {
  const breadcrumbItems = [{ text: 'Bosh sahifa', href: ROUTES.HOME}, { text: 'Savatcha' }]

  return (
    <div className="relative mt-14 px-10 mb-[70px] mx-auto xl:px-24 max-md:px-4 mx max-w-[1440px] max-sm:mt-0 overflow-hidden">
      <Breadcrumb items={breadcrumbItems} />
      <section className="relative">
        <CartModule />
      </section>
    </div>
  )
}

export default Cart
