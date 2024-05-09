"use client"

import { useUserData } from '@/modules/hooks/useUserData';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";

import { FiMessageSquare } from "react-icons/fi";
import { useAtom } from 'jotai';
import { CiMail } from "react-icons/ci";
import { MdArrowDropDown, MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineGroup } from "react-icons/md";
import { idTypes, meetingtypes, organizationTypes, purpose } from '@/modules/data/organization_types_nature';
import { RiRectangleLine } from "react-icons/ri";
import { RiEBike2Fill } from "react-icons/ri";
import DefaultButton from '@/modules/core-ui/Button';
import {  meetingappoinmentdata } from '@/jotai/dash-atoms';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { getpurposes } from '@/modules/data/branch_service';

const Meetingappoinment = () => {
  const [purposes, setpurpose] = useState(null)
  const [value,setvalue]=useAtom(meetingappoinmentdata)
  const { register, handleSubmit, control, reset, formState: { errors } }
    = useForm();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");


  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
  useEffect(() => {
    getpurposes({ setpurpose: setpurpose })
  }, [])
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    // getorgbranch({ toast: toast,id:user.id,  setbranches: setnewvisitors,searchtext:"", startdate:event.target.value,enddate:endselecteddate})

  };
  const [changevalue, setchangevalue] = useState("Yes")
  const onSubmit = async (data) => {
    console.log(data.have_vehicle);
    const data1 = {
      "full_name": data.full_name,
      "meetingtitle": data.meetingtitle,
      "number": data.number,
      "agenda": data.agenda,
      "location": data.location,
      "meetingtype": data.meetingtype,
      "selectedDate": selectedDate,
     
    }
      setvalue(data1)
    router.push("/meeting-preview")
    //         if (!isUserLoading) {
    //             const res = await axiosInstance.post('organization/scan-organization/', 

    //             { ...data, organization: user.id },
    //             {headers: {
    //                 Authorization: `Bearer ${
    //                   typeof window !== 'undefined' ? localStorage?.getItem('access') : ''
    //                 }`}});
    //             console.log(res.data)
    //             if (res.status === 200 || res.status === 201) {
    //                 toast.success(`Manual Entry For ${data.full_name} Successfull`);
    // router.push("/dash");
    //                 reset()

    //             }
    //         } else {
    //             toast.error("Something went wrong!")
    //         }
  };

  return (
    <div className=" xl:w-[100%]  lg:w-[1367px] ">
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="p-6 bg-white rounded-lg shadow-3xl">


          <h1 className="mb-4 text-2xl font-semibold">Meeting Appointment</h1>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            <div className='w-[600px] '>
              <label
                htmlFor='full_name'
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
                  placeholder='Input your meeting title'
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.meetingtitle ? 'border-red-500' : ''
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
                  placeholder='Input Mobile Number'
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.number ? 'border-red-500' : ''
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
                  placeholder='Input Meeting Agenda'
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.agenda ? 'border-red-500' : ''
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
                  placeholder='Input your location'
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.location ? 'border-red-500' : ''
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



            {purposes === null ? <></> : <>
              <div className='w-[600px] '>
                <label
                  htmlFor='organization_name'
                  className='text-sm font-semibold text-[#333333] '
                >
                  Meeting Type
                </label>
                <div className='mt-[8px] relative'>
                  <select
                    className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                    {...register('meetingtype', { required: true })}
                  >
                    <option value="" className='font-semibold text-[#333333] '>
                      Select Meeting Type
                    </option>
                    {meetingtypes.map(org => (
                      <option key={org.id} value={org.value} className='text-sm  font-semibold text-[#333333]'>
                        {org.title}
                      </option>
                    ))}
                  </select>
                  <div className={`pointer-events-none absolute inset-y-0 right-0 flex ${errors.meetingtype ? "-top-6" : ""} items-center px-2 text-gray-700`}>
                    <MdArrowDropDown />
                  </div>
                  <FiMessageSquare className={`absolute text-2xl left-4 ${errors.meetingtype ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                  {errors.meetingtype && (
                    <span className='text-red-500'>
                      Please select meeting type
                    </span>
                  )}
                </div>

              </div>
            </>}
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2" htmlFor="datepicker">
                Date & Time:
              </label>
              <input
                type="date"
                id="datepicker"
                placeholder="Select a date"
                value={selectedDate}
                pattern="\d{4}-\d{2}-\d{2}"
                onChange={handleDateChange}
                className="p-2 border w-[600px] h-[60px] rounded-lg text-xl text-[#A3A3A3] border-[#A3A3A3]"
              />
            </div>


          </div>



        </div>
        <div className='w-[320px] my-10'>
          <DefaultButton text="Submit" />
        </div>

      </form>
    </div>
  );
};

export default Meetingappoinment;