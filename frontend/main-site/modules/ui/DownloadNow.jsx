import React from 'react'

export default function DownloadNow() {
  return (
    <div className=' px-16  flex justify-center py-32 items-center relative  lg:w-full w-[1200px] bg-bgcolor'>
<div className=' lg:w-full w-[1200px] 2xl:w-[1300px] bg-gradient-to-r from-[#25AAE1] rounded-2xl p-14 to-[#0F75BC]'>
<p className='font-bold text-6xl font-inter text-white'>Download <br /> Now</p>
<div className='flex gap-4 items-center mt-16'>
<a href='https://www.google.com/' target="_blank"> <img src="/playstore.png" alt="" className='h-12 cursor-pointer'/></a>
<a href='https://www.google.com/' target="_blank"><img src="/appstore.png" alt="" className='h-12 cursor-pointer'/></a>
</div>
</div>
<div className='absolute top-2 right-32 '>
<img src="/mobile.png" alt="" className='h-[450px]'/>
</div>
    </div>
  )
}
