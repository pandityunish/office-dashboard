import React, { useState } from 'react'
import { MdLockOutline } from 'react-icons/md'
import { TfiUnlock } from 'react-icons/tfi'
import { toast } from 'react-toastify'
import { branchupdate } from '../data/branch_service'

export default function ActiveInactive({lock_branch,id}) {
    const [branchstatus, setbranchstatus] = useState(lock_branch)
  return (
    <div>
       {branchstatus==="Active"?<div className={`rounded-lg my-2 h-[32px] w-[32px] flex flex-col justify-center items-center bg-[#0FBC88]`} onClick={()=>{
                branchupdate({toast:toast,id:id,request:"Inactive"});
                setbranchstatus("Inactive")
              }}>
                    <TfiUnlock className="text-white text-2xl" />

                  </div>:<div className={`rounded-lg my-2 h-[32px] w-[32px] flex flex-col justify-center items-center bg-[#FF3A3A]`} onClick={()=>{
                branchupdate({toast:toast,id:id,request:"Active"});
                setbranchstatus("Active")
              }}>
                    <MdLockOutline className="text-white text-2xl" />

                  </div>}  
    </div>
  )
}
