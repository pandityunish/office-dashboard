'use client'


import React, { useEffect, useState } from 'react'
import CircularDays from '../dash-component/CircularDays'
import { getsubscription } from '../data/dash_service'
import { toast } from 'react-toastify'

export default function PreminumPlan() {
    const [sub, setsub] = useState(null)
    useEffect(() => {
        getsubscription({toast:toast,setsub:setsub})
    }, [])
    const formatDate1 = (date) => {
      const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      };
    
      return date.toLocaleString('en-US', options);
    };
    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return dateObject.toLocaleString('en-US', options);
      };
      const calculateDaysDifference = (dateString1, dateString2) => {
        const today = new Date();
      const date1=formatDate(today);
      const date2=formatDate(dateString2)
      
        const startDate = new Date(date1);
  const endDate = new Date(date2);

  const differenceInMilliseconds = endDate - startDate;

        // Convert milliseconds to days and round down
        const daysLeft = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      
        return daysLeft;
      };
  return (
    <>
  {sub===null?<></>:
  <>
   <div className='flex flex-col gap-4 px-5 mt-[30%] w-full'>
    <p className='text-primaryblue font-bold font-inter text-sm'>Subscription Plan</p>
    {sub.length<=0?<></>:
   <div className='flex items-center flex-col p-5 w-full rounded-xl bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC]'>
  <CircularDays days={calculateDaysDifference(sub[0].start_subscription,sub[0].end_subscription)}/>
  <p className='text-white text-xs font-normal mt-3'>Renew Date: {formatDate(sub[0].start_subscription)}</p>
  <p className='text-white text-xs font-normal'>Expiry Date:{formatDate(sub[0].end_subscription)}</p>
  <button className='bg-white text-black font-bold text-xs  rounded-xl  w-full mt-2 h-[35px]'>Renew Now</button>
   </div>}
     </div>

 </>
     }  
     </>
  )
}
