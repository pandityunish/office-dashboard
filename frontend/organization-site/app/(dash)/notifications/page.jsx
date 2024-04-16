'use client'

import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useNotifications } from '@/modules/hooks/useNotificationData'
import { useRouter } from 'next/navigation'
import { IoMdArrowDropdown } from "react-icons/io";
import { MdArrowDropDown, MdOutlinePerson } from "react-icons/md";
import './../notiscroll.css';
import NotificationDetails from '@/modules/notification-component/NotificationDetails'
import Image from 'next/image'
import { getdetailsnotifications, getnotifications, updatenotification } from '@/modules/data/notification_service'
import { toast } from 'react-toastify'
import { useUserData } from '@/modules/hooks/useUserData'
import { notificationTypes, notificationfilter } from '@/modules/data/organization_types_nature'


const Page = () => {
  const router = useRouter()
  const [isclicked, setisclicked] = useState(0)
  const handleRowClick = (params, event) => {
    router.push(`/notifications/${params.id}`)
  }

  const [data, setdata] = useState(null)
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
const [getdetails, setgetdetails] = useState(null)
  useEffect(() => {
    if(user===null|| isUserLoading){

    }else{
getnotifications({toast:toast,setnotifications:setdata,id:user.id,created_at:""});}
  }, [user])
  
const allnotification=[
  1,2,3,4,5,6,7,8,9,10,20,32
]
const convertDate = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return formattedDate;
};
  return (
    <div className=' bg-white rounded-lg shadow-sm lg:w-[100%] p-7 mb-10 h-[808.49px]'>
      {data===null?<></>:<>
    <div className='flex justify-between'>
    <h1 className='font-bold text-2xl leading-9 '>Notification</h1>
    <div className='mt-[8px] relative'>
                        <select
                          className='block w-[84px] h-[34px]  text-[#A3A3A3] font-inter font-semibold text-sm px-2 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                         onChange={(e)=>{
                          console.log(e.target.value)
                          getnotifications({toast:toast,setnotifications:setdata,id:user.id,created_at:e.target.value});
                         }}
                        >
                          <option value="" className='text-[#A3A3A3] font-inter font-semibold text-sm'>
                            All
                          </option>
                          {notificationfilter.map(org => (
                            <option key={org.id} value={org.value} className='text-sm  font-normal text-[#A3A3A3]' onClick={()=>{
                              // }
console.log(org.value)
                            }}>
                              {org.title}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <MdArrowDropDown />
                        </div>

                       
                      </div>
   
    </div>
    <div className='flex justify-between items-center mt-10'>
      <div className='flex gap-8'>
      <div className='w-[180px] flex flex-col items-center justify-center cursor-pointer transition duration-1000 ease-in' onClick={()=>{
        setisclicked(0)

      }}>
      <h1 className={`${isclicked===0?"font-bold text-primaryblue":"font-normal"}  font-inter text-base transition duration-1000 ease-in`}>All</h1>
      {isclicked===0?<div className=' bg-primaryblue h-[2px] mt-2 w-full'></div>:<></>}  
      </div>
      {/* <div className='w-[180px] flex flex-col items-center justify-center cursor-pointer transition duration-1000 ease-in' onClick={()=>{
        setisclicked(1)
      }}>
      <h1 className={`${isclicked===1?"font-bold text-primaryblue":"font-normal"}  font-inter text-base transition duration-1000 ease-in`}>Alerts</h1>
    {isclicked===1?<div className=' bg-primaryblue h-[2px] mt-2 w-full'></div>:<></>}  
      </div>
      <div className='w-[180px] flex flex-col items-center justify-center cursor-pointer transition duration-1000 ease-in' onClick={()=>{
        setisclicked(2)
      }}>
      <h1 className={`${isclicked===2?"font-bold text-primaryblue":"font-normal"}  font-inter text-base transition duration-1000 ease-in`}>Events</h1>
    {isclicked===2?<div className=' bg-primaryblue h-[2px] mt-2 w-full'></div>:<></>}  
      </div>
      <div className='w-[180px] flex flex-col items-center justify-center cursor-pointer transition duration-1000 ease-in' onClick={()=>{
        setisclicked(3)
      }}>
      <h1 className={`${isclicked===3?"font-bold text-primaryblue":"font-normal"}  font-inter text-base transition duration-1000 ease-in`}>Logs</h1>
    {isclicked===3?<div className=' bg-primaryblue h-[2px] mt-2 w-full'></div>:<></>}  
      </div> */}
      </div>
     <p className='font-semibold text-base text-greyneutral'>Mark all read</p>
     </div>
     <div className='w-full bg-greyneutral h-[1px] mb-2'></div>
     <div className='flex gap-4'>
 <div id='container' className='flex flex-col  w-[500px] h-[600px] mt-6 overflow-y-auto'>
  
  {data.results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((e,i)=>{
 return <div className='flex gap-3 cursor-pointer ' key={i} onClick={()=>{
  // setdata({name:"Someone"})
  getdetailsnotifications({toast:toast,setdetails:setgetdetails,id:e.id});
  // updatenotification({toast:toast,id:e.id})
 }}>
  <div className='h-[48px] w-[48px] rounded-xl my-2 relative bg-[#E5F3FE] flex items-center justify-center'>
  <MdOutlinePerson className="text-primaryblue text-2xl"/>
 {e.is_seen===false?<div className='absolute -top-0 right-0 h-[8px] w-[8px] rounded-full bg-[#FFAB1E]'></div>:<></>} 

  
  </div>
  <div className='flex flex-col items-start justify-center w-[400px]'>
    <div className='flex justify-between items-center w-full'>
    <p className='font-bold font-inter text-sm'>{e.title}</p>
    <p className='font-normal font-inter text-xs text-[#898989]'>{convertDate(e.created_at)}</p>
    </div>
  
  <p className='font-normal font-inter text-xs text-[#898989] '>{e.message===null?"": e.message.split(' ').slice(0, 10).join(' ')}</p>
  
  </div>
  
  </div>
})}
 

</div>
<div className="border-l-2 border-greyneutral h-[600px] mt-3"></div>
{getdetails===null?<div className='flex flex-col items-center justify-center lg:w-[70%] w-[900px] '>
<Image src="/notification.png" alt="" width={100} height={100}/>
<p className='font-bold font-inter text-2xl leading-9'>Notification</p>
<p className='font-normal text-base font-inter w-[562.28px] mt-4 text-center'>Stay connected with exclusive offers, important announcements, and exciting news through personalized notifications tailored just for you.</p>
</div>:<>
<NotificationDetails details={getdetails}/>
</>}

     </div>
     </>
     }
    </div>
  )
}

export default Page
