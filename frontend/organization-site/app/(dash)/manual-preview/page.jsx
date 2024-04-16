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
import { mannualdataAtom } from '@/jotai/dash-atoms';
import Image from 'next/image';
import { useState } from 'react';

const VisitForm = () => {
    const [value,setvalue]=useAtom(mannualdataAtom)
    const {register, handleSubmit, control, reset, formState: { errors } }
     = useForm({defaultValues:{
      "have_vehicle":value.have_vehicle
     }});
    const router = useRouter();
    console.log(value.have_vehicle)
 
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
          formData.append("purpose",value.purpose);
          formData.append("visiting_from",value.visiting);
          formData.append("address",value.address);
          formData.append("number_team",value.numvisitor);
          formData.append("number_of_team",value.numvisitor);
          formData.append("have_vehicle",value.have_vehicle);
          formData.append("remarks",value.purpose);
          formData.append("mobile_number",value.number);
          formData.append("full_name",value.full_name);
          formData.append("type_of_id",value.typeid);
          formData.append("id_number",value.id_number);
          formData.append("email",value.email);
          formData.append("vehicle_number",value.vehicle_number);
          // formData.append("photo",fileimage, fileimage.name);
          console.log(formData.photo);
            const res = await axiosInstance.post(`/organization/${user.id}/manual-entry`, 
          
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
                    
            
                <h1 className="mb-4 text-2xl font-semibold">Visitor Entry Form</h1>
                
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                   
                    <div className='w-[600px] '>
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
                      Address
                    </label>
                    <div className='mt-[8px] relative'>
                      <IoLocationOutline className={`absolute text-2xl left-4 ${errors.address ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                        value={value.address}
                        placeholder='Input your address'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.address ? 'border-red-500' : ''
                          }`}
                        {...register('address', { required: true })}
                      />
                      {errors.address && (
                        <span className='text-red-500'>
                          Address is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[600px] '>
                    <label
                      htmlFor='number'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Mobile Number
                    </label>
                    <div className='mt-[8px] relative'>
                      <FaMobileAlt className={`absolute text-2xl left-4 ${errors.address ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                        value={value.number}
                        placeholder='Input Mobile number'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.number ? 'border-red-500' : ''
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
                  <div className='w-[600px] '>
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
                        readOnly={true}
                        value={value.email}
                        placeholder='Input Email address'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.email ? 'border-red-500' : ''
                          }`}
                        {...register('email', { required: true })}
                      />
                      {errors.number && (
                        <span className='text-red-500'>
                         Email address is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[600px] mt-1 flex justify-between'>
                    <div className='w-[280px] mt-2'>
                      <label
                        htmlFor='visiting'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Visiting From
                      </label>
                      <div className='mt-2.5 relative'>
                        <MdOutlineLocationOn className={`absolute text-2xl left-4 ${errors.visiting ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          readOnly={true}
                        value={value.visiting}
                          placeholder='Input visiting from'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.visiting ? 'border-red-500' : ''
                            }`}
                          {...register('visiting', { required: true })}
                        />
                        {errors.telephone_number && (
                          <span className='text-red-500'>
                            Visiting From is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[280px] mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                       Number of visitor
                      </label>
                      <div className='mt-2.5 relative'>
                        <MdOutlineGroup className={`absolute text-2xl left-4 ${errors.numvisitor ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          readOnly={true}
                        value={value.numvisitor}
                          placeholder='Input number of visitor'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.numvisitor ? 'border-red-500' : ''
                            }`}
                          {...register('numvisitor', { required: true })}
                        />
                        {errors.numvisitor && (
                          <span className='text-red-500'>
                           Number of visitor is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-[600px]   flex justify-between '>
                    <div className='w-[280px] mt-2 '>


                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Type of ID
                      </label>
                      <div className='mt-2.5 relative'>
                        <select
                          readOnly={true}
                          value={value.typeid}
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('typeid', { required: true })}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                           {value.typeid}
                          </option>
                          
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <MdArrowDropDown />
                        </div>
                        <RiRectangleLine className={`absolute text-2xl left-4 ${errors.typeid ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        {errors.typeid && (
                          <span className='text-red-500'>
                            Please select Type of Id
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[280px] mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                       ID Number
                      </label>
                      <div className='mt-2.5 relative'>
                        <RiRectangleLine className={`absolute text-2xl left-4 ${errors.id_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          readOnly={true}
                          value={value.id_number}
                          placeholder='Input Id number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.id_number ? 'border-red-500' : ''
                            }`}
                          {...register('id_number', { required: true })}
                        />
                        {errors.id_number && (
                          <span className='text-red-500'>
                         Id Number is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-[600px]    flex justify-between '>
                  <div className="mb-4 w-[280px]">
                        <label className="block mb-2 text-sm font-semibold text-[#333333]" htmlFor="have_vehicle">
                            Vehicle
                        </label>
                        <Controller
                            name="have_vehicle"
                            control={control}
                            disabled={false}
defaultValue={value.have_vehicle}
                           
                            render={({ field }) => (
                                <div>
                                    <label className="inline-flex items-center">
                                        <input
                                            {...field}
                                            id="have_vehicle"
                                            type="radio"
                                            value="yes"
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            {...field}
                                            id="have_vehicle"
                                            type="radio"
                                            value="no"

                                            className="form-radio"
                                        />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            )}
                        />
                    </div>
                    {value.have_vehicle==="no"?<></>:<div className='w-[280px]  '>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                       Vehicle Number
                      </label>
                      <div className='mt-2.5 relative'>
                        <RiEBike2Fill  className={`absolute text-2xl left-4 ${errors.vehicle_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          readOnly={true}
                          value={value.vehicle_number}
                          placeholder='Input vehicle number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.vehicle_number ? 'border-red-500' : ''
                            }`}
                          {...register('vehicle_number', { required: true })}
                        />
                        {errors.vehicle_number && (
                          <span className='text-red-500'>
                          Vehicle Number is required
                          </span>
                        )}
                      </div>
                    </div>}
                    
                  </div>
                  <div className='w-[600px] '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Purpose
                    </label>
                    <div className='mt-[8px] relative'>
                      <FiMessageSquare className={`absolute text-2xl left-4 ${errors.purpose ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        readOnly={true}
                          value={value.purpose}
                        placeholder='Input purpose'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.purpose ? 'border-red-500' : ''
                          }`}
                        {...register('purpose', { required: true })}
                      />
                      {errors.purpose && (
                        <span className='text-red-500'>
                          Purpose is required
                        </span>
                      )}
                    </div>
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

export default VisitForm;