/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { FooterModule, HeaderModule } from '@/modules/layout'
import Providers from './providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mehrigiyo',
  description:
    'Korxona turli dorivor o‘simliklarni yetishtirish va qayta ishlash, shuningdek, sog‘lom ovqatlanish uchun ekologik toza, tabiiy oziq-ovqat va kosmetika mahsulotlarini ishlab chiqarish bilan muvaffaqiyatli shug‘ullanadi.',
}

interface IProps {
  children: ReactNode
}

const RootLayout: FC<IProps> = async ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col justify-between min-h-screen`}>
        <Providers>
          <header className="sticky top-0 z-10">
            <HeaderModule />
          </header>

          <main className="px-24 overflow-hidden">{children}</main>

          <footer className="mt-[70px]">
            <FooterModule />
          </footer>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
