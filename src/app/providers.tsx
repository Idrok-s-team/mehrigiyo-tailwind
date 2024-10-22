'use client'

import { FC, PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Next13ProgressBar } from 'next13-progressbar'

type Props = PropsWithChildren

const Providers: FC<Props> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Next13ProgressBar color="#53b175" showOnShallow options={{ showSpinner: true }} />
    </QueryClientProvider>
  )
}

export default Providers
