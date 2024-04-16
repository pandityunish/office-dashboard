import React from 'react'

export default function WhyUs() {
  return (
    <div className='w-full mt-10  '>
        <h1 className='font-bold font-inter text-5xl text-center'>Why <span className='text-primaryblue'>Us</span>?</h1>
        <div className='flex items-center justify-center'>

       
<div className='mt-10 grid grid-cols-3 gap-8'>
<div className='w-[280px] h-[240px] bg-white flex shadow-3xl rounded-2xl flex-col items-center justify-center'>
<img src="/secure.png" alt="" className='h-20'/>
<p className='font-bold text-2xl font-inter mt-5'>Secure</p>
</div>
<div className='w-[280px] h-[240px] bg-white flex shadow-3xl rounded-2xl flex-col items-center justify-center'>
<img src="/reliable.png" alt="" className='h-20'/>
<p className='font-bold text-2xl font-inter mt-5'>Reliable</p>
</div>
<div className='w-[280px] h-[240px] bg-white flex shadow-3xl rounded-2xl flex-col items-center justify-center'>
<img src="/free.png" alt="" className='h-20'/>
<p className='font-bold text-2xl font-inter mt-5'>Hassle-Free</p>
</div>
<div className='w-[280px] h-[240px] bg-white flex shadow-3xl rounded-2xl flex-col items-center justify-center'>
<img src="/real.png" alt="" className='h-20'/>
<p className='font-bold text-2xl font-inter mt-5'>Real-time</p>
</div>
<div className='w-[280px] h-[240px] bg-white flex shadow-3xl rounded-2xl flex-col items-center justify-center'>
<img src="/user.png" alt="" className='h-20'/>
<p className='font-bold text-2xl font-inter mt-5'>User Friendly</p>
</div>
<div className='w-[280px] h-[240px] bg-white flex shadow-3xl rounded-2xl flex-col items-center justify-center'>
<img src="/accessible.png" alt="" className='h-20'/>
<p className='font-bold text-2xl font-inter mt-5'>Accessible</p>
</div>

</div>
</div>
    </div>
  )
}
