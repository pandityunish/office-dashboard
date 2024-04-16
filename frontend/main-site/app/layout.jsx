import MainNavbar from '@/modules/ui/MainNavbar'
import './globals.css'
import { Inter } from 'next/font/google'
import MainFooter from '@/modules/ui/MainFooter'
import NewsLetter from '@/modules/ui/NewsLetter'
import DownloadNow from '@/modules/ui/DownloadNow'
import Process from '@/modules/main-page-ui/Process'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        {/* <MainNavbar /> */}
        {children}
        {/* <DownloadNow/>
        <NewsLetter/>
        <MainFooter /> */}
      
      </body>
    </html>
  )
}
