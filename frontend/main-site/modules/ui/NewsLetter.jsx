import React from 'react'

export default function NewsLetter() {
  return (
    <div className='lg:w-full w-[1200px] bg-primaryblue flex items-center justify-between p-16 font-inter text-white'>
<p className='font-inter font-light text-lg'>Subscribe to our <br /> <span className='font-extrabold text-5xl'>Newsletter</span></p>
<div className='relative '>
<input type="text" placeholder='Input your email address ' className=' font-normal text-textgrey pl-4 text-base  xl:w-[847px] w-[500px] rounded-xl h-[60px] bg-white outline-none'/>
<button className='absolute right-2 h-[50px] w-[122px] top-1/2 transform  -translate-y-1/2 bg-primaryblue rounded-xl outline-none'>
    Submit
</button>
</div>
    </div>
  )
}
