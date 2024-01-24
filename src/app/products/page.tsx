import React from 'react'
import Image from 'next/image'
import { Breadcrumb, WatchVideoButton } from '@/components/common'
import { ProductTypesModule, ProductsListModule } from '@/modules/products'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import productsHeader from '@/assets/images/product/productsHeader.png'
import bannerImg1 from '@/assets/images/product/productSuggestImg1.png'
import bannerImg2 from '@/assets/images/product/productSuggestImg2.png'
import bannerImg3 from '@/assets/images/product/productSuggestImg3.png'
import saleBannerImg from '@/assets/images/product/saleBanner.png'
import { BrandsListModule, HerbsBannerModule, MobileAppModule } from '@/modules/home'
import { ROUTES } from '@/constants'

const ProductsPage = () => {
  const breadcrumbItems = [{ text: 'Bosh sahifa', href: ROUTES.HOME }, { text: 'Mahsulotlar' }]
  const bannerImages = [bannerImg1, bannerImg2, bannerImg3]

  return (
    <div className="mt-14 px-10 mx-auto xl:px-24 max-md:px-4 mx max-w-[1440px] max-sm:mt-0 overflow-hidden">
      <section className="flex justify-between max-sm:flex-wrap">
        <div className="flex gap-12 max-xl:gap-2 max-xl:w-4/5 max-lg:w-full">
          <Image
            src={backgroundLeaf}
            alt=""
            priority
            className="-ml-[10%] object-cover w-[225px] h-[305px] max-lg:hidden"
          />

          <div className="mt-10">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="mt-5">Mehrigiyo tabiiy mahsulotlari</h2>
            <p className="mt-4 text-gray-primary xl:w-2/3">
              Shifobaxsh o'simliklardan foydalanish, salomatlik va uzoq umr ko'rishingi uchun asosiy omildir
            </p>
            <WatchVideoButton
              className="mt-10 max-sm:mt-4"
              videoUrl="https://www.youtube.com/embed/CKvdClKdSJo?si=V-Hy0MKf5OdPGZWb"
            />
          </div>
        </div>
        <div className="flex items-center justify-center xl:flex-shrink-0 max-sm:w-full max-sm:mt-4">
          <Image src={productsHeader} alt="" priority width={464} height={329} />
        </div>
      </section>

      <section className="mt-28 max-sm:mt-12">
        <h4>Siz uchun eng yaxshi takliflar</h4>
        <div className="flex justify-between mt-10 gap-2 max-lg:mt-4 max-md:flex-wrap max-md:justify-normal max-sm:justify-center">
          {bannerImages.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt=""
              className="w-[366px] h-[135px] object-contain max-xl:w-[32%] max-md:w-2/5 max-sm:w-[366px] max-2xs:w-full max-2xs:h-full"
            />
          ))}
        </div>
      </section>

      <section className="mt-24 max-sm:mt-18">
        <h4>Mehrigiyodan xarid qiling</h4>
        <ProductTypesModule />
      </section>

      <section className="mt-40 max-lg:mt-24 max-md:rounded-3xl max-md:shadow-primary max-md:bg-gradient-to-l max-md:from-green-primary max-md:via-green-primary max-md:to-[#63CB89]">
        <Image
          src={saleBannerImg}
          alt=""
          className="object-contain xl:scale-110 max-md:w-[100vw] max-md:object-cover max-md:h-[50vh]"
        />
      </section>

      <section className="mt-32">
        <ProductsListModule title="Top mahsulotlar" withFilter={false} />
      </section>

      <section className="mt-52 max-sm:mt-24">
        <MobileAppModule />
      </section>

      <section className="mt-40 max-sm:mt-32">
        <HerbsBannerModule />
      </section>

      <section className="mt-32 mb-[70px]">
        <BrandsListModule />
      </section>
    </div>
  )
}

export default ProductsPage
