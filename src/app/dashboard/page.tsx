'use client'

import { Loader } from '@/components/common'
import { useAuthStore } from '@/store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Dashboard = () => {
  const router = useRouter()
  const { isUserRegistered } = useAuthStore()

  useEffect(() => {
    if (!isUserRegistered) {
      router.push('/')
    }
  }, [isUserRegistered])

  if (!isUserRegistered) {
    return (
      <div className="flex items-center justify-center w-full min-h-[70vh]">
        <Loader />
      </div>
    )
  }

  return <div>page</div>
}

export default Dashboard
