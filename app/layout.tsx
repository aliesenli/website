import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import siteConfig from '@/siteConfig'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.bio,
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main className="max-w-content mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
