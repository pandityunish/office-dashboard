'use client'


import React, { useEffect } from 'react'
import dots from '../../assets/dot shape.png'
import Image from 'next/image'
import finalimage from '../../assets/On the way.png'
import { useRouter } from 'next/navigation'
import AuthSlider from '@/modules/auth-component/AuthSlider';
import { baseurl } from '@/modules/apiurl';

export default function Final() {
  const router = useRouter();
  useEffect(() => {
    const initialValue = document.body.style.zoom;
  
    // Change zoom level on mount
    document.body.style.zoom = "80%";
    return () => {
      document.body.style.zoom = initialValue;
    };
  }, [])
  return (
    <div className='grid px-5 py-2 mx-auto font-inter xl:px-32 md:grid-cols-2 max-w-9xl'>
      <div className='flex items-center justify-start px-4  bg-white md:px-0 '>
        <div className='xl:w-full xl:max-w-[80%] 2xl:max-w-[80%] mt-12 items-center flex flex-col justify-center'>
          <div className='flex flex-row items-start justify-start w-full'>
          <Image src={`${baseurl}/media/logo/epass.png`} alt="" className='h-11 ' width={150} height={44}/>

          </div>
          <Image src={finalimage} width={340} alt='something'/>
         <p className='text-3xl text-center font-bold'>Congratulation! <br /> Welcome to Epass</p>
          <p className='text-sm font-normal text-center mt-4 w-[85%]'>We are happy to have you. It’s time to scan and track the visitor details and manage it. </p>
          <button
                  type='submit'
                  className='inline-flex mt-7 w-[560px] items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center  px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                  onClick={()=>{
                    router.push("/login")
                  }}
                >
                 Continue
                </button>
        </div>
      </div>
      <div className='h-full w-[50%] lg:flex text-white hidden overflow-hidden  flex-col items-center   justify-center pt-8 bg-primary fixed right-0 top-0 z-10 px-4 py-10 bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] border-l sm:py-16 lg:py-24'>
        <Image width={300} src={dots}  alt='' className='absolute -top-20 rotate-180 -right-28'/>
        <Image  height={250} src={dots} alt='' className='absolute bottom-0   -left-44'/>
        <AuthSlider/>
          {/* <Image width={300} src={scan} alt='' className=''/>
          <h1 className='text-3xl font-semibold mt-6'>Epass Account</h1>
          <p className='text-sm font-light mt-2'>Manage your daily transactions easily</p>
          <div className='flex gap-1 mt-4'>
          <div className='h-2 w-5 rounded-2xl bg-[#25AAE1]'>

          </div>
          <div className='h-2 w-2 rounded-full bg-white'>

          </div>
        
<div className='h-2 w-2 rounded-full bg-white'>

</div>
          </div> */}
          
        </div>
    </div>
  )
}
