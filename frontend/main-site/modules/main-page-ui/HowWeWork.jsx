import React from 'react'
import { office } from '../data/data'

export default function HowWeWork() {
  return (
    <div className='py-4 w-full px-24 2xl:w-[1300px]'>
<h1 className='font-bold font-inter text-5xl text-center'>How <span className='text-primaryblue'>We</span> Work?</h1>
<div className='flex items-center justify-between mt-10 w-full'>
<div className='p-8 shadow-lg w-[330px] rounded-3xl bg-white'>
<img src="/office.png" alt="" className='h-40'/>
<h1 className="font-bold font-inter text-4xl mt-3">Office</h1>
<div className='mt-6'>
{office.map((e,i)=>{
    return <div key={i} className='flex gap-2 items-start'>
    <img src="/done.png" alt="" className='h-4 mt-1'/>
    <p className='font-normal text-base font-inter'>{e.name}</p>
    </div>
})}
</div>


</div>
<div className='flex items-center'>
<div className='flex items-center'>
<div className='w-[15px] h-[15px] bg-textgrey rounded-full'>

</div>
<div className='w-[90px] h-[3px] bg-textgrey'>

</div>
</div>
<img src="/epass.jpg" alt="" className='w-[100px] rounded-2xl'/>
<div className='flex items-center'>

<div className='w-[90px] h-[3px] bg-textgrey'>

</div>
<div className='w-[15px] h-[15px] bg-textgrey rounded-full'>

</div>
</div>
</div>

<div className='p-8 shadow-lg w-[330px] rounded-3xl bg-white'>
<img src="/walking.png" alt="" className=''/>
<h1 className="font-bold font-inter text-4xl mt-3">Visitor</h1>
<div className='mt-6'>
{office.map((e,i)=>{
    return <div key={i} className='flex gap-2 items-start'>
    <img src="/done.png" alt="" className='h-4 mt-1'/>
    <p className='font-normal text-base font-inter'>{e.name}</p>
    </div>
})}
</div>


</div>
</div>
    </div>
  )
}
