'use client'

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SomePage() {
    const data=useSearchParams();
  return (
    <div className="bg-bgcolor lg:w-full w-[1220px]">
 <div className='pt-20 bg-bgcolor font-inter flex flex-col items-center'>
<p className='font-bold text-[60px] font-inter text-center leading-[70px]'><span className='text-primaryblue'>{data.get("name")}</span><br /></p>

<div className='flex flex-col w-full relative  mt-10'>
<Image src="/backgroundtop.png" alt=""  width={1920} 
        height={1080} 
         className='w-full'/>
<Image src="/customer.png" width={900} height={500} className='absolute left-1/2 transform  -translate-x-1/2 top-1' alt="some"/>

</div>
<p className='w-[900px] font-normal text-xl text-center mt-28 mb-52'>Meeting management systems offer a comprehensive solution for optimizing workplace meetings, enhancing productivity, and streamlining collaboration.</p>

    </div>
    </div>
  )
}
