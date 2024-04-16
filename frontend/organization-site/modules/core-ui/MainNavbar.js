'use client'
import { useState } from 'react'
import { AiOutlineAlignLeft } from 'react-icons/ai'
import { AiOutlineAlignRight } from 'react-icons/ai'
import { useAtom } from 'jotai'
import { showLeftSidebarAtom, showRightSidebarAtom } from '@/jotai/ui-atoms'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Notifications from './notifications'

const menuList = [
  { id: 1, title: 'home', path: '/dash', icon: '' },
  { id: 2, title: 'about', path: '/dash', icon: '' }
]

export default function MainNavbar () {
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showRightSidebar, setShowRightSidebar] = useAtom(showRightSidebarAtom)
  const [showLeftSidebar, setShowLeftSidebar] = useAtom(showLeftSidebarAtom)
  const handleRightSidebarExpandBTN = () =>
    setShowRightSidebar(!showRightSidebar)
  const handleLeftSidebarExpandBTN = () => setShowLeftSidebar(!showLeftSidebar)

  const handleSignout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    router.push('/login')
  }

  return (
    <div>
      <nav className='flex items-center justify-between h-12 px-5 border-b sm:px-10 md:px-16'>
        <section className='flex items-center'>
          <AiOutlineAlignLeft
            size='20'
            className='cursor-pointer text-epassblue'
            onClick={handleLeftSidebarExpandBTN}
          />
          <Link href={'/dash'} className='pl-3 font-bold'>
            Epass
          </Link>
        </section>
        <section className='relative grid grid-flow-col gap-5'>
          {menuList.map(menu => (
            <Link
              key={menu.id}
              href={menu.path}
              className='font-semibold capitalize'
            >
              {menu.title}
            </Link>
          ))}
        </section>
        <section className='relative flex items-center justify-center'>
          <section className='relative grid items-center justify-center grid-flow-col gap-6'>
            <div className='absolute z-10 flex w-full -top-1 right-3 '>
              <Notifications />
            </div>
            <div className='relative z-10 pr-3'>
              <button onClick={handleSignout}>Signout</button>
            </div>
            <AiOutlineAlignRight
              size='20'
              className='cursor-pointer text-epassblue '
              onClick={handleRightSidebarExpandBTN}
            />
          </section>
        </section>
      </nav>
    </div>
  )
}
