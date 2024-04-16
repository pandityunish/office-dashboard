"use client"

import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { useRouter } from 'next/navigation';

export default function JobBoard() {
  const router=useRouter();
  return (
    <div className='pt-20 lg:w-full w-[1200px] font-inter flex flex-col items-center bg-bgcolor'>
<p className='font-bold text-[65px] font-inter text-center leading-[70px]'><span className='text-primaryblue'>ePass </span> - Job Board</p>
<p className='w-[800px] font-normal text-xl text-center mt-5'>If you have anything to ask, feel free to send us a message</p>
<button
                  type='submit'
                  className='flex gap-2 h-[60px] mt-20 w-[240px] items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center   py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                 View Open Positions
                 <FiArrowUpRight className='text-xl'/>
                </button>
<div className='mt-20 px-16 flex flex-col items-center justify-center mb-40'>
    <img src="/job.png" alt="" />
    <div className='bg-white w-[930px] p-10 shadow-3xl rounded-xl -mt-40'>
<p className='font-inter text-3xl font-bold'>Open Positions</p>
<div className='flex flex-col mt-20'>
<div className='flex justify-between items-end'>
<div className='flex flex-col font-inter'>
<p className='font-bold text-xl'>Junior UI/UX Designer</p>
<p className='font-normal text-sm text-textgrey'>Salary: Negotable</p>
<div className='flex gap-3 mt-3' >
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Full Time
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Design
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Remote
</div>
</div>
</div>
<div className=''>
<button
onClick={()=>{
  router.push("/job-details")
}}
                  type='submit'
                  className='flex gap-2 w-[160px] h-[50px]   items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center   py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                Apply Now
                 <FiArrowUpRight className='text-xl'/>
                </button>
</div>
</div>
<div className='h-[2px] w-full bg-[#A3A3A3] my-10'>

</div>
<div className='flex justify-between items-end'>
<div className='flex flex-col font-inter'>
<p className='font-bold text-xl'>Business Development Manager</p>
<p className='font-normal text-sm text-textgrey'>Salary: Negotable</p>
<div className='flex gap-3 mt-3' >
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Full Time
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Design
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Remote
</div>
</div>
</div>
<div className=''>
<button
                  type='submit'
                  className='flex gap-2 w-[160px] h-[50px]   items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center   py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                Apply Now
                 <FiArrowUpRight className='text-xl'/>
                </button>
</div>
</div>
<div className='h-[2px] w-full bg-[#A3A3A3] my-10'>

</div>
<div className='flex justify-between items-end'>
<div className='flex flex-col font-inter'>
<p className='font-bold text-xl'>Mid. React Developer</p>
<p className='font-normal text-sm text-textgrey'>Salary: Negotable</p>
<div className='flex gap-3 mt-3' >
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Full Time
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Design
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Remote
</div>
</div>
</div>
<div className=''>
<button
                  type='submit'
                  className='flex gap-2 w-[160px] h-[50px]   items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center   py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                Apply Now
                 <FiArrowUpRight className='text-xl'/>
                </button>
</div>
</div>
<div className='h-[2px] w-full bg-[#A3A3A3] my-10'>

</div>
<div className='flex justify-between items-end'>
<div className='flex flex-col font-inter'>
<p className='font-bold text-xl'>HR Manager</p>
<p className='font-normal text-sm text-textgrey'>Salary: Negotable</p>
<div className='flex gap-3 mt-3' >
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Full Time
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Design
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Remote
</div>
</div>
</div>
<div className=''>
<button
                  type='submit'
                  className='flex gap-2 w-[160px] h-[50px]   items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center   py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                Apply Now
                 <FiArrowUpRight className='text-xl'/>
                </button>
</div>
</div>
</div>
    </div>
</div>
    </div>
  )
}
