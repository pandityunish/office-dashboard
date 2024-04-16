'use client'

import axiosInstance from '@/modules/axios'
import DefaultButton from '@/modules/core-ui/Button'
import LoadingComponent from '@/modules/core-ui/LoadingComponent'
import { useUserData } from '@/modules/hooks/useUserData'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CiLock } from 'react-icons/ci'
import { MdOutlineDelete, MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { toast } from 'react-toastify'
import { FaMobileScreen } from "react-icons/fa6";
import { IoMdLaptop } from "react-icons/io";
import { getlogdevices } from '@/modules/data/notification_service'
import { MdOutlineGroups } from "react-icons/md";
import { useRouter } from 'next/navigation';


const Page = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [password, setPassword] = useState( '');
  const [oldpassword, setoldpassword] = useState("")
  const [isclicked, setisclicked] = useState(0)
const [isvisiable, setisvisiable] = useState(false)
const [getalldevices, setgetalldevices] = useState(null)
const [isChecked, setIsChecked] = useState(false);
const router=useRouter();
const handleToggle = () => {
  setIsChecked(!isChecked);
};
const extractDeviceDetails = (deviceType) => {
  const match = deviceType.match(/\(([^)]+)\)/);
  return match ? match[1] : 'Unknown';
};
const getDeviceOS = (deviceType) => {
  if (deviceType.includes('Windows')) {
    return 'Windows';
  } else if (deviceType.includes('Android')) {
    return 'Android';
  } else {
    return 'Unknown';
  }
};
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
  const [approveVisitorBeforeAccess, setApproveVisitorBeforeAccess] = useState(
    (user && user.approve_visitor_before_access) || false
  )

  const [checkInCheckOutFeature, setCheckInCheckOutFeature] = useState(
    (user && user.check_in_check_out_feature) || false
  )
  useEffect(() => {
    console.log(approveVisitorBeforeAccess, checkInCheckOutFeature);
    getlogdevices({toast:toast,setdevices:setgetalldevices})
  }, [approveVisitorBeforeAccess, checkInCheckOutFeature]);

  if (isUserLoading) return <LoadingComponent />


  const handleSettingChange = async (settingName, value) => {
    if (settingName === "approveVisitorBeforeAccess") {
      setApproveVisitorBeforeAccess(value);
    } else if (settingName === "checkInCheckOutFeature") {
      setCheckInCheckOutFeature(value);
    }

    try {
      const res = await axiosInstance.post(
        "/organization/settings/",
        {
          approve_visitor_before_access:
            settingName === "approveVisitorBeforeAccess"
              ? value
              : approveVisitorBeforeAccess,
          check_in_check_out_feature:
            settingName === "checkInCheckOutFeature"
              ? value
              : checkInCheckOutFeature,
        },
        {
          headers: {
            Authorization: `Bearer ${typeof window !== "undefined"
              ? localStorage?.getItem("access")
              : ""
              }`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Settings Updated");
      }
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };
const onSubmit=async()=>{
  try {
    
    const token=localStorage.getItem("access");
    const data={
      "old_password": oldpassword,
      "new_password": password
    }
  const response=await axiosInstance.patch("/user/change-password/",
  data,
  {headers:{
    "Authorization":`Bearer ${token}`
  },

},);
  // console.log(response)
  if(response.status==200){
   
     console.log(response.data);
     toast.success("Changed Successfully");
     router.push("/dash")
  } else{
    // toast.error("Something went wrong")
    // console.log(response)
  } 
} catch (error) {
    console.log(error)
    if(error.response.status===500 ||error.response.status===404){
      toast.error('Login Failed, Try Again')
    }else{
      if (error && Object.values(error?.response?.data || []).length >= 1) {
        Object.values(error?.response?.data).map(e =>
          toast.error(e)
        )
      } else {
        toast.error('Login Failed, Try Again')
      }
    }
}
}
  return (
    <div>
    <div className=' lg:w-[100%] w-[1367px] py-4 mx-auto bg-white shadow-lg p-7 pt-12 rounded-lg'>
      <h1 className='mb-4 text-2xl font-inter font-bold '>Setting</h1>
     <div className='flex gap-8 mt-6'>
      <div className='w-[180px] flex flex-col items-center justify-center cursor-pointer transition duration-1000 ease-in' onClick={()=>{
        setisclicked(0)
      }}>
      <h1 className={`${isclicked===0?"font-bold text-primaryblue":"font-normal"}  font-inter text-base transition duration-1000 ease-in`}>Change password</h1>
      {isclicked===0?<div className=' bg-primaryblue h-[2px] mt-2 w-full'></div>:<></>}  
      </div>
      <div className='w-[180px] flex flex-col items-center justify-center cursor-pointer transition duration-1000 ease-in' onClick={()=>{
        setisclicked(1)
      }}>
      <h1 className={`${isclicked===1?"font-bold text-primaryblue":"font-normal"}  font-inter text-base transition duration-1000 ease-in`}>Log Activity</h1>
    {isclicked===1?<div className=' bg-primaryblue h-[2px] mt-2 w-full'></div>:<></>}  
      </div>
      <div className='w-[180px] flex flex-col items-center justify-center cursor-pointer transition duration-1000 ease-in' onClick={()=>{
        setisclicked(2)
      }}>
      <h1 className={`${isclicked===2?"font-bold text-primaryblue":"font-normal"}  font-inter text-base transition duration-1000 ease-in`}>Other Settings</h1>
    {isclicked===2?<div className=' bg-primaryblue h-[2px] mt-2 w-full'></div>:<></>}  
      </div>
     </div>
      <div className='w-full bg-greyneutral h-[1px] mb-2'></div>

    {isclicked===0?<div className='flex gap-10 mt-8 mb-4'>
      <div>
                  <div className='flex items-center justify-between w-[600px]'>
                    <label
                      htmlFor='password'
                      className='text-sm font-normal text-[#A3A3A3]'
                    >
                      Old Password
                    </label>
                   
                  </div>
                  <div className='mt-2.5 relative'>
                  <CiLock  className={`absolute text-2xl left-4 ${errors.password?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />
                  <div onClick={()=>{
                    setisvisiable(!isvisiable)
                  }} className='cursor-pointer'>
                  {isvisiable===false?<MdOutlineVisibility  className={`absolute text-2xl right-4 ${errors.password?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`}/>:
                <MdOutlineVisibilityOff  className={`absolute text-2xl right-4 ${errors.password?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />
                }  
                  </div>
                
                    <input
                      type={`${isvisiable==false?"password":"text"}`}
                      {...register('oldpassword', {
                        value: oldpassword,
                        onChange: e => setoldpassword(e.target.value),
                        required: 'Password is required'
                      })}
                      placeholder='Input your old password'
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-xl  focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.password ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.oldpassword && (
                      <p className='mt-1 text-red-500'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className='flex items-center justify-between w-[600px]'>
                    <label
                      htmlFor='password'
                      className='text-sm font-normal text-[#A3A3A3]'
                    >
                      New Password
                    </label>
                   
                  </div>
                  <div className='mt-2.5 relative'>
                  <CiLock  className={`absolute text-2xl left-4 ${errors.password?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />
                  <div onClick={()=>{
                    setisvisiable(!isvisiable)
                  }} className='cursor-pointer'>
                  {isvisiable===false?<MdOutlineVisibility  className={`absolute text-2xl right-4 ${errors.password?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`}/>:
                <MdOutlineVisibilityOff  className={`absolute text-2xl right-4 ${errors.password?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />
                }  
                  </div>
                
                    <input
                      type={`${isvisiable==false?"password":"text"}`}
                      {...register('password', {
                        value: password,
                        onChange: e => setPassword(e.target.value),
                        required: 'Password is required'
                      })}
                      placeholder='Input your new password'
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-xl  focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.password ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.password && (
                      <p className='mt-1 text-red-500'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
      </div>:isclicked===1?<div className='flex flex-col mt-9'>
        {getalldevices===null?<></>:<>
        <div className='flex justify-between items-center'>
             <p className='pl-[55px] font-semibold font-inter text-sm'>Name</p>
             <p className='pl-[50px] font-semibold font-inter text-sm'>IP address</p>
             <p className=' font-semibold font-inter text-sm'>Date</p>
        </div>
        {getalldevices.sort((a, b) => new Date(b.create_at) - new Date(a.create_at)).map((e,i)=>{
          return <div className='flex justify-between py-2 items-center' key={i}>
          <div className='flex gap-2 items-center'>
          <div className='h-[48px] w-[48px] rounded-xl bg-[#E5F3FE] flex items-center justify-center'>
            {getDeviceOS(e.device_type)==="Android"?<FaMobileScreen className="text-2xl text-primaryblue"/>:<IoMdLaptop className="text-2xl text-primaryblue"/>}
          
          </div>
          <div className='flex flex-col'>
          <p className='font-bold text-sm font-inter'>{extractDeviceDetails (e.name_of_device)}</p>
          <p className='font-normal font-inter text-xs'>{getDeviceOS(e.device_type)}</p>
          </div>
          </div>
          <p className='font-normal font-inter text-xs'>{e.ip_address}</p>
          <div className='flex flex-col gap-2 items-center'>
            
            <p className='font-normal font-inter text-xs'>{convertDate(e.create_at)}</p>
           
          </div>
                  </div>
        })}
        </>}
        
      
        </div>:<div className='flex flex-col mt-9 h-[170px]'>
         <div className='flex w-[532px] justify-between items-center'>
         <div className='flex gap-5 items-center'>
<MdOutlineGroups className="text-2xl text-primaryblue"/>
<p className='font-semibold text-base'>Visitors Allowed</p>

          </div>
         <div>
          <p className='font-semibold text-sm pb-1'>off/on</p>
         <div
    className={`w-10 h-5 rounded-2xl flex items-center relative  cursor-pointer  ${
      isChecked ? 'bg-green-500' : 'bg-primaryblue'
    }`}
    onClick={handleToggle}
  >
    <div
      className={`w-4 h-4 rounded-full bg-white absolute transition-transform transform ${
        isChecked ? 'left-0' : 'right-0'
      } `}
    ></div>
  </div>
         </div>
         </div>
          </div>}  
    </div>
   {isclicked===0?<div className='w-[320px] mt-10' onClick={()=>{onSubmit()}}>
    <DefaultButton text="Change" />
    </div>:<></>} 
    </div>
  )
}

export default Page
