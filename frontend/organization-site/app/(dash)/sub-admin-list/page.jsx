'use client'

import { getorgbranch } from "@/modules/data/dash_service";
import SwitchButton from "@/modules/kyc-component/SwitchButton";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineDelete, MdOutlineVisibility } from "react-icons/md"
import { toast } from "react-toastify";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import Image from "next/image";
import DefaultButton from "@/modules/core-ui/Button";
import ErrorDialog from "@/modules/core-ui/ErrorDialog";
import { deletesubadmin, getsubadminlist } from "@/modules/data/branch_service";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SubAdminList() {
  const router=useRouter();
    const [allsubadmin, setsubadmin] = useState(null);
    const [open, setopen] = useState(false)
    const [id, setid] = useState("")
    const [index, setindex] = useState(0)
    const handlesearch = (e) => {
      setopen(false);
      }
      useEffect(() => {
        getsubadminlist({ toast: toast,  setsubadmin: setsubadmin })
      }, [])
     const handleClose=()=>{
      setopen(false)
     }
     const removeItem = (indexToRemove) => {
      // Create a new array without the item at the specified index
      const updatedList = allsubadmin.filter((_, index) => index !== indexToRemove);
  
      // Update the state with the new list
      setsubadmin(updatedList);
    };
  return (
    <div className='lg:w-[100%] w-[1367px]   mt-10 rounded-xl p-7 shadow-lg bg-white font-inter'>
      <ErrorDialog handleClose={handleClose} onclick={()=>{
        deletesubadmin({toast:toast,id:id});
        removeItem(index);
        handleClose();
    
      }} open={open} text={"delete sub-admin?"}/>
      <div className='flex justify-between'>
        <h1 className='font-bold text-2xl leading-9 '>Sub admin List</h1>
        <div className="flex gap-3">
      
        <div className='flex gap-2 items-center'>
          <div className='relative'>
            <input type="text" className='border  border-[#898989] p-4 rounded-xl h-[45px] w-[333px]  focus:outline-none pl-10' placeholder='Type here...' onChange={(e) => {
              handlesearch(e.target.value)
            }} />
            <IoSearchSharp className="absolute text-xl left-3 top-1/2  transform -translate-y-1/2 text-gray-400" />
          </div>
         
        </div>
        </div>
      </div>
     
      {allsubadmin === null ? <></> : <>
        <table className="min-w-full divide-y divide-gray-300 mt-8">
          <thead>
            <tr>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">SN</th>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">User Full Name</th>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Address</th>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Mobile No.</th>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Email address</th>

              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Role</th>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Active/Deactive</th>

              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Action</th>
            </tr>
          </thead>
          <tbody className='py-20'>

            {allsubadmin.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-2  text-xs font-inter font-bold">{index + 1}</td>
                <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">{row.full_name}</td>
                <td className="py-2 px-2 pl-4 font-normal text-xs font-inter text-[#111827]">{row.address}</td>
                <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">{row?.mobile_no}</td>
                <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">{row?.email}</td>
                <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                  <div className='flex gap-4 items-center'>
                    {row?.role}

                  </div>
                </td>

                <td >
            <div className="flex px-10">
            <SwitchButton isvalue={row.active} id={row.id}/>
            </div>
                </td>
                <td>     <div className='flex gap-2 items-end justify-start'>
                 
                <Link href={{
          pathname: "/sub-admin-list/details",
          query: {
            id: row.id
          }}}>   <div className='rounded-lg cursor-pointer my-2 h-[32px] w-[32px] flex flex-col justify-center items-center border border-[#898989]'>
                    <MdOutlineVisibility className="text-[#898989] text-2xl" />

                  </div></Link>
                  <div className='rounded-lg my-2 h-[32px] w-[32px] flex flex-col justify-center items-center bg-[#FFE4E4] cursor-pointer' onClick={()=>{
                    setid(row.id);
                    setindex(index);
                    setopen(true);
                  }}>
                    <MdOutlineDelete className="text-[#FF3A3A] text-2xl" />

                  </div>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>}

      
    
    </div>
  )
}
