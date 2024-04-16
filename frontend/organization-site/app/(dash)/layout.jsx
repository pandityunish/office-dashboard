'use client'

import { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { useUserData } from '@/modules/hooks/useUserData'
import LoadingComponent from '@/modules/core-ui/LoadingComponent'
import MainNavbar from '@/modules/core-ui/MainNavbar'
import LeftSidebar from '@/modules/core-ui/LeftSidebar'
import RightSidebar from '@/modules/core-ui/RightSidebar'
import NewNavBar from '@/modules/dash-component/NewNavBar'
import { useAtom } from 'jotai'
import { showLeftSidebarAtom } from '@/jotai/ui-atoms'

export default function DashboardLayout ({ children }) {
  const router = useRouter()
  const [showLeftSidebar, setShowLeftSidebar] = useAtom(showLeftSidebarAtom)
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
 
  useEffect(() => {
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    document.body.style.zoom = "81%";
    if (!isUserLoading) {
      if (isUserError) {
        router.push('/login')
      } else {
        // router.push('/dash')
      }
    }
    return () => {
      document.body.style.zoom = initialValue;
    };
  }, [isUserLoading, isUserError, user?.is_kyc_verified, router])

  if (isUserLoading || isUserError) {
    return <LoadingComponent />
  }

  if (!isUserLoading && !isUserError && !user?.is_organization) {
    return redirect('/login')
  }
  

  return (
    <div className='flex'>
      <LeftSidebar />
    

     
      <section className={`w-full pl-4 ${showLeftSidebar?"ml-[256px]":"ml-0"}  bg-[#FBFDFF]`}>
      
        <NewNavBar/>
        <main className='px-7 my-1 '>{children}</main>
      </section>
    
      {/* <RightSidebar /> */}
    </div>
  )
}
