import React from 'react'
import { allbenefits, office } from '../data/data'

export default function Benefits() {
  return (
    <div className='px-16 py-10 pb-40'>
<h1 className='font-bold font-inter text-5xl text-center'><span className='text-primaryblue'>ePass</span> Benefits</h1>
<div className='flex justify-between mt-14 gap-32'>
<img src="/benefits.png" alt="" className='h-[450px]'/>
<div className='mt-6 space-y-6'>
{allbenefits.map((e,i)=>{
    return <div key={i} className='flex gap-2 items-start'>
    <img src="/done.png" alt="" className='h-4 mt-1'/>
    <p className='font-normal text-base font-inter'>{e.name}</p>
    </div>
})}
</div>
</div>
    </div>
  )
}
