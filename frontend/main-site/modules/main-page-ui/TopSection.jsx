"use client"

import Image from 'next/image';
import React from 'react'
import { FiArrowUpRight } from "react-icons/fi";
import { useRouter } from 'next/navigation';

export default function TopSection() {
  const router=useRouter();
  return (
    <div className='mt-10 font-inter flex flex-col items-center'>
<p className='font-bold text-[65px] font-inter text-center leading-[70px]'><span className='text-primaryblue'>Streamlined</span> Front Desk,<br />
<span className='text-primaryblue'>Secure</span> Workspace</p>
<p className='w-[800px] font-normal text-xl text-center mt-10'>ePass is a modern solution for visitor check-in, replacing paper methods with a digital system for better security and convenience.</p>
<button
                  type='submit'
                  className='flex gap-2 h-[60px] mt-10 w-[170px] items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center   py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                  onClick={()=>{
                    router.push("https://office.epass.com.np/login")
                   }}
                >
                 Get Started
                 <FiArrowUpRight className='text-xl'/>
                </button>
<div className='flex flex-col w-full relative mb-52'>
<img src="/backgroundtop.png" alt="" className='w-full'/>
<Image src="/topphoto.png" width={900} height={600} className='absolute left-1/2 transform  -translate-x-1/2 top-16'/>

</div>
    </div>
  )
}
