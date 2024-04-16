import React from 'react'
import { useRouter } from 'next/navigation';
export default function MannualEntry() {
  const router = useRouter();
  const handleSearch = (event) => {
   
      router.push("/manual-entry");
    
  };

  return (
    <div className='bg-[#FFF8ED] p-5 font-inter lg:w-full w-[948px] h-[185px] rounded-xl mt-8 shadow-3xl flex justify-between'>
          <div>
          <p className='font-bold text-2xl leading-9'>Manual Visitor Check-in</p>
          <p className='font-normal font-inter text-base leading-6 w-[540px]'> Please fill your required details for visitor check-in.</p>
          <button className='h-[36px] w-[124px] rounded-xl border-primaryblue border mt-3 text-primaryblue' onClick={()=>{
            handleSearch();
          }}>
            Fill Manully
          </button>
      
          </div>
          <img src="/mannual entry.png" alt="" />
    </div>
  )
}
