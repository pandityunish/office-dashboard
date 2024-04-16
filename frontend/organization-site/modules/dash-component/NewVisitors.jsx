import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { MdOutlineVisibility } from "react-icons/md";

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDownload } from 'react-icons/go';
import { downloadvisitor, getnewvisitor, getnextperviousvisitor } from '../data/dash_service';
import { toast } from 'react-toastify';
import { useUserData } from '../hooks/useUserData';
import Link from 'next/link';
export default function NewVisitors() {
    const [currentPage, setCurrentPage] = useState(1);
    const showAdjacentPages = 2;
    const [newvisitors, setnewvisitors] = useState(null);
    const [setdata, setsetdata] = useState(null)
  
    useEffect(() => {
      getnewvisitor({toast:toast,searchtext:"",setvisitor:setnewvisitors})
    }, [])
    
    const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber);
     // You may also want to fetch data for the new page here
   };
   const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
   const handlesearch=(e)=>{
    getnewvisitor({toast:toast,searchtext:e,setvisitor:setnewvisitors})
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
  return (
    <div className='lg:w-full w-[958px] h-[438.25px]  mt-10 rounded-xl p-7  shadow-3xl bg-white font-inter'>
 {newvisitors===null?<></>:     <div className='flex h-full flex-col justify-between'>

      
      <div>

      
     <div className='flex justify-between'>
     <h1 className='font-bold text-2xl leading-9 '>New Visitor</h1>
     <div className='flex gap-2 items-center'>
     <div className='relative'>
    <input type="text" className='border  border-[#898989] p-4 rounded-xl h-[45px] w-[333px]  focus:outline-none pl-10' placeholder='Search here...' onChange={(e)=>{
      handlesearch(e.target.value)
    }}/>
    <IoSearchSharp className="absolute text-xl left-3 top-1/2  transform -translate-y-1/2 text-gray-400"/>
    </div>
    <div className='flex gap-2 cursor-pointer'>
        <p className='font-bold font-inter text-xs ' onClick={()=>{
          downloadvisitor({toast:toast,setdata:setsetdata,id:user.id})
        }}>Download PDF</p>
        <GoDownload className="text-sm"/>
    </div>
     </div>
     </div>
     {newvisitors.results.length===0?<div className='flex flex-col mt-5 h-full font-bold text-sm leading-5  items-center justify-center'>
  <p>No Data</p>
  </div>:<>
     <table className="min-w-full divide-y divide-gray-300 ">
      <thead>
        <tr>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">SN</th>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Date/Time</th>
          <th className="py-3 px-2 pl-4 text-start font-bold text-xs font-inter text-[#A3A3A3]">Name</th>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Address</th>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Mobile No.</th>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Email address</th>
       
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Purpose</th>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]"></th>
        </tr>
      </thead>
      <tbody className='py-20'>
        
        {newvisitors.results.sort((a, b) => new Date(b.visited_at) - new Date(a.visited_at)).slice(0,5).map((row, index) => (
          <tr key={index}>
            <td className="py-2 px-2 font-semibold text-xs font-inter text-greyScale">{index+1}</td>
            <td className="py-2 px-2 font-semibold text-xs font-inter w-[125px] text-greyScale">{convertDate(row.visited_at)}</td>
            <td className="py-2 px-2 pl-4 font-semibold text-xs font-inter text-greyScale">{row.full_name}</td>
            <td className="py-2 px-2 font-semibold text-xs font-inter text-greyScale">{row?.visiting_from}</td>
            <td className="py-2 px-2 font-semibold text-xs font-inter text-greyScale">{row?.mobile_number}</td>
            <td className="py-2 px-2 font-semibold text-xs font-inter text-greyScale">
                <div className='flex gap-4 items-center'>
                {row?.email}
           
                </div>
            </td>
         
            <td className="py-2 px-2 font-semibold text-xs font-inter">{row.purpose}</td>
            <td>   <Link href={{
          pathname: "/visitor-details",
          query: {
            id: row.id
          }}}>  <div className='rounded-lg my-2 h-[32px] w-[32px] flex flex-col justify-center items-center border border-[#898989]'>
<MdOutlineVisibility className="text-[#898989] text-2xl"/>
</div></Link></td>
          </tr>
        ))}
      </tbody>
    </table>
     </>}
     </div>
    <div className='flex items-end mt-5 justify-end'>
   {newvisitors.previous===null && newvisitors.next===null?<></>: <div className="flex space-x-2 ">
   
        <button
          onClick={() => {
            if(newvisitors.previous===null){

            }else{
              handlePageChange(currentPage - 1)
              getnextperviousvisitor({toast:toast,setvisitor:setnewvisitors,nexturl:newvisitors.previous})
            }
            
          }}
        >
       <MdKeyboardArrowLeft className="text-2xl"/>
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
         
          onClick={() =>{
            if(newvisitors.next===null){

            }else{
              getnextperviousvisitor({toast:toast,setvisitor:setnewvisitors,nexturl:newvisitors.next})
            handlePageChange(currentPage + 1)}
          }}
        >
          <MdKeyboardArrowRight className="text-2xl"/>
        </button>
     
    </div>}
    </div>
    </div>}
    </div>
  )
}
