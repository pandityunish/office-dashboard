import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getwaitingvisitor } from '../data/dash_service';
import {toast} from 'react-toastify'
import Link from 'next/link';
import { approvethevisitor, unapprovethevisitor } from '../data/branch_service';
export default function VisitorWaiting() {
   const [currentPage, setCurrentPage] = useState(1);
   const showAdjacentPages = 2;
   const [waitingVisitor, setwaitingVisitor] = useState(null);
   const [search, setsearch] = useState("")
   useEffect(() => {
    getwaitingvisitor({toast:toast,searchtext:"",setwaitingvisitor:setwaitingVisitor})
   }, [])
   
   const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // You may also want to fetch data for the new page here
  };
  const pageNumbers = Array.from({ length: currentPage }, (_, index) => index + 1);
 
function formatTimestamp(timestamp) {
  const dateObject = new Date(timestamp);
  
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  
  return dateObject.toLocaleString('en-US', options);
}
const handlesearch=(e)=>{
  getwaitingvisitor({toast:toast,searchtext:e,setwaitingvisitor:setwaitingVisitor})

}
const visiblePages = pageNumbers.slice(
  Math.max(currentPage - showAdjacentPages, 0),
  Math.min(currentPage + showAdjacentPages + 1, currentPage)
);
  return (
    <div className='lg:w-[67%] w-[630px] h-[428px] rounded-xl flex flex-col justify-between p-7 shadow-3xl bg-white font-inter'>
      <div>

      
     <div className='flex justify-between'>
     <h1 className='font-bold text-2xl leading-9 '>Waiting Visitor’s</h1>
     <div className='relative'>
    <input type="text" className='border  border-[#898989] p-4 rounded-xl h-[45px] w-[333px]  focus:outline-none pl-10' placeholder='Search here...'
     onChange={(e)=>{
handlesearch(e.target.value)
    }}/>
    <IoSearchSharp className="absolute text-xl left-3 top-1/2  transform -translate-y-1/2 text-gray-400"/>
    </div>
     </div>
     {waitingVisitor===null?<div>
      <div className='flex flex-col h-full font-bold text-sm leading-5  items-center justify-center'>
  <p>Loading</p>
  </div>
     </div> :<>
     {waitingVisitor.results.length<=0?<div className='flex flex-col h-full font-bold text-sm leading-5  items-center justify-center'>
  <p>No Visitors</p>
  </div>:<>
     <table className="min-w-full divide-y divide-gray-300 ">
      <thead>
        <tr>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">SN</th>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Visitors</th>
          <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">Datetime</th>
          <th className="py-3 px-2 pl-[75px] text-start font-bold text-xs font-inter text-[#A3A3A3]">Actions</th>
        </tr>
      </thead>
      <tbody className='py-20'>
        {waitingVisitor.results.sort((a, b) => new Date(b.visited_at) - new Date(a.visited_at)).slice(0,5).map((row, index) => (
          <tr key={index}>
            <td className="py-2 px-2 font-bold text-xs font-inter">{index+1}</td>
            <td className="py-2 px-2 font-bold text-xs font-inter">{row.full_name}</td>
            <td className="py-2 px-2 font-normal text-xs font-inter">{ formatTimestamp(row.visited_at)}</td>
            <td className="py-2 px-2 ">
              <div className='flex gap-3 items-end justify-end'>
<Link href={{
          pathname: "/visitor-details",
          query: {
            id: row.id
          }}}> <div className='rounded-lg h-[32px] w-[32px] flex cursor-pointer flex-col justify-center items-center border border-[#898989]'>
<MdOutlineVisibility className="text-[#898989] text-2xl"/>
</div></Link>
<div className='rounded-lg h-[32px] w-[32px] cursor-pointer flex flex-col justify-center items-center   bg-[#D9FFF4]' onClick={()=>{
  approvethevisitor({toast:toast,id:row.id});
  getwaitingvisitor({toast:toast,searchtext:"",setwaitingvisitor:setwaitingVisitor})
}}>
<MdOutlineDone className="text-[#0FBC88] text-2xl"/>
</div>
<div className='rounded-lg h-[32px] w-[32px] flex flex-col cursor-pointer justify-center items-center  bg-[#FFE4E4]' onClick={()=>{
  unapprovethevisitor({toast:toast,id:row.id})
}}>
<RxCross2 className="text-[#FF3A3A] text-2xl"/>
</div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
     </>}
     </>}
     
     </div>
     {waitingVisitor===null?<></>:
    <div className='flex items-end mt-5 justify-end'>
  {waitingVisitor.next===null && waitingVisitor.previous===null?<></>:  <div className="flex space-x-2 ">
   
        <button
          
          onClick={() => {
            if(waitingVisitor.previous===null){

            }else{
              handlePageChange(currentPage - 1)
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
         
          onClick={() => {
            if(waitingVisitor.next===null){

            }else{
              handlePageChange(currentPage + 1)
            }
            
          }}
        >
          <MdKeyboardArrowRight className="text-2xl"/>
        </button>
        
    </div>}
    
    </div>}
    
    </div>
  )
}
