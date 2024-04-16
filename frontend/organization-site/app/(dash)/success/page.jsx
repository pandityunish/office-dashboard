"use client"


import DefaultButton from '@/modules/core-ui/Button'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function SuccessPage() {
  const router=useRouter()

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/dash'); 
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className='lg:h-screen h-[100%] flex items-center justify-center w-[100%] lg:w-full shadow-3xl rounded-md'>
        <div className='flex flex-col items-center justify-center'>
        <Image src="/check-circle.png" height={200} width={200} alt='some'/>
        <p className='font-bold text-5xl'>Success</p>
        <p className='font-normal text-base mt-3'>The form has been submitted successfully.</p>
        <div className='w-[568px] mt-7' onClick={()=>{
          router.push("/dash")
        }}>
        <DefaultButton text="Back to home"/>
        </div>
        </div>
    </div>
  )
}
