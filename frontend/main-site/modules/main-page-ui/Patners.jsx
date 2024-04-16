import React from 'react'
import InfiniteSlider from './CustomSlider'

export default function Patners() {
  const sliders=[
    '/walmart.png','/deloitte.png','/okta.png','/cisco.png','/okta.png','/walmart.png','/deloitte.png'
  ]
  return (
    <div className='bg-lightblue py-10 flex flex-col items-center w-full'>
<p className='font-normal text-xl text-[#898989] font-inter'>Partners</p>
{/* <div className='flex items-center justify-between w-full mt-10'>

<img src="/walmart.png" alt="" className='h-12'/>
<img src="/deloitte.png" alt="" className='h-12'/>
<img src="/okta.png" alt="" className='h-12'/>
<img src="/cisco.png" alt="" className='h-12'/>
<img src="/deloitte.png" alt="" className='h-12'/>
<img src="/okta.png" alt="" className='h-12'/>
<img src="/cisco.png" alt="" className='h-12'/>
</div> */}
<div className='h-26 lg:w-[95%] w-[1200px] pt-10'>
<InfiniteSlider slides={sliders}/>
</div>
    </div>
  )
}
