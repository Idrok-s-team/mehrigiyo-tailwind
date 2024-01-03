'use client'

import { ErrorDisplay } from '@/components/common'
import { FC } from 'react'

interface IProps {
  error: Error
  reset: () => void
}

const ErrorPage: FC<IProps> = () => {
  return <ErrorDisplay />
}

export default ErrorPage
