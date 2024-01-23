'use client'

import React from 'react'
import { useUserFavoriteMedicinesQuery } from '@/hooks/queries'
import { EmptyBox, Loader } from '@/components/common'
import { ProductCard } from '@/components/specific'
import { useAuthStore } from '@/store'

const FavoriteProductsModule = () => {
  const { isUserRegistered } = useAuthStore()
  const { data, isLoading } = useUserFavoriteMedicinesQuery({ options: { enabled: isUserRegistered } })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-w-[15vw] min-h-[50vh] animate-fade-in">
        <Loader />
      </div>
    )
  }

  if (data?.count === 0) {
    return (
      <EmptyBox
        title="Sevimlilar bo'sh"
        description="Uzoq vaqt qidirmaslik uchun o'zingiz yoqtirgan mahsulotlarni saqlang"
      />
    )
  }

  return (
    <div className="mt-2.5 animate-fade-in">
      <h4>Sevimlilarda {data?.count} ta mahsulot bor</h4>
      <div className="grid grid-cols-4 gap-[30px] mt-[30px] justify-between max-xl:gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-xs:grid-cols-1">
        {data?.results.map((product) => <ProductCard key={product.id} data={product} />)}
      </div>
    </div>
  )
}

export default FavoriteProductsModule
