import React, { useEffect, useState } from 'react'
import { PiGitBranchBold } from "react-icons/pi";
import { FiMinus } from "react-icons/fi";
import { FaArrowRight } from 'react-icons/fa6';
import { GoPlus } from "react-icons/go";
import { getOrgBranchList } from '../data/dash_service';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import { TbTopologyStar } from 'react-icons/tb';
import { useUserData } from '../hooks/useUserData';
export default function BranchSection() {
  const router=useRouter();
  const [allbranches, setallbranches] = useState(null)
    const {
      data: user,
      isLoading: isUserLoading,
      isError: isUserError
    } = useUserData()
    const [isexpanded, setisexpanded] = useState(false);
    useEffect(() => {
      if(user===null|| isUserLoading){

      }else{
      getOrgBranchList({toast:toast,setBranches:setallbranches,searchtext:"",enddate:"",id:user.id,startdate:""})
      }
    }, [user])
    
  return (
    <>
      {allbranches===null?<div>

      </div>:<div className={`flex flex-col lg:w-full w-[388px] ${isexpanded===false?"h-[323.09px]":"h-[65.94px]  justify-center"} p-2 rounded-xl bg-[#0FBC88] mt-10`}>
  <div className='flex text-white justify-between w-full items-center p-5'>
     <div className='flex gap-3 items-center '>
     <TbTopologyStar className="text-2xl"/>
   
      <p className='font-medium text-base font-inter'>Total Branches </p>
      <p className='font-bold text-2xl leading-8'>{allbranches.count}</p> 
     </div>
  <div onClick={()=>{
      setisexpanded(!isexpanded);
  }}>
      {isexpanded===false?<FiMinus className="text-2xl cursor-pointer"/>:<GoPlus className="text-2xl cursor-pointer" />}
  
  </div>
    
  </div>
  <div className={`w-full ${isexpanded===false?"h-[254px] block":"h-0 hidden"} bg-white p-2 flex flex-col justify-between rounded-xl`}>
    {allbranches.results.length<=0?<div className='flex flex-col h-full font-bold text-sm leading-5  items-center justify-center'>
  <p>No Branches</p>
  </div>:<>
  <table className="min-w-full divide-y divide-gray-300 ">
      <thead>
        <tr>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Branch Name</th>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Branch No.</th>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Address</th>
        </tr>
      </thead>
      <tbody className='py-20'>
        {allbranches.results.slice(0,4).map((row, index) => (
          <tr key={index}>
            <td className="py-2 px-2 font-bold text-xs font-inter">{row.name}</td>
            <td className="py-2 px-2 font-bold text-xs font-inter">{row.branch_no}</td>
            <td className="py-2 px-2 font-normal text-xs font-inter">{ row.district}</td>
            <td className="py-2 px-2 ">
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* {allbranches.results.slice(0,5).map((e,i)=>{
      return  <div key={i} className='flex justify-between px-2 pt-4'>
      <p className='font-bold font-inter leading-5'>{e.name}</p>
      <p className='font-normal text-xs '>{e.district}</p>
          </div>
     })} */}
     <div className='flex gap-3 p-2 pt-3 items-center cursor-pointer' onClick={()=>{
      router.push("/branch-list")
     }}>
     <p className='text-primaryblue font-bold text-sm leading-5 '>
      Show All </p>
     <FaArrowRight className="text-sm text-primaryblue"/>
  
     </div>
    </>}
     
  </div>
      </div>}
   
      </>
  )
}
