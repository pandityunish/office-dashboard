"use client"

import axiosInstance from "@/modules/axios";
import DefaultButton from "@/modules/core-ui/Button";
import { districts, municipalites, province } from "@/modules/data/address";
import { countries } from "@/modules/data/organization_types_nature";
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { CiFlag1, CiLock, CiMail } from "react-icons/ci";
import { FaMobileAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdArrowDropDown, MdLocationOn, MdLocationSearching, MdOutlineVisibility, MdOutlineVisibilityOff, MdShareLocation } from "react-icons/md";
import { TbArrowBigRight } from "react-icons/tb";
import { TiLocationArrowOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function CreateBranch() {
  const router=useRouter();
    const [allprovince, setallprovince] = useState([]);
  const [alldistrict, setalldistrict] = useState([])
  const [allmunicipality, setallmunicipality] = useState([])
    const {register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
     try {
      console.log(data.number);
      const res = await axiosInstance.post('/organization/branches/', 
            
      {
        "name": data.branch_name,
        "email": data.email,
        "branch_no": data.branch_number,
        "contact_person": data.contact_person,
        "country": data.country,
        "state": data.province,
        "district": data.district,
        "municipality": data.municipality,
        "city_village_area": data.city,
        "ward_no": data.ward,
        "employee_size": "300",
        "lock_branch": "Active",
        "mobile_no":data.number
    },
    
            {headers: {
                Authorization: `Bearer ${
                  typeof window !== 'undefined' ? localStorage?.getItem('access') : ''
                }`}});
            console.log(res.data)
            if (res.status === 200 || res.status === 201) {
                toast.success(`Branch created ${data.branch_name} Successfully`);
// router.push("/dash");
router.push("/success");
                reset()

            }else{
              toast.error("Something went wrong");
              router.push("/error");
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
        <form  onSubmit={handleSubmit(onSubmit)} >
       <div className="flex flex-col p-9 shadow-lg bg-white lg:w-[100%] w-[1367px]">
    <p className="font-bold text-2xl font-inter">Create Branch</p>
    
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2  mt-8">
                   
                    <div className='w-[600px]  '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Branch Name
                    </label>
                    <div className='mt-[8px] relative'>
                      <IoPersonOutline className={`absolute text-2xl left-4 ${errors.branch_name ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        placeholder='Input branch name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.full_name ? 'border-red-500' : ''
                          }`}
                        {...register('branch_name', { required: true })}
                      />
                      {errors.branch_name && (
                        <span className='text-red-500'>
                          Branch Name is required
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className='w-[600px]  '>
                    <label
                      htmlFor='number'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Branch Contact No.
                    </label>
                    <div className='mt-[8px] relative'>
                      <FaMobileAlt className={`absolute text-2xl left-4 ${errors.number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        placeholder='Input branch contact number'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.number ? 'border-red-500' : ''
                          }`}
                        {...register('number', { required: true })}
                      />
                      {errors.number && (
                        <span className='text-red-500'>
                         Branch Contact No is required
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
                      htmlFor='number'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Branch No.
                    </label>
                    <div className='mt-[8px] relative'>
                      <FaMobileAlt className={`absolute text-2xl left-4 ${errors.number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        placeholder='Input branch number'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.number ? 'border-red-500' : ''
                          }`}
                        {...register('branch_number', { required: true })}
                      />
                      {errors.number && (
                        <span className='text-red-500'>
                         Branch No is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[600px]  '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Contact Person
                    </label>
                    <div className='mt-[8px] relative'>
                      <IoPersonOutline className={`absolute text-2xl left-4 ${errors.contact_person ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        placeholder='Input contact person full name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.full_name ? 'border-red-500' : ''
                          }`}
                        {...register('contact_person', { required: true })}
                      />
                      {errors.contact_person && (
                        <span className='text-red-500'>
                          Contact Person is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                  
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
                
                  
                    
                    </div>
                    <div className={`flex flex-col   w-[100%] my-10 `}>
                  <h1 className='font-bold font-inter text-2xl leading-9'>Address</h1>
                  <div className='grid grid-cols-1 gap-4 xl:grid-cols-2  mt-8'>
                    <div className='w-[600px]  mt-2 '>


                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Country
                      </label>
                      <div className='mt-2.5 relative'>
                        <select
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('country', { required: true })} 
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            console.log("Selected Value:", selectedValue);
                           if(selectedValue===""){

                           }else{
                            console.log(province[selectedValue]);
                            setallprovince(province[selectedValue])
                            setallprovince(province[selectedValue])
                           }
                             
                            
                          }}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                            Select country
                          </option>
                          {countries.map(org => (
                         
                            <option key={org.id} onClick={()=>{
                              
                            }} value={org.title} className='text-sm  font-semibold text-[#333333]' >
                             {org.title}
                            </option>
                            
                          ))}
                        </select>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 ${errors.country ? "-top-6" : ""} flex items-center px-2 text-gray-700`}>
                          <MdArrowDropDown />
                        </div>
                        <CiFlag1 className={`absolute text-2xl left-4 ${errors.country ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        {errors.country && (
                          <span className='text-red-500'>
                            Please select country
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className='w-[600px]  mt-2 '>


                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        State / Province
                      </label>
                      <div className='mt-2.5 relative'>
                      <select
          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
          {...register('province', { required: true })}
          onChange={(e) => {
            const selectedValue = e.target.value;
            console.log("Selected Value:", selectedValue);

            setalldistrict(districts[selectedValue]);

            // Set the selected value using react-hook-form's setValue
          }}
        >
          <option value="" className='text-[#A3A3A3] '>
            Select state / province
          </option>
          {allprovince.map((org, i) => (
            <option key={i} value={org} className='text-sm font-semibold text-[#333333]'>
              {org}
            </option>
          ))}
        </select>

                        <div className={`pointer-events-none absolute inset-y-0 right-0 ${errors.province ? "-top-6" : ""} flex items-center px-2 text-gray-700`}>
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
                  <div className='grid grid-cols-1 gap-4 xl:grid-cols-2 mt-2'>
                    <div className='w-[600px]  mt-2 '>


                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        District
                      </label>
                      <div className='mt-2.5 relative'>
                        <select
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('district', { required: true })}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            console.log("Selected Value:", selectedValue);
                          
                           setallmunicipality(municipalites[selectedValue])
                          }}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                            Select district
                          </option>
                          {alldistrict.map((org,i) => (
                            <option key={i} value={org} className='text-sm  font-semibold text-[#333333]'>
                              {org}
                            </option>
                          ))}
                        </select>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 ${errors.district ? "-top-6" : ""} flex items-center px-2 text-gray-700`}>
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
                    <div className='w-[600px]  mt-2 '>


                      <label
                        htmlFor='district'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Municipality / Rural Municipality
                      </label>
                      <div className='mt-2.5 relative'>
                        <select
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('municipality', { required: true })}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                            Select municipality
                          </option>
                          {allmunicipality.map((org,i) => (
                            <option key={i} value={org} className='text-sm  font-semibold text-[#333333]'>
                              {org}
                            </option>
                          ))}
                        </select>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 flex ${errors.municipality ? "-top-6" : ""} items-center px-2 text-gray-700`}>
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
                  <div className='grid grid-cols-1 gap-4 xl:grid-cols-2 mt-2'>
                    <div className='w-[600px]  mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Ward No.
                      </label>
                      <div className='mt-2.5 relative'>
                        <TbArrowBigRight className={`absolute text-2xl left-4 ${errors.ward ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input ward no.'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.ward ? 'border-red-500' : ''
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
                    <div className='w-[600px]  mt-2'>
                      <label
                        htmlFor='city'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        City / Tole / Area
                      </label>
                      <div className='mt-2.5 relative'>
                        <TiLocationArrowOutline className={`absolute text-2xl left-4 ${errors.city ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input City / Tole / Area'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.city ? 'border-red-500' : ''
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

               
    </div> 
    <div className="w-[320px] my-10">
 <DefaultButton text="Continue"/>
</div>
    </form>
    </div>
  )
}
