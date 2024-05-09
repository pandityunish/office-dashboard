"use client"

import axiosInstance from '@/modules/axios';
import { useUserData } from '@/modules/hooks/useUserData';
import { useForm, Controller } from 'react-hook-form';
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation'
import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

import { CiMail } from "react-icons/ci";
import { MdArrowDropDown, MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineGroup } from "react-icons/md";
import { RiRectangleLine } from "react-icons/ri";
import { RiEBike2Fill } from "react-icons/ri";
import { useAtom } from 'jotai';
import {  meetingappoinmentdata } from '@/jotai/dash-atoms';
import Image from 'next/image';
import { useState } from 'react';

const MeetingPreview = () => {
    const [value,setvalue]=useAtom(meetingappoinmentdata)
    const {register, handleSubmit, control, reset, formState: { errors } }
     = useForm();
    const router = useRouter();
 
    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError
    } = useUserData()

const [isLoading, setisLoading] = useState(false);
    const onSubmit = async (data) => {
console.log(value.number)
setisLoading(true);
// data.preventDefault();
        if (!isUserLoading) {
          const formData = new FormData();
          formData.append("organization",user.id);
          formData.append("full_name",value.full_name);
          formData.append("meeting_title",value.meetingtitle);
          formData.append("number",value.number);
          formData.append("location",value.location);
          formData.append("meeting_type",value.meetingtype);
          formData.append('date',value.selectedDate)
          // formData.append("photo",fileimage, fileimage.name);
          console.log(formData.photo);
            const res = await axiosInstance.post(`/organization/meetingcreate/`, 
          
            formData,
            {headers: {
              'content-type': 'multipart/form-data',
                Authorization: `Bearer ${
                  typeof window !== 'undefined' ? localStorage?.getItem('access') : ''
                }`}});
            console.log(res.data)
            if (res.status === 200 || res.status === 201) {
                toast.success(`Manual Entry For ${value.full_name} Successfull`);
router.push("/success");
                reset()
                setisLoading(false);

            }
        } else {
          setisLoading(false);
            toast.error("Something went wrong!")
        }
    };

    return (
        <div className="xl:w-[100%]  lg:w-[1367px] ">
            
                <div className="p-6 bg-white rounded-lg shadow-3xl">
                    
            
                <h1 className="mb-4 text-2xl font-semibold">Meeting Appointment</h1>
                
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                   
                    <div className='w-[600px] '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Full name
                    </label>
                    <div className='mt-[8px] relative'>
                      <IoPersonOutline className={`absolute text-2xl left-4 ${errors.full_name ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                        value={value.full_name}
                        placeholder='Input full name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.full_name ? 'border-red-500' : ''
                          }`}
                        {...register('full_name', { required: true })}
                      />
                      {errors.organization_name && (
                        <span className='text-red-500'>
                          Full Name is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[600px] '>
              <label
                htmlFor='organization_name'
                className='text-sm font-semibold text-[#333333] '
              >
                Meeting Title
              </label>
              <div className='mt-[8px] relative'>
                <IoLocationOutline className={`absolute text-2xl left-4 ${errors.meetingtitle ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                <input
                  type='text'
                  readOnly={true}
                  value={value.meetingtitle}
                  placeholder='Input your meeting title'
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px]  bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.meetingtitle ? 'border-red-500' : ''
                    }`}
                  {...register('meetingtitle', { required: true })}
                />
                {errors.meetingtitle && (
                  <span className='text-red-500'>
                    Meeting title is required
                  </span>
                )}
              </div>
            </div>
            <div className='w-[600px] '>
              <label
                htmlFor='organization_name'
                className='text-sm font-semibold text-[#333333] '
              >
                Mobile Number
              </label>
              <div className='mt-2.5 relative'>
                <FaMobileAlt className={`absolute text-2xl left-4 ${errors.number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                <input
                  type='text'
                  readOnly={true}
                  value={value.number}
                  placeholder='Input Mobile Number'
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px]  bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.number ? 'border-red-500' : ''
                    }`}
                  {...register('number', { required: true, maxLength: 10, minLength: 10 })}
                />
                {errors.number && (
                  <span className='text-red-500'>
                    {errors.number && errors.number.type === "required" && (
                      <span className='text-red-500'>
                        Mobile Number is required
                      </span>
                    )}
                    {errors.number && errors.number.type === "minLength" && <span className='text-red-500'>Number should be at least 10 digits</span>}
                    {errors.number && errors.number.type === "maxLength" && <span className='text-red-500'>Number shouldn&apos;t be more than 10 digits</span>}
                  </span>
                )}
              </div>
            </div>


            <div className='w-[600px] '>
              <label
                htmlFor='email'
                className='text-sm font-semibold text-[#333333] '
              >
                Meeting Agenda
              </label>
              <div className='mt-[8px] relative'>
                <CiMail className={`absolute text-2xl left-4 ${errors.agenda ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                <input
                  type='agenda'
                  readOnly={true}
                  value={value.agenda}
                  placeholder='Input Meeting Agenda'
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px]  bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.agenda ? 'border-red-500' : ''
                    }`}
                  {...register('agenda',)}
                />
                {errors.email && (
                  <span className='text-red-500'>
                    Agenda is required
                  </span>
                )}
              </div>
            </div>
            <div className='w-[600px] '>
              <label
                htmlFor='organization_name'
                className='text-sm font-semibold text-[#333333] '
              >
                Location
              </label>
              <div className='mt-[8px] relative'>
                <IoLocationOutline className={`absolute text-2xl left-4 ${errors.location ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                <input
                  type='text'
                  readOnly={true}
                  value={value.location}
                  placeholder='Input your location'
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px]  bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.location ? 'border-red-500' : ''
                    }`}
                  {...register('location', { required: true })}
                />
                {errors.location && (
                  <span className='text-red-500'>
                    Location is required
                  </span>
                )}
              </div>
            </div>



            <div className='w-[600px] '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Meeting Type
                    </label>
                    <div className='mt-[8px] relative'>
                      <FiMessageSquare className={`absolute text-2xl left-4 ${errors.purpose ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                          value={value.meetingtype}
                        placeholder='Input purpose'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.purpose ? 'border-red-500' : ''
                          }`}
                        {...register('purpose', { required: true })}
                      />
                      {errors.purpose && (
                        <span className='text-red-500'>
                          meeting type  is required
                        </span>
                      )}
                    </div>
                  </div>
                    
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2" htmlFor="datepicker">
                Date & Time:
              </label>
              <input
                type="date"
                id="datepicker"
                placeholder="Select a date"
                value={value.selectedDate}
                pattern="\d{4}-\d{2}-\d{2}"
                // onChange={handleDateChange}
                className="p-2 border w-[600px] h-[60px] rounded-lg text-xl text-[#A3A3A3] bg-textfromgray border-[#A3A3A3]"
              />
            </div>
                 
                  {/* {<div className='w-[619px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 bg-[#F4F4F4] border-[#A3A3A3] rounded-xl'>
<Image src={ URL.createObjectURL(value.image)}  width={150} height={200}
alt="Selected" className='object-contain h-[100px]' />
</div>} */}
                    
                </div>

                

                </div>
                <div className='flex gap-3'>
            <button
                type='submit'
                className='w-[320px] h-[56px] mb-12 rounded-xl mt-10 flex items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center  px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                onClick={()=>{
                  if(isLoading===false){
                    onSubmit();
                  }else{
                   
                  }
                 
                }}
              >
               {isLoading===false?"Continue":"Loading"} 
              </button>
              <div
                type='submit'
                className='w-[320px] h-[56px] rounded-xl mb-12 mt-10 flex items-center bg-white justify-center  px-4 py-4 text-base font-semibold text-black transition-all duration-200    border-2 border-gray-950'
                onClick={()=>{
                  router.back()
                }}
              >
              Back
              </div>
            </div>
           
        </div>
    );
};

export default MeetingPreview;