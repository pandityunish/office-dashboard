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
import { idTypes, organizationTypes, purpose } from '@/modules/data/organization_types_nature';
import { RiRectangleLine } from "react-icons/ri";
import { RiEBike2Fill } from "react-icons/ri";
import DefaultButton from '@/modules/core-ui/Button';
import { mannualdataAtom } from '@/jotai/dash-atoms';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Imagepicker from '@/modules/kyc-component/Imagepicker';
import { getpurposes } from '@/modules/data/branch_service';

const VisitForm = () => {
  const [value,setvalue]=useAtom(mannualdataAtom)
  const [purposes, setpurpose] = useState(null)
    const {register, handleSubmit, control, reset, formState: { errors } } 
    = useForm({defaultValues:{
      "full_name":value.full_name,
      "address":value.address,
      "number":value.number,
      "email":value.email,
      "visiting":value.visiting,
      "numvisitor":value.numvisitor,
      "typeid":value.typeid,
      "have_vehicle":value.have_vehicle,
      "vehicle_number":value.vehicle_number,
      "purpose":value.purpose,
      "id_number":value.id_number,
      "image":value.image
    }});
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState("");
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setSelectedImage(file);
    };
  
    const handleImageClick = () => {
      // Trigger the hidden file input when the image is clicked
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }else{
     
      }
    };
  
    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError
    } = useUserData()
useEffect(() => {
 getpurposes({setpurpose:setpurpose})
}, [])

const [changevalue, setchangevalue] = useState("Yes")
    const onSubmit = async (data) => {
      console.log(data.have_vehicle);
      const data1={
        "full_name":data.full_name,
        "address":data.address,
        "number":data.number,
        "email":data.email,
        "visiting":data.visiting,
        "numvisitor":data.numvisitor,
        "typeid":data.typeid,
        "have_vehicle":data.have_vehicle,
        "vehicle_number":data.vehicle_number,
        "purpose":data.purpose,
        "id_number":data.id_number,
        // "image":selectedImage
      }
      setvalue(data1)
router.push("/manual-preview")
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
                    
            
                <h1 className="mb-4 text-2xl font-semibold">Visitor Entry Form</h1>
                
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
                     Full Address
                    </label>
                    <div className='mt-[8px] relative'>
                      <IoLocationOutline className={`absolute text-2xl left-4 ${errors.address ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        placeholder='Input your address'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.address ? 'border-red-500' : ''
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
              {...register('number', { required: true,maxLength:10,minLength:10 })}
            />
            {errors.number && (
              <span className='text-red-500'>
                {errors.number && errors.number.type === "required" && (
                          <span className='text-red-500'>
                            Mobile Number is required
                          </span>
                        )}
                {errors.number && errors.number.type === "minLength" && <span className='text-red-500'>Number should be at least 10 digits</span> }
                        {errors.number && errors.number.type === "maxLength" && <span className='text-red-500'>Number shouldn&apos;t be more than 10 digits</span> }
              </span>
            )}
          </div>
        </div>   
                  {/* <Controller
        name="number"
        control={control}
        defaultValue=""
        rules={{
          validate: value => {
            if (!value) return 'Phone number is required'; // Validate if the value is empty

            // Remove non-digit characters and check if it has more than 10 digits
            const phoneNumberDigits = value.replace(/\D/g, ''); // Remove non-digit characters
            if (phoneNumberDigits.length < 10) {
              return 'Phone number must be at least 10 digits';
            }

            return true; // Validation passed
          }
        }}
        render={({ field }) => (
          <div className='w-[600px] '>
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
              {...register('number', { required: true },)}
            />
            {errors.number && (
              <span className='text-red-500'>
               {errors.number && <p>{errors.number.message}</p>}
              </span>
            )}
          </div>
        </div>
        )}
      /> */}
                  
                  <div className='w-[600px] '>
                    <label
                      htmlFor='email'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Email address(optional)
                    </label>
                    <div className='mt-[8px] relative'>
                      <CiMail className={`absolute text-2xl left-4 ${errors.email ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='email'
                        placeholder='Input Email address'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.email ? 'border-red-500' : ''
                          }`}
                        {...register('email', )}
                      />
                      {errors.email && (
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
                        Visiting From (Office or address)
                      </label>
                      <div className='mt-2.5 relative'>
                        <MdOutlineLocationOn className={`absolute text-2xl left-4 ${errors.visiting ? "top-1/2" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input visiting from'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.visiting ? 'border-red-500' : ''
                            }`}
                          {...register('visiting')}
                        />
                        {errors.visiting && (
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
                          placeholder='Input number of visitor'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.numvisitor ? 'border-red-500' : ''
                            }`}
                          {...register('numvisitor', )}
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
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('typeid')}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                            Select Type of ID
                          </option>
                          {idTypes.map(org => (
                            <option key={org.id} value={org.value} className='text-sm  font-semibold text-[#333333]'>
                              {org.title}
                            </option>
                          ))}
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
                          placeholder='Input number of visitor'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.id_number ? 'border-red-500' : ''
                            }`}
                          {...register('id_number')}
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
                            defaultValue={false}
                          
                            render={({ field }) => (
                                <div>
                                    <label className="inline-flex items-center">
                                        <input
                                        onClick={()=>{
                                          setchangevalue("Yes")
                                        }}
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
                                         onClick={()=>{
                                          setchangevalue("No")
                                        }}
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
                {changevalue==="No"?<></>:<div className='w-[280px]  '>
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
                          placeholder='Input vehicle number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.vehicle_number ? 'border-red-500' : ''
                            }`}
                          {...register('vehicle_number')}
                        />
                        {errors.vehicle_number && (
                          <span className='text-red-500'>
                          Vehicle Number is required
                          </span>
                        )}
                      </div>
                    </div>}    
                  </div>
                  {purposes===null?<></>:<>
                  <div className='w-[600px] '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Purpose
                    </label>
                    <div className='mt-[8px] relative'>
                        <select
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('purpose',{required:true})}
                        >
                          <option value="" className='font-semibold text-[#333333] '>
                            Select purpose
                          </option>
                          {purposes.map(org => (
                            <option key={org.id} value={org.text_field} className='text-sm  font-semibold text-[#333333]'>
                              {org.text_field}
                            </option>
                          ))}
                        </select>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 flex ${errors.purpose ? "-top-6" : ""} items-center px-2 text-gray-700`}>
                          <MdArrowDropDown />
                        </div>
                        <FiMessageSquare className={`absolute text-2xl left-4 ${errors.purpose ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        {errors.purpose && (
                          <span className='text-red-500'>
                            Please select purpose 
                          </span>
                        )}
                      </div>
                    
                  </div>
                  </>}
                  

                    
                </div>

                

                </div>
                <div className='w-[320px] my-10'>
<DefaultButton text="Continue"/>
</div>

            </form>
        </div>
    );
};

export default VisitForm;