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
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { baseurl } from "@/modules/apiurl";
import { getsubadmindetails } from "@/modules/data/branch_service";

export default function DetailsDetails() {
  const data=useSearchParams();
  const [subadmindetails, setsubadmindetails] = useState(null);
  const convertDate = (dateString) => {
    const date = new Date(dateString);
  
    const formattedDate = date.toLocaleString('en-US', {
      
      year: 'numeric',
     
   
    });
  
    return formattedDate;
  };
  useEffect(() => {
    getsubadmindetails({toast:toast,setsubadmin:setsubadmindetails,id:data.get("id")})
  }, [data])
  return (
    <div className="flex justify-between w-[100%] gap-3">
<section className='lg:w-[70%] w-[948px]'>
  {subadmindetails===null?<></>:<>
  <div className="flex flex-col  bg-white p-8 shadow-md rounded-md">
<p className="font-bold text-2xl font-inter">Sub admin Details</p>
<div className="flex gap-12 mt-6">
<div className="mt-6 space-y-4">
<LineComponent Icon={MdOutlinePerson} subtext={subadmindetails.full_name} text="Visitor Name"/>
{/* <LineComponent Icon={CiCalendar} subtext={convertDate(subadmindetails.visited_at)} text="Visited date"/> */}
<LineComponent Icon={FaMobileScreen} subtext={subadmindetails.mobile_number} text="Mobile No."/>
<LineComponent Icon={CiMail} subtext={subadmindetails.email} text="Email Address"/>

</div>
<div className="mt-6 space-y-4">
<LineComponent Icon={TbLocation} subtext={subadmindetails.address} text="Address"/>
<LineComponent Icon={MdOutlineRectangle} subtext={subadmindetails.role} text="Role"/>


</div>
</div>
{/* <div>
<p className="font-bold text-2xl font-inter mt-8">Photo</p>

<Image src={subadmindetails.photo===null?"/user-avatar.png":`${baseurl}${subadmindetails.photo}`} alt="" className="object-cover h-[110px] w-[110px] rounded-xl mt-3" width={150} height={44}/>
<p className="font-bold font-inter text-sm text-greyneutral mt-2">Person Photo</p>

</div> */}
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
