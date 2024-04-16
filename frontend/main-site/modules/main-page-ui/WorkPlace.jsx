"use client"
import { FiArrowUpRight } from 'react-icons/fi'
import './scroll.css'
import { useRouter } from 'next/navigation';
import { LiaIdCardSolid } from 'react-icons/lia';
import { MdOutlineCalendarToday, MdPeopleOutline } from 'react-icons/md';
import { BsPersonCheck } from 'react-icons/bs';
import { useState } from 'react';

export default function WorkPlace() {
  const router=useRouter();
  const [currentindex, setcurrentindex] = useState(0)

const features=[
    {id:1,name:"Visitor Check-in",image:LiaIdCardSolid,link:"/check-in-and-out"},
    {id:2,name:"Hotel/Guest Check-in",image:MdOutlineCalendarToday,link:"/check-in-and-out"},
    {id:3,name:"Meeting Appointment",image:BsPersonCheck,link:"/meeting"},
    {id:4,name:"Customer Registration",image:MdPeopleOutline,link:"/customer-registration"},
   
]
  return (
   <div className='px-16 w-full py-20 2xl:w-[1300px]'>
     <div className='bg-primaryblue px-16 h-[450px] flex justify-between rounded-xl py-10 w-full'>
<div id='container' className='flex flex-col overflow-y-scroll gap-4'>
    {features.map((e,i)=>{
        return <div key={i} onChange={()=>{
            setcurrentindex(i);
            console.log(currentindex);
        }} className='w-[300px]  p-5 bg-lightblue rounded-xl cursor-pointer' onClick={()=>{
            router.push(e.link)
                }}>
            {/* <img src={e.image} alt="" /> */}
            <div className='bg-blue-100 p-2 rounded-full flex items-center justify-center h-[76px] w-[76px]'>
<e.image className="text-primaryblue text-5xl"/>
  </div>
            
            <p className={`font-bold font-inter text-3xl mt-6 ${e.id===1?"w-[70%]":"w-[100%]"}`}>{ e.name}</p>
                </div>
    })}
  
   
   
   
</div>
<div className='flex flex-col w-[530px]'>
<h1 className='font-extrabold text-white text-5xl leading-[70px]'>ePass's Workplace <br />
Platform </h1>
<p className='font-inter font-normal text-base text-white'>We are pioneers in contactless, cloud-based workspace solutions, delivering smart, secure, and modern workplace experiences to companies around the world.</p>
<button
                  type='submit'
                  className='flex gap-2 h-[60px] mt-10 w-[170px] items-center bg-white justify-center   py-4 text-base font-semibold  transition-all duration-200 border border-transparent rounded-xl text-primaryblue'
                >
                 Get Started
                 <FiArrowUpRight className='text-xl'/>
                </button>
</div>
</div>
   </div>
  )
}
