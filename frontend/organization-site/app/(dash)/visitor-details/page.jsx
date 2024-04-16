'use client'

import LineComponent from "@/modules/kyc-component/LineComponent"
import { MdOutlinePerson } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { FaMobileScreen } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { TbLocation } from "react-icons/tb";
import { MdOutlineRectangle } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { CiShare2 } from "react-icons/ci";
import AdsComponent from "@/modules/dash-component/AdsComponent";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getorgvisitordetails } from "@/modules/data/branch_service";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { baseurl } from "@/modules/apiurl";

export default function VisitorDetails() {
  const data=useSearchParams();
  const [visitordetails, setvisitordetails] = useState(null);
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
    getorgvisitordetails({toast:toast,setvisitordetails:setvisitordetails,id:data.get("id")})
  }, [data])
  return (
    <div className="flex justify-between w-[100%] gap-3">
<section className='lg:w-[70%] w-[948px]'>
  {visitordetails===null?<></>:<>
  <div className="flex flex-col  bg-white p-8 shadow-md rounded-md">
<p className="font-bold text-2xl font-inter">Visitor Details</p>
<div className="flex gap-12 mt-6">
<div className="mt-6 space-y-4">
<LineComponent Icon={MdOutlinePerson} subtext={visitordetails.full_name} text="Visitor Name"/>
<LineComponent Icon={CiCalendar} subtext={formatTimestamp(visitordetails.visited_at)} text="Visited date"/>
<LineComponent Icon={FaMobileScreen} subtext={visitordetails.mobile_number} text="Mobile No."/>
<LineComponent Icon={CiMail} subtext={visitordetails.email} text="Email Address"/>
<LineComponent Icon={MdOutlineRectangle} subtext={visitordetails.number_of_team} text="Number of visitor"/>

</div>
<div className="mt-6 space-y-4">
<LineComponent Icon={TbLocation} subtext={visitordetails.visiting_from} text="Address"/>
<LineComponent Icon={MdOutlineRectangle} subtext={visitordetails.id_number} text="ID Number"/>
<LineComponent Icon={MdOutlineRectangle} subtext={visitordetails.type_of_id} text="ID Type"/>
<LineComponent Icon={MdOutlineRectangle} subtext={visitordetails.purpose} text="Purpose"/>
<LineComponent Icon={MdOutlineRectangle} subtext={visitordetails.vehicle_number} text="Vehicle Number"/>
</div>
</div>
<div>
<p className="font-bold text-2xl font-inter mt-8">Photo</p>

<Image src={visitordetails.photo===null?"/user-avatar.png":`${baseurl}${visitordetails.photo}`} alt="" className="object-cover h-[110px] w-[110px] rounded-xl mt-3" width={150} height={44}/>
<p className="font-bold font-inter text-sm text-greyneutral mt-2">Person Photo</p>

</div>
</div>
  </>}

<div className="flex gap-4 mt-5 ">
<button className='bg-white gap-3  border flex items-center justify-center border-primaryblue rounded-xl mt-4 w-[211px] h-[48px] text-primaryblue'
         
          >
            Download Details <GoDownload className="text-2xl"/>
          </button>
          <button className='bg-white gap-3  border flex items-center justify-center border-primaryblue rounded-xl mt-4 w-[182px] h-[48px] text-primaryblue'
         
          >
            Share Details <CiShare2 className="text-2xl"/>
          </button>
</div>
</section>
<section className="w-[28%]">
    <AdsComponent/>
</section>
    </div>
  )
}
