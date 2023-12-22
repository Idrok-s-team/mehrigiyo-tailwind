'use client'

import React from 'react'
import { useUserFavoriteMedicinesQuery } from '@/hooks/queries'
import { EmptyBox, Loader, ProductCard } from '@/components'

const FavoriteProductsModule = () => {
  const { data, isLoading } = useUserFavoriteMedicinesQuery()

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
      <div className="flex flex-wrap gap-[30px] mt-[30px]">
        {data?.results.map((product) => <ProductCard key={product.id} data={product} />)}
      </div>
    </div>
  )
}

export default FavoriteProductsModule
