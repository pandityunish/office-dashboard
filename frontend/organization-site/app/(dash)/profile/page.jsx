"use client"

import AdsComponent from "@/modules/dash-component/AdsComponent"
import QrComponent from "@/modules/dash-component/QrComponent"
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocationOn, MdLocationSearching, MdOutlineLocalPhone, MdPanoramaWideAngle, MdShareLocation } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CgOrganisation } from "react-icons/cg";
import LineComponent from "@/modules/kyc-component/LineComponent";
import { MdAppRegistration } from "react-icons/md";
import { PiBagLight } from "react-icons/pi";
import { CiFlag1 } from "react-icons/ci";
import { TbArrowBigRight } from "react-icons/tb";
import { TiLocationArrowOutline } from "react-icons/ti";
import Image from "next/image";
import { useUserData } from "@/modules/hooks/useUserData";
import { getorgprofile } from "@/modules/data/profile_service";
import { toast } from "react-toastify";
import { baseurl } from "@/modules/apiurl";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { MdPhoneAndroid } from "react-icons/md";
import { FaWordpress } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

import { useRouter } from "next/navigation";
export default function Profile() {
  const router=useRouter();
    const [viewkyc, setviewkyc] = useState(false);
    const {
      data: user,
      isLoading: isUserLoading,
      isError: isUserError
    } = useUserData();
    const [kycorg, setkycorg] = useState(null);
    useEffect(() => {
      if(user===null|| isUserLoading){

      }else{
        getorgprofile({toast:toast,setorgkyc:setkycorg,id:user.id})

      }
    }, [user])
    
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
  return (
    <div>
         {user===null|| isUserLoading?<></>: 
   <div className="flex justify-between">
  <section className="lg:w-[73%] w-[948px] ">
 <div className=" w-full rounded-xl bg-white shadow-lg mt-3 pb-10">
<div className="bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] h-[90px] w-full rounded-t-xl">


</div>
<div className="flex    justify-between px-10">
<div className="flex  gap-6">
<div className="w-[181px] h-[181px] flex items-center justify-center rounded-xl bg-[#F1FBFF] -mt-10">
<Image src={kycorg===null || kycorg.results.length===0?"/user-avatar.png":`${baseurl}${kycorg.results[0].logo}`} alt="some" className="object-cover" height={100} width={100}/>
</div>
<div className="flex flex-col mt-4 gap-1">
    <div className="flex gap-2 items-center">
    <p className="font-inter font-normal text-2xl">{user?.full_name}</p>
    {user.is_kyc_verified===true?<Image src="/verify.png" alt="" className="h-5" width={20} height={20}/>:<></>}
    

    </div>
<div className="flex gap-2">
<CiCalendar className="text-[#A3A3A3]"/>
<p className="text-sm font-normal text-[#898989] font-inter">{convertDate(user?.otp_created_at)}</p>
</div>
<div className="flex gap-2">
<IoLocationOutline className="text-[#A3A3A3]"/>
<p className="text-sm font-normal text-[#898989] font-inter">{user?.address===null?"":user?.address}</p>
</div>
<div className="flex gap-2">
<MdOutlineLocalPhone className="text-[#A3A3A3]"/>
<p className="text-sm font-normal text-[#898989] font-inter">{user?.mobile_number}</p>
</div>
<div className="flex gap-2">
<CiMail className="text-[#A3A3A3]"/>
<p className="text-sm font-normal text-[#898989] font-inter">{user?.email}</p>
</div>
</div>
</div>
<div className="flex flex-col justify-between mt-4">
<div className="flex  gap-1 cursor-pointer items-center rounded-xl text-white justify-center w-[159px] h-[48px] bg-primaryblue" onClick={()=>{
  if(kycorg.results.length>=1){
    router.push("/edit-profile")
  }
 
}}>
  <MdEdit className="text-lg"/>
  <p className="font-normal font-inter text-base">Edit Profile</p>
</div>
{kycorg===null|| kycorg.results.length===0?<></>:<>
{viewkyc===false?<p className="text-sm font-normal font-inter text-end  text-primaryblue cursor-pointer" onClick={()=>{
    setviewkyc(true)
}}>View Kyc</p>:<></>} 
</>}

</div>

</div>
{viewkyc===true?<div className=" w-full mt-8 px-10">
<div className="flex w-full items-center gap-2 justify-between ">
<div className="bg-[#F4F4F4] h-[1px] w-[88%]">

</div>
<div className="flex  items-center cursor-pointer" onClick={()=>{
    setviewkyc(false)
}} >
<RxCross2 className="text-[15px]"/>
<p className="font-normal text-sm">Hide kyc</p>
</div>
</div>
<div className="flex justify-between mt-8">
<div className="flex flex-col">
<p className="font-bold text-2xl font-inter">Personal Information</p>
<div className="mt-6 space-y-4">
<LineComponent Icon={CgOrganisation} subtext={user.organization_name} text="Organization Name"/>
<LineComponent Icon={CiCalendar} subtext={kycorg.results[0].establishment_year} text="Established year"/>
<LineComponent Icon={MdAppRegistration} subtext={kycorg.results[0].registration_number} text="Registration number"/>
<LineComponent Icon={MdPanoramaWideAngle} subtext={kycorg.results[0].pan_number} text="PAN / VAT number"/>
<LineComponent Icon={PiBagLight} subtext={user.organization_type} text="Organization type"/>

</div>
</div>
<div className="flex flex-col">
<p className="font-bold text-2xl font-inter">Address</p>
<div className="mt-6 space-y-4">
<LineComponent Icon={CiFlag1} subtext={kycorg.results[0].country} text="Country"/>
<LineComponent Icon={MdLocationSearching} subtext={kycorg.results[0].state} text="State / Province"/>
<LineComponent Icon={MdShareLocation} subtext={kycorg.results[0].district} text="District"/>
<div className="flex gap-0 items-center">
  <MdLocationOn className="text-xl text-[#898989]"/>
  <p className="font-bold text-base font-inter text-[#898989]">Municipality / Rural Municipality:</p>
  <p className="font-normal text-base font-inter text-[#898989]">{kycorg.results[0].municipality.slice(0,8)}...</p>
  
      </div>
{/* <LineComponent Icon={MdLocationOn} subtext={kycorg.municipality} text="Municipality / Rural Municipality"/> */}
<LineComponent Icon={TbArrowBigRight} subtext={kycorg.results[0].ward_no} text="Ward"/>
<LineComponent Icon={TiLocationArrowOutline} subtext={kycorg.results[0].city_village_area} text="Address"/>

</div>
</div>
</div>
<div className="flex justify-between mt-9">
<div className="flex flex-col">
<p className="font-bold text-2xl font-inter">Contact</p>
<div className="mt-6 space-y-4">
<LineComponent Icon={MdOutlinePerson} subtext={kycorg.results[0].contact_person_full_name} text="Contact Person"/>
<LineComponent Icon={MdOutlineLocalPhone } subtext={kycorg.results[0].telephone_number} text="Telephone No."/>
<LineComponent Icon={MdPhoneAndroid } subtext={kycorg.results[0].telephone_number} text="Mobile No"/>
<LineComponent Icon={FaWhatsapp} subtext={kycorg.results[0].whatsapp_viber_number} text="WhatsApp / Viber"/>
<LineComponent Icon={MdOutlineLocalPhone} subtext={kycorg.results[0].secondary_number} text="Alternative Contact No."/>
<LineComponent Icon={CiMail} subtext={user.email} text="Email Address"/>

<LineComponent Icon={FaWordpress } subtext={kycorg.results[0].website} text="Website"/>
<LineComponent Icon={FaFacebook } subtext={kycorg.results[0].social_media_links[0].link} text="Social Media Link"/>


</div>
</div>
<div className="flex flex-col w-[40%]">
<p className="font-bold text-2xl font-inter">Document</p>

<div className="flex flex-col">
<Image src={`${baseurl}${kycorg.results[0].registration_certificate}`} width={150} height={150} alt="" className="object-contain my-2 h-[150px]"/>
<p className="font-bold text-sm text-[#898989]">Registration Certificate</p>
</div>
</div>
</div>
</div>:<></>}

</div>
  </section>
  <section className='flex m-2 flex-col lg:w-[25%] w-[388px]'>
          <QrComponent/>
           
           <AdsComponent/>
      
             
              
            </section>
    </div>}
    </div>
  )
}




