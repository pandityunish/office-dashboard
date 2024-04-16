import Image from 'next/image';
import React from 'react'
import { MdOutlinePerson } from 'react-icons/md'
import { baseurl } from '../apiurl';

export default function NotificationDetails({details}) {
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
    <div className='flex flex-col lg:w-[70%] w-[950px] p-5'>
        <div className='flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
<div className='h-[48px] w-[48px] rounded-xl my-2 relative bg-[#E5F3FE] flex items-center justify-center'>
  <MdOutlinePerson className="text-primaryblue text-2xl"/>

  
  </div>
  <p className='font-bold text-2xl font-inter'>{details.title}</p>
</div>
<p className='font-inter font-normal text-xs'>{convertDate(details.created_at)}</p>
        </div>
<p className='font-inter font-normal text-sm mt-4 px-2'>{details.message}</p>
{details.file===null?<></>:<div className='mt-8'>
<Image src={`${baseurl}${details.file}`} height={200} width={300} alt='some'/>
</div>}
    </div>
  )
}
