import React from 'react'
import Image from 'next/image'
import { Breadcrumb, WatchVideoButton } from '@/components'
import { ProductTypesModule } from '@/modules/products'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import productsHeader from '@/assets/images/product/productsHeader.png'
import bannerImg1 from '@/assets/images/product/productSuggestImg1.png'
import bannerImg2 from '@/assets/images/product/productSuggestImg2.png'
import bannerImg3 from '@/assets/images/product/productSuggestImg3.png'
import saleBannerImg from '@/assets/images/product/saleBanner.png'
import { BrandsListModule, HerbsBannerModule, MobileAppModule, ProductsListModule } from '@/modules/home'

const ProductsPage = () => {
  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Mahsulotlar' }]
  const bannerImages = [bannerImg1, bannerImg2, bannerImg3]

  return (
    <div className="px-24 mt-14">
      <section className="flex justify-between">
        <div className="flex gap-12">
          <Image src={backgroundLeaf} alt="" priority className="-ml-[10%] object-cover w-[225px] h-[305px]" />

          <div className="mt-10">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="mt-5">Mehrigiyo tabiiy mahsulotlari</h2>
            <p className="w-2/3 mt-4 text-gray-primary">
              Shifobaxsh o'simliklardan foydalanish, salomatlik va uzoq umr ko'rishingi uchun asosiy omildir
            </p>
            <WatchVideoButton className="mt-10" />
          </div>
        </div>
        <div className="flex-shrink-0">
          <Image src={productsHeader} alt={''} priority width={464} height={329} />
        </div>
      </section>

      <section className="mt-28">
        <h4>Siz uchun eng yaxshi takliflar</h4>
        <div className="flex justify-between mt-10">
          {bannerImages.map((img, i) => (
            <Image src={img} alt="" width={366} height={135} key={i} />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <h4>Mehrigiyodan xarid qiling</h4>
        <ProductTypesModule />
      </section>

      <section className="mt-40">
        <Image src={saleBannerImg} alt="" className="object-cover scale-110" />
      </section>

      <section className="mt-32">
        <ProductsListModule title="Top mahsulotlar" withFilter={false} />
      </section>

      <section className="mt-52">
        <MobileAppModule />
      </section>

      <section className="mt-40">
        <HerbsBannerModule />
      </section>

      <section className="mt-32">
        <BrandsListModule />
      </section>
    </div>
  )
}

export default ProductsPage
