'use client'

import Image from "next/image"

export default function CustomerPage() {
  return (
    <div className="bg-bgcolor">
 <div className='pt-20 bg-bgcolor font-inter flex flex-col items-center'>
<p className='font-bold text-[65px] font-inter text-center leading-[70px]'><span className='text-primaryblue'>Customer</span><br />
<span className='text-primaryblue'>Registration</span>  Solution  <br />for workplace</p>

<div className='flex flex-col w-full relative  mt-14'>
<img src="/backgroundtop.png" alt="" className='w-full'/>
<Image src="/guest.png" width={900} height={500} className='absolute left-1/2 transform  -translate-x-1/2 top-1' alt="some"/>

</div>
<p className='w-[900px] font-normal text-xl text-center mt-28 mb-52'>Meeting management systems offer a comprehensive solution for optimizing workplace meetings, enhancing productivity, and streamlining collaboration.</p>

    </div>
    </div>
  )
}
