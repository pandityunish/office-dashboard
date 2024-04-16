import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6';
import { getrecentvisitor } from '../data/dash_service';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function RecentVisitor() {
    const profiles=[1,2,3,4];
    const router=useRouter();
    const [getvisitor, setgetvisitor] = useState(null);
    useEffect(() => {
      getrecentvisitor({toast:toast,setvisitor:setgetvisitor});
    }, [])
    const formatDateString = (inputDateString) => {
      const inputDate = new Date(inputDateString);
      const options = { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      return inputDate.toLocaleString('en-US', options);
    };
  return (
    <div className='lg:w-[30%] w-[275px] h-[428px] p-6 shadow-3xl rounded-xl bg-white font-inter'>
  <h1 className='font-bold text-2xl leading-9 '>Recent Visitor</h1>
  {getvisitor===null?<div>
    
  </div>:
  <>
  {getvisitor.results.length<=0?<div className='flex flex-col h-full font-bold text-sm leading-5  items-center justify-center'>
  <p>No Visitors</p>
  </div>:<>
  <div className='flex flex-col gap-3 justify-between'>
   {getvisitor.results.sort((a, b) => new Date(b.visited_at) - new Date(a.visited_at)).slice(0,4).map((profile,i)=>{
    return <div key={i} className='flex gap-3 mt-5 items-center'>
    <img
              
              src={
                 '/user-avatar.png'
              }
              alt='Organization Logo'
              className='h-[40px] w-[40px] rounded-full object-cover'
            />
            <div className='flex flex-col'>
               <p className='font-bold text-sm leading-5 '>{profile.full_name}</p>
               <p className='text-xs font-normal '>{formatDateString(profile.visited_at)}</p>
            </div>
    </div>
   })}
   </div>
  {getvisitor.results.length<=5?<></>:<div className='flex gap-3 mt-10 items-center'>
   <p className='text-primaryblue font-bold text-sm leading-5 ' onClick={()=>{
router.push("/visitor-list")
   }}>
    Show All </p>
   <FaArrowRight className="text-sm text-primaryblue"/>

   </div>} 
  </>}
  
  </>}
   
   
    </div>
  )
}
