'use client'

import LineComponent from "@/modules/kyc-component/LineComponent"
import { MdLocationOn, MdLocationSearching, MdOutlinePerson, MdShareLocation } from "react-icons/md";
import { CiCalendar, CiFlag1, CiShare2 } from "react-icons/ci";
import { FaMobileScreen } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { TbArrowBigRight, TbLocation, TbTopologyStar } from "react-icons/tb";
import { GoDownload } from "react-icons/go";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getorgbranchdetails } from "@/modules/data/branch_service";
import { toast } from "react-toastify";
import { BsPerson } from "react-icons/bs";
import { baseurl } from "@/modules/apiurl";
import { saveAs } from 'file-saver'
import { downloadImage } from "@/modules/data/dash_service";
import ShareDialog from "@/modules/organization/ShareDialog";

export default function BranchDetails() {
  const data=useSearchParams();
  console.log(data.get('id'))
  const [open, setopen] = useState(false)
  const handleClose=()=>{
    setopen(false)
   }
  const [getbranchdetail, setgetbranchdetails] = useState(null);
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

  useEffect(() => {
    getorgbranchdetails({toast:toast,setbranchesdetails:setgetbranchdetails,id:data.get("id")})
  }, [data])
  
  return (
    <>
   {getbranchdetail===null?<>
   </>: <div className="flex justify-between w-[100%]">
   <ShareDialog handleClose={handleClose} open={open} url={`${baseurl}${getbranchdetail.qr_image}`}/>
   <div className="flex flex-col lg:w-[70%] w-[1100px] bg-white p-8 shadow-md rounded-md">
   <p className="font-bold text-2xl font-inter">{getbranchdetail.district} Branch</p>
   <div className="flex gap-16 mt-6">
   <div className="mt-6 space-y-4">
   <LineComponent Icon={TbTopologyStar} subtext={getbranchdetail.name} text="Branch Name"/>
   <LineComponent Icon={CiCalendar} subtext={formatTimestamp(getbranchdetail.created_at)} text="Created At"/>
   <LineComponent Icon={BsPerson} subtext={getbranchdetail.contact_person} text="Contact Person"/>
   <LineComponent Icon={FaMobileScreen} subtext={getbranchdetail.branch_no} text="Branch Contact No."/>
   
   <div className=" ">
   <div className="flex gap-2 items-center">
  <CiMail className="text-xl text-[#898989] "/>
  <p className="font-bold text-base font-inter text-[#898989] w-[120px]">Email Address:</p>
  <p className="font-normal text-base font-inter text-[#898989]">{getbranchdetail.email}</p>
  
      </div>
   </div>
   
   </div>
   <div className="mt-6 space-y-4">
   <LineComponent Icon={CiFlag1} subtext={getbranchdetail.country} text="Country"/>
   <LineComponent Icon={MdLocationSearching} subtext={getbranchdetail.state} text="State/Province"/>
   <LineComponent Icon={MdShareLocation} subtext={getbranchdetail.district} text="District"/>
   <div className="flex gap-2 items-center">
  <MdLocationOn className="text-xl text-[#898989] "/>
  <p className="font-bold text-base font-inter text-[#898989] w-[270px]">Municipality / Rural Municipality:</p>
  <p className="font-normal text-base font-inter text-[#898989]">{getbranchdetail.municipality.split(' ')[0]}</p>
  
      </div>
   {/* <LineComponent Icon={MdLocationOn} subtext={getbranchdetail.municipality.split(' ')[0]} text="Municipality / Rural Municipality"/> */}
   <LineComponent Icon={TbArrowBigRight} subtext={getbranchdetail.ward_no} text="Ward"/>
   <LineComponent Icon={TbLocation} subtext={getbranchdetail.city_village_area} text="Address"/>
   
   
   </div>
   </div>
   
   </div>
   
   
  
   <div className="lg:w-[28%]">
            <div className=' w-full shadow-lg bg-white rounded-lg h-[599px] flex items-center justify-center flex-col p-4'>
              <Image src={`${baseurl}/media/logo/epass.png`} alt="" className='h-14 ' width={150} height={44}/>
              <div className=" text-center   border-[#197abe] w-[240px] mt-9 h-[302px] border-[8px] rounded-2xl p-4  ">
               <p className=" font-bold  text-black text-2xl font-inter">Scan the QR</p>
               <div>
               <Image   
                   src={
                 `${baseurl}${getbranchdetail.qr_image}`
                   }
                   alt="soemt"
                   height={180}
                   width={180}/>
               </div>
              
               <div className="terminal-no text-center mt-35px text-black">
                 <p className=" text-black text-base font-inter ">Terminal No.</p>
                 <p className="terminal-number font-bold text-black mt-12px text-base font-inter">{getbranchdetail.id}</p>
               </div>
   
             </div>
             <p className='font-bold text-3xl font-inter mt-4 text-center'>{getbranchdetail.district} Branch</p>
             <p className="font-normal text-base font-inter mt-2">{getbranchdetail.district},{getbranchdetail.country}</p>
             <div className="flex gap-2">
             <button className='bg-white gap-3  border flex items-center justify-center border-primaryblue rounded-xl mt-4 w-[182px] h-[48px] text-primaryblue'
           //   onClick={()=>{downloadImage({imageUrl:`https://api.epass.com.np${user?.qr}`})}}
           onClick={()=>{
            // saveAs(`${baseurl}${getbranchdetail.qr_image}`)
            downloadImage(`${baseurl}${getbranchdetail.qr_image}`)
           }}
             >
               Download QR <GoDownload className="text-2xl"/>
             </button>
             <button className='bg-white gap-3  border flex items-center justify-center border-primaryblue rounded-xl mt-4 w-[148px] h-[48px] text-primaryblue'
             onClick={()=>{
              setopen(true)
             }}
           //   onClick={()=>{downloadImage({imageUrl:`https://api.epass.com.np${user?.qr}`})}}
             >
               Share QR <CiShare2 className="text-2xl"/>
             </button>
             </div>
              </div>
       </div>
   
       </div>} 
       </>
  )
}
