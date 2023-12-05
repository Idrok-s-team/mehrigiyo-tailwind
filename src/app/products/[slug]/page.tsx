import React from 'react'
import Image from 'next/image'
import { Breadcrumb, ViewSlide } from '@/components'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
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
  const { name, image, pictures } = product

  const breadcrumbItems = [
    { text: 'Bosh sahifa', href: '/' },
    { text: 'Mahsulotlar', href: '/products/category' },
    { text: product.name },
  ]

  const mainImage = {
    name,
    image,
  }

  const slides =
    pictures.length > 0
      ? pictures.map((item) => ({ ...mainImage, name: `${name}__${item.id}`, image: item.image }))
      : [mainImage]

  return (
    <div className="px-24 mt-14 mb-36">
      <header className="relative flex items-center justify-between gap-32">
        <figure className="flex gap-12">
          {/* <Image src={backgroundLeaf} alt="" priority className="-ml-[15%]" /> */}

          <figcaption className="mt-12">
            <Breadcrumb items={breadcrumbItems} />
          </figcaption>
        </figure>
      </header>

      <main className="flex gap-10 mt-10 relative">
        <section className="w-2/5 h-[550px] sticky top-32">
          <ViewSlide slides={slides} />
        </section>
        <section className="flex-1">
          <ProductDescriptionModule product={product} />
        </section>
      </main>
    </div>
  )
}

export default ProductBySlug
