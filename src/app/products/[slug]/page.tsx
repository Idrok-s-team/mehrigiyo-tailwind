import React from 'react'
import { Breadcrumb } from '@/components/common'
import { getShopMedicineByIdApi } from '@/api'
import { ProductDescriptionModule } from '@/modules/products'

type Props = {
  params: {
    slug: string
  }
}

const ProductBySlug = async ({ params }: Props) => {
  const { slug } = params
  const id = Number(slug.split('___')[1])
  const product = await getShopMedicineByIdApi(id)

  const breadcrumbItems = [
    { text: 'Bosh sahifa', href: '/' },
    { text: 'Mahsulotlar', href: '/products/category' },
    { text: product.name },
  ]

  return (
    <div className="mt-14 mb-36 mx-auto px-10 max-xs:px-4 xl:px-24 max-w-[1440px] max-md:mb-16">
      <header className="relative flex items-center justify-between gap-32">
        <div>
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </header>

      <main className="mt-10">
        <ProductDescriptionModule product={product} />
      </main>
    </div>
  )
}

export default ProductBySlug
