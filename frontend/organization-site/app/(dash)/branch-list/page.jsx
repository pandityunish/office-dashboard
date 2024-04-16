"use client"

import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { MdArrowDropDown, MdOutlineVisibility } from "react-icons/md";
import { MdOutlineFilterAlt } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { saveAs } from 'file-saver'

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDownload } from 'react-icons/go';
import { toast } from 'react-toastify';
import { MdOutlineDelete } from "react-icons/md";
import {  deletebranch, getorgbranch } from '@/modules/data/dash_service';
import DefaultButton from '@/modules/core-ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ErrorDialog from '@/modules/core-ui/ErrorDialog';
import { TfiUnlock } from "react-icons/tfi";
import { branchupdate } from '@/modules/data/branch_service';
import ActiveInactive from '@/modules/kyc-component/ActiveInactive';
import { baseurl } from '@/modules/apiurl';
import { useUserData } from '@/modules/hooks/useUserData';

export default function BranchList() {
  const router=useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const showAdjacentPages = 2;
  const [newvisitors, setnewvisitors] = useState(null);
  const [isFilter, setisFilter] = useState(false)
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
  useEffect(() => {
    if(user===null|| isUserLoading){

    }else{
    getorgbranch({ toast: toast,id:user.id,  setbranches: setnewvisitors,searchtext:"",startdate:selectedDate,enddate:endselecteddate })}
  }, [user])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // You may also want to fetch data for the new page here
  };
  const handlesearch = (e) => {
    getorgbranch({ toast: toast,id:user.id,  setbranches: setnewvisitors,searchtext:e ,startdate:selectedDate,enddate:endselecteddate})
  }
  const pageNumbers = Array.from({ length: 2 }, (_, index) => index + 1);

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
  const visiblePages = pageNumbers.slice(
    Math.max(currentPage - showAdjacentPages, 0),
    Math.min(currentPage + showAdjacentPages + 1, 2)
  );
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    getorgbranch({ toast: toast,id:user.id,  setbranches: setnewvisitors,searchtext:"", startdate:event.target.value,enddate:endselecteddate})

  };
  const endhandleDateChange = (event) => {
    console.log(event.target.value)
    setendselecteddate(event.target.value);
    getorgbranch({ toast: toast, id:user.id, setbranches: setnewvisitors,searchtext:"", enddate:event.target.value,startdate:selectedDate})

  };
  const [open, setopen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("");
  const [endselecteddate, setendselecteddate] = useState("")
  const handleClose=()=>{
    setopen(false)
   }
  
const [branchid, setbranchid] = useState("")
  return (
    <div className='lg:w-full w-[1367px]  mt-10 rounded-xl p-7 shadow-lg bg-white font-inter'>
      <ErrorDialog handleClose={handleClose} onclick={()=>{
deletebranch({toast:toast,id:branchid}).finally(()=>{
  
setnewvisitors(null)
  getorgbranch({ toast: toast,id:user.id,  setbranches: setnewvisitors,searchtext:"", enddate:endselecteddate,startdate:selectedDate})
  handleClose();
});

      }} open={open} text={"delete branch?"}/>
      <div className='flex justify-between'>
        <h1 className='font-bold text-2xl leading-9 '>Branch List</h1>
        <div className='flex gap-2 items-center'>
       
          <div className='relative'>
            <input type="text" className='border  border-[#898989] p-4 rounded-xl h-[45px] w-[333px]  focus:outline-none pl-10' placeholder='Search here...' onChange={(e) => {
              handlesearch(e.target.value)
            }} />
            <IoSearchSharp className="absolute text-xl left-3 top-1/2  transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className='flex gap-2 cursor-pointer w-[84px] items-center justify-center rounded-xl h-[34px] border-2 border-black  ' onClick={()=>{
            setisFilter(!isFilter)
          }}>
            <p className='font-bold font-inter text-xs '>Filter</p>
            <MdOutlineFilterAlt className="text-sm" />
          </div>
          <div className='flex gap-2 cursor-pointer w-[141px] items-center justify-center rounded-xl h-[34px] border-2 border-black  ' onClick={()=>{
            saveAs(`${baseurl}/organization/${user.id}/branches/download-excel`)
          }}>
            <p className='font-bold font-inter text-xs '>Download PDF</p>
            <GoDownload className="text-sm" />
          </div>
        </div>
      </div>
     {isFilter===false?<></>:<div className='flex gap-3'>
        <div className='flex gap-5 py-4'>
          <div>
            <label className="block font-normal font-inter text-sm mb-2" htmlFor="datepicker">
              Start Date:
            </label>
            <input
              type="date"
              id="datepicker"
              placeholder="Select a date"
              value={selectedDate}
              pattern="\d{4}-\d{2}-\d{2}"
              onChange={handleDateChange}
              className="p-2 border w-[298px] h-[60px] rounded-xl text-xl text-[#A3A3A3] border-[#A3A3A3]"
            />
          </div>
          <div>
            <label className="block font-normal font-inter text-sm mb-2" htmlFor="datepicker">
              End Date:
            </label>
            <input
              type="date"
              id="datepicker"
              placeholder="Select a date"
              value={endselecteddate}
              pattern="\d{4}-\d{2}-\d{2}"
              onChange={endhandleDateChange}
              className="p-2 border w-[298px] h-[60px] rounded-xl text-xl text-[#A3A3A3] border-[#A3A3A3]"
            />
          </div>


          {/* <div className='w-[308px] '>


            <label
              htmlFor='organization_name'
              className='text-sm font-normal text-[#A3A3A3] '
            >
              Visitor Type
            </label>
            <div className=' relative mt-1'>
              <select
                className='block w-full p-4 text-[#A3A3A3]  placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'

              >
                <option value="" className='text-[#A3A3A3] '>
                  Visitor Type
                </option>

              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <MdArrowDropDown />
              </div>


            </div>

          </div> */}
          <div className='w-[149px] h-[56px] mt-7 cursor-pointer border-black font-semibold font-inter text-lg  rounded-xl border-2 flex items-center justify-center' onClick={()=>{
            setendselecteddate("");
            setSelectedDate("");
          }}>
            Clear
          </div>
          <div className='w-[149px] mt-7' onClick={()=>{
                getorgbranch({ toast: toast, id:user.id, setbranches: setnewvisitors,searchtext:"", enddate:event.target.value,startdate:selectedDate})

          }}>
            <DefaultButton text="Filter" />
          </div>
        </div>
      </div>} 
      {newvisitors === null ? <></> : <>
        <table className="min-w-full divide-y divide-gray-300 mt-8">
          <thead>
            <tr>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">SN</th>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Branch Name</th>
              <th className="py-3 px-2 pl-4 text-start font-bold text-xs font-inter text-[#A3A3A3]">Branch No.</th>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Address</th>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Mobile No.</th>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Email address</th>

              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Contact Person</th>
              <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]"></th>
            </tr>
          </thead>
          <tbody className='py-20'>

            {newvisitors.results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-2  text-xs font-inter font-bold">{index + 1}</td>
                <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">{row.name}</td>
                <td className="py-2 px-2 pl-4 font-normal text-xs font-inter text-[#111827]">{row.branch_no}</td>
                <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">{row?.district}</td>
                <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">{row?.mobile_no}</td>
                <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                  <div className='flex gap-4 items-center'>
                    {row?.email}

                  </div>
                </td>

                <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">{row.contact_person}</td>
                <td>     <div className='flex gap-2 items-end justify-end'>
              {/* {row.lock_branch==="Active"?<div className={`rounded-lg my-2 h-[32px] w-[32px] flex flex-col justify-center items-center bg-[#0FBC88]`} onClick={()=>{
                branchupdate({toast:toast,id:row.id,request:"Inactive"})
              }}>
                    <TfiUnlock className="text-white text-2xl" />

                  </div>:<div className={`rounded-lg my-2 h-[32px] w-[32px] flex flex-col justify-center items-center bg-[#FF3A3A]`} onClick={()=>{
                branchupdate({toast:toast,id:row.id,request:"Active"})
              }}>
                    <MdLockOutline className="text-white text-2xl" />

                  </div>}     */}
                  <ActiveInactive id={row.id} lock_branch={row.lock_branch}/>
                  <Link   href={{
          pathname: "/branch-list/details",
          query: {
            id: row.id
          }
        }}>
                  <div className='rounded-lg my-2 h-[32px] w-[32px] flex flex-col justify-center items-center border border-[#898989]'>
                    <MdOutlineVisibility className="text-[#898989] text-2xl" />

                  </div>
                  </Link>
                  <div className='rounded-lg my-2 h-[32px] w-[32px] flex flex-col justify-center items-center bg-[#FFE4E4] cursor-pointer' onClick={()=>{
                    setbranchid(row.id)
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

      <div className='flex items-end mt-5 justify-between'>
        <p className='font-normal text-xs '>Showing 1 to 10 of 30 entries</p>
        <div className='flex items-center gap-5'>
          <div className='flex items-center justify-center gap-2'>
            <p className='font-normal text-xs mt-3'>Show</p>
            <div className='mt-2.5 relative  '>
              <select
                className='block h-[40px] w-[48px] px-2 text-[#A3A3A3]  placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'

              >
                <option value="10" className='text-[#A3A3A3] '>
                  10
                </option>
                <option value="20" className='text-[#A3A3A3] '>
                  20
                </option>
                <option value="30" className='text-[#A3A3A3] '>
                  20
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <MdArrowDropDown />
              </div>



            </div>
            <p className='font-normal text-xs mt-3'>entries</p>
          </div>
          <div className="flex space-x-2 items-center mt-4">

            <button

              onClick={() => handlePageChange(currentPage - 1)}
            >
              <MdKeyboardArrowLeft className="text-2xl" />
            </button>


            {visiblePages.map((page) => (
              <button
                key={page}
                className={` w-[24px] h-[24px]  flex items-center justify-center rounded-md text-xs font-inter font-normal ${currentPage === page ? 'bg-primaryblue text-white' : 'text-[#A3A3A3] text-xs font-normal font-inter'}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}


            <button

              onClick={() => handlePageChange(currentPage + 1)}
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
