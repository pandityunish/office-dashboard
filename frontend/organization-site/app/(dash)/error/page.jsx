"use client"


import DefaultButton from '@/modules/core-ui/Button'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
export default function ErrorPage() {
    const router=useRouter();
  return (
    <div className='lg:h-screen h-[100%] flex items-center justify-center w-[100%] lg:w-full shadow-3xl rounded-md'>
        <div className='flex flex-col items-center justify-center'>
        <Image src="/Frame.png" height={200} width={200} alt='some'/>
        <p className='font-bold text-5xl'>Failed</p>
        <p className='font-normal text-base mt-3'>The form submission has been failed.</p>
        <div className='w-[568px] mt-7' onClick={()=>{
            router.push("/dash")
        }}>
        <DefaultButton text="Back to home"/>
        </div>
        </div>
    </div>
  )
}
