"use client"

import axiosInstance from "@/modules/axios";
import DefaultButton from "@/modules/core-ui/Button";
import { useUserData } from "@/modules/hooks/useUserData";
import RadioButton from "@/modules/kyc-component/RadioButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiLock, CiMail } from "react-icons/ci";
import { FaMobileAlt } from "react-icons/fa";
import { IoLocationOutline, IoPersonOutline } from "react-icons/io5"
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Subadmin() {
  const router=useRouter();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
 const [allitems, setallitems] = useState([])
  const additem=(newItem)=>{
    if (allitems.includes(newItem)) {
      
      const updatedList = allitems.filter((item) => item !== newItem);
      setallitems(updatedList);
      console.log(allitems);
    } else {
      setallitems([...allitems, newItem]);
      console.log(allitems);
    }
    
  }
    const {register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
      try {
      if(allitems.length===0){
toast.error("Please add some roles")
      }else{
        const res = await axiosInstance.post('/staff/staffusers/', 
              
        {
          "password": data.password,
          
          "is_superuser": false,
          "email": data.email,
          "full_name": data.full_name,
          "mobile_no": data.number,
          "address": data.address,
          "active": true,
          "mobile_number": data.number,
          "role": "sub_admin",
          "organization": user.id
        },
      
              {headers: {
                  Authorization: `Bearer ${
                    typeof window !== 'undefined' ? localStorage?.getItem('access') : ''
                  }`}});
              console.log(res.data)
              if (res.status === 200 || res.status === 201) {
                  toast.success(`Sub Admin created  Successfully`);

                  reset();
                  router.push("/success");
  
              }else{
                toast.error("Something went wrong");
                router.push("/error");
              }
      }
       
       } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
       }

    }
    const [isvisiable, setisvisiable] = useState(false)
    const [password, setPassword] = useState( '');
   
  return (
    <div>
    <div className="flex flex-col p-6 shadow-lg bg-white lg:w-[100%] w-[1367px]">
    <p className="font-bold text-2xl font-inter">Create New Sub Admin User</p>
    <form  onSubmit={
          // console.log(allitems);
          handleSubmit(onSubmit)
    } >
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2  mt-8">
                   
                    <div className='w-[600px]  '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Full Name
                    </label>
                    <div className='mt-[8px] relative'>
                      <IoPersonOutline className={`absolute text-2xl left-4 ${errors.full_name ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        placeholder='Input full name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.full_name ? 'border-red-500' : ''
                          }`}
                        {...register('full_name', { required: true })}
                      />
                      {errors.full_name && (
                        <span className='text-red-500'>
                          Full Name is required
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className='w-[600px]  '>
                    <label
                      htmlFor='number'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Mobile Number
                    </label>
                    <div className='mt-[8px] relative'>
                      <FaMobileAlt className={`absolute text-2xl left-4 ${errors.number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        placeholder='Input Mobile number'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.number ? 'border-red-500' : ''
                          }`}
                        {...register('number', { required: true })}
                      />
                      {errors.number && (
                        <span className='text-red-500'>
                         Mobile Number is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[600px]  '>
                    <label
                      htmlFor='email'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Email address
                    </label>
                    <div className='mt-[8px] relative'>
                      <CiMail className={`absolute text-2xl left-4 ${errors.email ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='email'
                        placeholder='Input Email address'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.email ? 'border-red-500' : ''
                          }`}
                        {...register('email', { required: true })}
                      />
                      {errors.email && (
                        <span className='text-red-500'>
                         Email address is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[600px]  '>
                    <label
                      htmlFor='email'
                      className='text-sm font-semibold text-[#333333] '
                    >
                       Address
                    </label>
                    <div className='mt-[8px] relative'>
                      <IoLocationOutline className={`absolute text-2xl left-4 ${errors.email ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        placeholder='Input Address'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.email ? 'border-red-500' : ''
                          }`}
                        {...register('address', { required: true })}
                      />
                      {errors.email && (
                        <span className='text-red-500'>
                        Address is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                  <div className='flex w-[600px]  items-center justify-between'>
                    <label
                      htmlFor='password'
                      className='text-sm font-semibold text-[#333333]'
                    >
                      Password
                    </label>
                   
                  </div>
                  <div className='mt-2.5 relative w-[600px] '>
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
                      placeholder='Enter your password'
                      className={`block w-[600px]  p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg  focus:outline-none focus:border-blue-600 focus:bg-white  ${errors.password ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.password && (
                      <p className='mt-1 text-red-500'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                 
                </div>
                
                  
                    
                    </div>
                    <div className="h-[2px]   mx-0 bg-greyneutral mt-7">

</div>
<p className="font-bold text-2xl font-inter mt-4">Roles</p>
<div className="flex gap-6 mt-6 flex-wrap">
<RadioButton title={"Notification"} onclickfunction={()=>{
  if(allitems){}
  additem({item:"Notification"});
}}/>
<RadioButton title={"Create Sub Admin"} onclickfunction={()=>{
  additem({item:"Create Sub Admin"});
}}/>
<RadioButton title={"Create Sub Admin"} onclickfunction={()=>{
  additem({item:"Create Sub Admin"});
}}/>
<RadioButton title={"Change Password"} onclickfunction={()=>{
  additem({item:"Change Password"});
}}/>
<RadioButton title={"Create Branch"} onclickfunction={()=>{
  additem({item:"Create Branch"});
}}/>
<RadioButton title={"Edit Branch"} onclickfunction={()=>{
  additem({item:"Edit Branch"});
}}/>
<RadioButton title={"Lock Branch"} onclickfunction={()=>{
  additem({item:"Lock Branch"});
}}/>
<br />
<RadioButton title={"Manual Entry"} onclickfunction={()=>{
  additem({item:"Manual Entry"});
}}/>
</div>
<div className="w-[320px] mt-10" >
    <DefaultButton text={"Create"}/>
    </div>
                    </form>
    </div>
   
   
    </div>
  )
}
