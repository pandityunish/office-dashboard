'use client'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUserData } from '@/modules/hooks/useUserData'
import { CgOrganisation } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdArrowDropDown, MdPanoramaWideAngle } from "react-icons/md";
import { PiBagSimpleBold } from 'react-icons/pi'
import { MdLocationSearching } from "react-icons/md";
import { CiFlag1 } from "react-icons/ci";
import { TiLocationArrowOutline } from "react-icons/ti";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { MdShareLocation } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

import { CiMail } from "react-icons/ci";
import { FaWordpress } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import { TbArrowBigRight } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

import {  unverifykycdata } from '@/jotai/dash-atoms';
import axiosInstance from '@/modules/axios';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { baseurl } from '@/modules/apiurl';
export default function KycPreview() {
  const [value,setvalue]=useAtom(unverifykycdata)
  const {
    register,
    handleSubmit,
    setValue,
    onChange,
    formState: { errors },

  } = useForm();
 
  const fileInputRef = useRef(null);


  const [regselectedImage, regsetSelectedImage] = useState(null);
  const regfileInputRef = useRef(null);

  const reghandleImageChange = (event) => {
    const file = event.target.files[0];
    regsetSelectedImage(file);
  };

  const reghandleImageClick = () => {
    // Trigger the hidden file input when the image is clicked
    if (fileInputRef.current) {
      regfileInputRef.current.click();
    } else {

    }
  };
  const [vatselectedImage, vatsetSelectedImage] = useState(null);


  const [licenselectedImage, licensetSelectedImage] = useState(null);




  const [citizenselectedImage, citizensetSelectedImage] = useState(null);


  const router = useRouter()
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()

console.log(value);
  const onSubmit = async data => {
   
  }

  return (
    <>

      <>
        <div className='xl:w-[100%]  lg:w-[1367px] '>

          <div className=''>

            
              <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>


                <div className='flex flex-col p-5 rounded-xl bg-white shadow-3xl w-[667px] h-[420.02px]'>
                  <h1 className='font-bold font-inter text-2xl leading-9'>Office Information</h1>
                  <div className='w-[619px] mt-5'>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-normal text-[#A3A3A3] '
                    >
                      Office Name
                    </label>
                    <div className='mt-2.5 relative'>
                      <CgOrganisation className={`absolute text-2xl left-4 ${errors.organization_name ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                        value={value.org_name}
                        placeholder='Input your organization full name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-gray-200 ${errors.organization_name ? 'border-red-500' : ''
                          }`}
                        {...register('organization_name', { required: true })}
                      />
                      {errors.organization_name && (
                        <span className='text-red-500'>
                          Office name is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[619px] mt-2 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        Establishment Year
                      </label>
                      <div className='mt-2.5 relative'>
                        <CiCalendar className={`absolute text-2xl left-4 ${errors.establishment_year ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          readOnly={true}
                          value={value.establishment_year}
                          placeholder='Input establishment year'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.establishment_year ? 'border-red-500' : ''
                            }`}
                          {...register('establishment_year', { required: true })}
                        />
                        {errors.establishment_year && (
                          <span className='text-red-500'>
                            Establishment year is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        Registration Number
                      </label>
                      <div className='mt-2.5 relative'>
                        <TbLayoutDashboard className={`absolute text-2xl left-4 ${errors.registration_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          readOnly={true}
                          value={value.registration_number}
                          placeholder='Input registration number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.registration_number ? 'border-red-500' : ''
                            }`}
                          {...register('registration_number', { required: true })}
                        />
                        {errors.registration_number && (
                          <span className='text-red-500'>
                            Registration number is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-[619px] mt-2 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        PAN / VAT Number
                      </label>
                      <div className='mt-2.5 relative'>
                        <MdPanoramaWideAngle className={`absolute text-2xl left-4 ${errors.pan_vat_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          value={value.pan_vat_number}
                          readOnly={true}
                          placeholder='Input PAN / VAT number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.pan_vat_number ? 'border-red-500' : ''
                            }`}
                          {...register('pan_vat_number', { required: true })}
                        />
                        {errors.pan_vat_number && (
                          <span className='text-red-500'>
                            PAN / VAT number is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2'>
                      <section>
                        <label
                          htmlFor='organization_type'
                          className='text-sm font-normal text-[#A3A3A3]'
                        >
                          Office Type
                        </label>
                        <div className='mt-2.5 relative'>
                          <select
                          readOnly={true}
                            className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                            {...register('organization_type', { required: true })}
                          >
                            <option value="" className='text-[#A3A3A3] '>
                            {value.org_type}
                            </option>
                            
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            {/* Adjust the positioning of the dropdown button here */}
                            <MdArrowDropDown />
                          </div>
                          {/* Adjust the positioning of the dropdown button here */}
                          <PiBagSimpleBold className={`absolute text-2xl left-4 ${errors.organization_type ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                          {errors.organization_type && (
                            <span className='text-red-500'>
                              Please select office type
                            </span>
                          )}
                        </div>


                      </section>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col p-5 rounded-xl bg-white shadow-3xl w-[667px] h-[420.02px]'>
                  <h1 className='font-bold font-inter text-2xl leading-9'>Address</h1>
                  <div className='w-[619px] mt-5  flex justify-between'>
                    <div className='w-[297.5px] mt-2 '>


                      <label
                        htmlFor='organization_name'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        Country
                      </label>
                      <div className='mt-2.5 relative'>
                        <select
                        readOnly={true}
                        
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('country', { required: true })}
                          onChange={(e) => {
                           

                          }}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                           {value.country}
                          </option>
                          
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <MdArrowDropDown />
                        </div>
                        <CiFlag1 className={`absolute text-2xl left-4 ${errors.organization_type ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        {errors.country && (
                          <span className='text-red-500'>
                            Please select country
                          </span>
                        )}
                      </div>
                    </div>

                    <div className='w-[297.5px] mt-2 '>


                      <label
                        htmlFor='organization_name'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        State / Province
                      </label>
                      <div className='mt-2.5 relative'>
                        <select
                        readOnly={true}
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('province', { required: true })}
                          onChange={(e) => {
                           
                          }}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                           {value.state}
                          </option>
                          
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <MdArrowDropDown />
                        </div>
                        <MdLocationSearching className={`absolute text-2xl left-4 ${errors.province ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        {errors.province && (
                          <span className='text-red-500'>
                            Please select province
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-[619px]   flex justify-between mt-2'>
                    <div className='w-[297.5px] mt-2 '>


                      <label
                        htmlFor='organization_name'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        District
                      </label>
                      <div className='mt-2.5 relative'>
                        <select
                        readOnly={true}
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('district', { required: true })}
                          onChange={(e) => {
                           
                          }}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                            {value.district}
                          </option>
                          {/* {alldistrict.map((org, i) => (
                            <option key={i} value={org} className='text-sm  font-normal text-[#A3A3A3]'>
                              {org}
                            </option>
                          ))} */}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <MdArrowDropDown />
                        </div>
                        <MdShareLocation className={`absolute text-2xl left-4 ${errors.district ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        {errors.district && (
                          <span className='text-red-500'>
                            Please select District
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2 '>


                      <label
                        htmlFor='district'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        Municipality / Rural Municipality
                      </label>
                      <div className='mt-2.5 relative'>
                        <select
                        readOnly={true}
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('municipality', { required: true })}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                            {value.municipality}
                          </option>
                          
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <MdArrowDropDown />
                        </div>
                        <MdLocationOn className={`absolute text-2xl left-4 ${errors.municipality ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        {errors.municipality && (
                          <span className='text-red-500'>
                            Please select municipality
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-[619px] mt-2 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        Ward No.
                      </label>
                      <div className='mt-2.5 relative'>
                        <TbArrowBigRight className={`absolute text-2xl left-4 ${errors.establishment_year ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                        readOnly={true}
                        value={value.ward_no}
                          type='text'
                          placeholder='Input ward no.'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.ward ? 'border-red-500' : ''
                            }`}
                          {...register('ward', { required: true })}
                        />
                        {errors.ward && (
                          <span className='text-red-500'>
                            ward is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='city'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        City / Tole / Area
                      </label>
                      <div className='mt-2.5 relative'>
                        <TiLocationArrowOutline className={`absolute text-2xl left-4 ${errors.registration_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          value={value.city_village_area}
                          placeholder='Input City / Tole / Area'
                          readOnly={true}
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.city ? 'border-red-500' : ''
                            }`}
                          {...register('city', { required: true })}
                        />
                        {errors.city && (
                          <span className='text-red-500'>
                            City / Tole / Area is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col p-5 rounded-xl bg-white shadow-3xl w-[667px] '>
                  <h1 className='font-bold font-inter text-2xl leading-9'>Contact</h1>
                  <div className='w-[619px] mt-5'>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-normal text-[#A3A3A3] '
                    >
                      Contact Person Full Name
                    </label>
                    <div className='mt-2.5 relative'>
                      <IoPersonOutline className={`absolute text-2xl left-4 ${errors.full_name ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        value={value.contact_person_full_name}
                        placeholder='Input contact person full name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.full_name ? 'border-red-500' : ''
                          }`}
                        {...register('full_name', { required: true })}
                      />
                      {errors.full_name && (
                        <span className='text-red-500'>
                          Full name is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[619px] mt-3 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='telephone_number'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        Telephone number
                      </label>
                      <div className='mt-2.5 relative'>
                        <MdOutlineLocalPhone className={`absolute text-2xl left-4 ${errors.telephone_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                        readOnly={true}
                        value={value.telephone_number}
                          type='text'
                          placeholder='Input Telephone number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.telephone_number ? 'border-red-500' : ''
                            }`}
                          {...register('telephone_number', { required: true })}
                        />
                        {errors.telephone_number && (
                          <span className='text-red-500'>
                            Telephone number is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        Mobile Number
                      </label>
                      <div className='mt-2.5 relative'>
                        <IoIosPhonePortrait className={`absolute text-2xl left-4 ${errors.registration_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                        readOnly={true}
                        value={value.mobilenumber}
                          type='text'
                          placeholder='Input Mobile Number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.registration_number ? 'border-red-500' : ''
                            }`}
                          {...register('registration_number', { required: true })}
                        />
                        {errors.registration_number && (
                          <span className='text-red-500'>
                            Registration number is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-[619px] mt-3 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='telephone_number'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        Whatsapp / Viber Number
                      </label>
                      <div className='mt-2.5 relative'>
                        <FaWhatsapp className={`absolute text-2xl left-4 ${errors.whatsapp_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          value={value.whatsapp_viber_number}
                          readOnly={true}
                          placeholder='Input Whatsapp / Viber Number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.whatsapp_number ? 'border-red-500' : ''
                            }`}
                          {...register('whatsapp_number', { required: true })}
                        />
                        {errors.whatsapp_number && (
                          <span className='text-red-500'>
                            Whatsapp / Viber Number is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='contact_number'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        Alternative Contact Number
                      </label>
                      <div className='mt-2.5 relative'>
                        <MdOutlineLocalPhone className={`absolute text-2xl left-4 ${errors.contact_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          readOnly={true}
                          value={value.secondary_number}
                          placeholder='Input alternate number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.contact_number ? 'border-red-500' : ''
                            }`}
                          {...register('contact_number', { required: true })}
                        />
                        {errors.contact_number && (
                          <span className='text-red-500'>
                            Alternative Contact is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-[619px] mt-3 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='email'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        Email address
                      </label>
                      <div className='mt-2.5 relative'>
                        <CiMail className={`absolute text-2xl left-4 ${errors.email ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='email'
                          readOnly={true}
                          value={value.email}
                          placeholder='Input email address'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.email ? 'border-red-500' : ''
                            }`}
                          {...register('email', { required: true })}
                        />
                        {errors.email && (
                          <span className='text-red-500'>
                            Email is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='Website'
                        className='text-sm font-normal text-[#A3A3A3] '
                      >
                        Website
                      </label>
                      <div className='mt-2.5 relative'>
                        <FaWordpress className={`absolute text-2xl left-4 ${errors.website ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          readOnly={true}
                          value={value.website}
                          placeholder='Input website'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.website ? 'border-red-500' : ''
                            }`}
                          {...register('website', { required: true })}
                        />
                        {errors.website && (
                          <span className='text-red-500'>
                            Website is required
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                  <div className='w-[619px] mt-4'>
                    <label
                      htmlFor='link'
                      className='text-sm font-normal text-[#A3A3A3] '
                    >
                      Socail Media Link
                    </label>
                    <div className='mt-2.5 relative'>
                      <FaFacebook className={`absolute text-2xl left-4 ${errors.link ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                        value={value.social_link}
                        placeholder='Input social media link'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.link ? 'border-red-500' : ''
                          }`}
                        {...register('link', { required: true })}
                      />
                      {errors.link && (
                        <span className='text-red-500'>
                          Link is required
                        </span>
                      )}
                    </div>
                  </div>
                  {value.anotherlink===null?<></>:<>
                  <div className='w-[619px] mt-4'>
                    <label
                      htmlFor='link'
                      className='text-sm font-normal text-[#A3A3A3] '
                    >
                      Another Link
                    </label>
                    <div className='mt-2.5 relative'>
                      <FaFacebook className={`absolute text-2xl left-4 ${errors.link ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                        value={value.anotherlink[0].link}
                        placeholder='Input social media link'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-[#F4F4F4] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.link ? 'border-red-500' : ''
                          }`}
                        {...register('anotherlink', { required: true })}
                      />
                      {errors.link && (
                        <span className='text-red-500'>
                          Link is required
                        </span>
                      )}
                    </div>
                  </div>
                  </>}
                  {/* <div className='flex gap-3 mt-6 items-center'>
                    <p className='text-primaryblue font-bold text-sm leading-5 '>
                      Add another link</p>
                    <FaPlus className="text-sm text-primaryblue" />

                  </div> */}
                </div>
                <div className='flex flex-col  p-5 rounded-xl bg-white shadow-3xl w-[667px] '>
                  <h1 className='font-bold font-inter text-2xl leading-9'>Document </h1>
                  <div className=''>
                  <p className='text-sm font-normal text-[#A3A3A3] mt-10'>Logo</p>
                  {<div className='w-[619px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 bg-[#F4F4F4] border-[#A3A3A3] rounded-xl'>
<Image src={baseurl+ value.logo}  width={150} height={150}
alt="Selected" className='object-contain h-[100px]' />
</div>}
<p className='text-sm font-normal text-[#A3A3A3] mt-5'>Registration Certificate / PAN / VAT Certificate / Licenses /Citizenship</p>
                    {<div className='w-[619px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 bg-[#F4F4F4] border-[#A3A3A3] rounded-xl'>
<Image src={ baseurl+value.registration_certificate }  width={150} height={150}
alt="Selected" className='object-contain h-[100px]' />
</div>}

{[...Array(value.otherdocument.length)].map((_, index) => (
                      <div className='flex flex-col mt-6 ' key={index}>
                      <input
                  type="file"
                  accept="image/*"
                  // onChange={(e) => handleImagesChange(index, e)}
                  style={{ display: 'none' }}
                  // ref={fileInputRefs[index]}
                  />
                  <p className='text-sm font-semibold text-[#333333]'>Other Document</p>
                  
                  {value.otherdocument[index]?<div className='w-[619px] bg-[#F4F4F4] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
                  <Image
                src={`${baseurl}${value.otherdocument[index].file}`}
                width={150} height={150}
                alt="Selected" className='object-contain h-[100px]'
                // onClick={() => handleImageClick(index)}
              />
                  </div>:<>
                  {/* <div className='w-[619px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
                  <LuUpload className="text-base text-[#A3A3A3]"/>
                  <p className='text-base font-normal leading-6 text-[#A3A3A3]'>Drag & drop file or <span className='text-primaryblue cursor-pointer' onClick={()=>{
                  
                  }}>Browse</span></p>
                  </div> */}
                  </>}
                  
                  
                  
                      </div>
        
      ))}

                    {/* <div className='flex gap-3 mt-6 items-center'>
                      <FaPlus className="text-sm text-primaryblue" />
                      <p className='text-primaryblue font-bold text-sm leading-5 '>
                        Add file upload</p>


                    </div> */}
                  </div>

                </div>






              </div>

            <div className='flex gap-3'>
            <button
                type='submit'
                className='w-[320px] h-[56px] mb-12 rounded-xl mt-10 flex items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center  px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                onClick={()=>{
                  onSubmit()
                }}
              >
                Submit Now
              </button>
              <div
                type='submit'
                className='w-[320px] h-[56px] rounded-xl mb-12 mt-10 flex items-center bg-white justify-center  px-4 py-4 text-base font-semibold text-black transition-all duration-200  cursor-pointer   border-2 border-gray-950'
                onClick={()=>{
                  router.back()
                }}
              >
              Back
              </div>
             
            </div>

            {/* </form> */}
          </div>
        </div>
      </>

    </>
  )

}


