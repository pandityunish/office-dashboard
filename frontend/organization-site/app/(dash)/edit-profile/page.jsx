"use client"

import AdsComponent from "@/modules/dash-component/AdsComponent"
import QrComponent from "@/modules/dash-component/QrComponent"
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline, IoPersonOutline } from "react-icons/io5";
import { MdLocationOn, MdLocationSearching, MdOutlineLocalPhone, MdPanoramaWideAngle, MdShareLocation } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CgOrganisation } from "react-icons/cg";
import LineComponent from "@/modules/kyc-component/LineComponent";
import { MdAppRegistration } from "react-icons/md";
import { PiBagLight } from "react-icons/pi";
import { CiFlag1 } from "react-icons/ci";
import { TbArrowBigRight } from "react-icons/tb";
import { TiLocationArrowOutline } from "react-icons/ti";
import { MdOutlineDelete } from "react-icons/md";
import { FaMobileScreen } from "react-icons/fa6";

import Image from "next/image";
import { useUserData } from "@/modules/hooks/useUserData";
import { getorgprofile } from "@/modules/data/profile_service";
import { toast } from "react-toastify";
import { baseurl } from "@/modules/apiurl";
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { LuUpload } from "react-icons/lu";
import axiosInstance from "@/modules/axios";

export default function Profile() {
    const [viewkyc, setviewkyc] = useState(false);
    const {register, handleSubmit, control, reset, formState: { errors } }
    = useForm();
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
const [open, setopen] = useState(false);
const handleClose=()=>{
    setopen(false);
}
const fileInputRef = useRef(null);
const [selectedImage, setSelectedImage] = useState("");
const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
const onsubmit=async()=>{
  const token=localStorage.getItem("access");
      const formData = new FormData()
      // formData.append('logo',selectedImage,selectedImage.name);
      formData.append("logo",selectedImage)
    const response=await axiosInstance.put(`/organization/${kycorg.results[0].id}/logo/update`,
    formData,
    {
      
      headers:{
        'content-type': 'multipart/form-data',
      "Authorization":`Bearer ${token}`
    },});
    if(response.status==200){
      // setprofile(response.data);
      toast.success("Update successfully");
      handleClose();
    } else{
      // toast.error("Something went wrong")
      // console.log(response)
    } 
}
  const handleImageClick = () => {
    // Trigger the hidden file input when the image is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }else{
   
    }
  };
  return (
    <div>
         <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: '5%', padding: '20px', height:"333px", width:"440px"} }}>
  
  <DialogContent>
    <div className="flex flex-col items-center justify-center">
    <div className='flex flex-col mt-6'>
    <input
type="file"
accept="image/*"
onChange={handleImageChange}
style={{ display: 'none' }}
ref={fileInputRef}
/>
{selectedImage===null ?<>
<div className='w-[370px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
<LuUpload className="text-base text-[#A3A3A3]"/>
<p className='text-base font-normal leading-6 text-[#A3A3A3]'>Drag & drop file or <span className='text-primaryblue cursor-pointer' onClick={handleImageClick}>Browse</span></p>
</div>
</>:<>
{selectedImage?<div className='w-[370px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
<Image src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
alt="Selected" className='object-contain h-[100px]' onClick={handleImageClick} width={150} height={150}/>
</div>:<>
<div className='w-[370px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
<LuUpload className="text-base text-[#A3A3A3]"/>
<p className='text-base font-normal leading-6 text-[#A3A3A3]'>Drag & drop file or <span className='text-primaryblue cursor-pointer' onClick={handleImageClick}>Browse</span></p>
</div>
</>}

</>}

    </div>
    </div>
   <div className="flex justify-center items-center gap-14 mt-6">
   <button
   onClick={onsubmit}
                  type='submit'
                  className='inline-flex h-[53px] w-[152px] items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                Update 
                </button>
                <p className="text-base font-medium font-inter cursor-pointer" onClick={()=>handleClose()}> Cancel</p>
   </div>
  </DialogContent>
 
</Dialog>
         {user===null|| isUserLoading || kycorg===null?<></>: 
   <div className="flex justify-between">
  <section className="lg:w-[73%] w-[948px] ">
 <div className=" w-full rounded-xl bg-white shadow-lg mt-3 pb-10">
<div className="bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] h-[90px] w-full rounded-t-xl">


</div>
<div className="flex     px-10 gap-6">
<div className="flex  gap-6">
<div className="w-[181px] h-[181px] flex items-center justify-center rounded-xl bg-[#F1FBFF] -mt-10">
  {selectedImage?<Image src={URL.createObjectURL(selectedImage)} alt="some" className="object-cover" height={100} width={100}/>:<Image src={kycorg===null?"/user-avatar.png":`${baseurl}${kycorg.results[0].logo}`} alt="some" className="object-cover" height={100} width={100}/>
}
</div>

</div>
<div className="flex flex-col gap-5 mt-4">
<div className="flex  gap-1 items-center cursor-pointer rounded-xl text-white justify-center w-[171px] h-[48px] bg-primaryblue" onClick={()=>{
    setopen(!open);
}}>
  <MdEdit className="text-2xl"/>
  <p className="font-normal font-inter text-base">Update Photo</p>
</div>
<div className="flex  gap-1 items-center rounded-xl text-primaryblue justify-center w-[171px] h-[48px] border border-primaryblue">
  <MdOutlineDelete className="text-2xl"/>
  <p className="font-normal font-inter text-base">Delete Photo</p>
</div>

</div>

</div>
<div className='grid lg:grid-cols-2 grid-cols-1 gap-10 p-10'>
<div className='w-[400px] '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Office Name
                    </label>
                    <div className='mt-[8px] relative'>
                      <IoPersonOutline className={`absolute text-2xl left-4 ${errors.office_name ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                       value={user.organization_name}
                        placeholder='Input full name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.office_name ? 'border-red-500' : ''
                          }`}
                        {...register('office_name', { required: true })}
                      />
                      {errors.office_name && (
                        <span className='text-red-500'>
                          Full Name is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[400px] '>
                    <label
                      htmlFor='est'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Establishment Year
                    </label>
                    <div className='mt-[8px] relative'>
                      <CiCalendar className={`absolute text-2xl left-4 ${errors.office_name ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                       value={kycorg.results[0].establishment_year}
                        placeholder='Input full name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.office_name ? 'border-red-500' : ''
                          }`}
                        {...register('est', { required: true })}
                      />
                      {errors.est && (
                        <span className='text-red-500'>
                          Establishment Year is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[400px] '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                     Mobile Number
                    </label>
                    <div className='mt-[8px] relative'>
                      <FaMobileScreen className={`absolute text-2xl left-4 ${errors.office_name ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                       value={user.mobile_number}
                        placeholder='Input full name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.office_name ? 'border-red-500' : ''
                          }`}
                        {...register('mobile_number', { required: true })}
                      />
                      {errors.mobile_number && (
                        <span className='text-red-500'>
                          Establishment Year is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[400px] '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Email address
                    </label>
                    <div className='mt-[8px] relative'>
                      <CiMail className={`absolute text-2xl left-4 ${errors.office_name ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                       value={user.email}
                        placeholder='Input full name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.office_name ? 'border-red-500' : ''
                          }`}
                        {...register('email', { required: true })}
                      />
                      {errors.email && (
                        <span className='text-red-500'>
                          Establishment Year is required
                        </span>
                      )}
                    </div>
                  </div>
</div>

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




