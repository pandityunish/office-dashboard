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
  const [value, setvalue] = useAtom(mannualdataAtom)
  const [purposes, setpurpose] = useState(null)
  const { register, handleSubmit, control, reset, formState: { errors } }
    = useForm({
      defaultValues: {
        "full_name": value.full_name,
        "number": value.number,
        "email": value.email,
        "adultguest": value.adultguest,
        "childguest": value.childguest,
        "numofroom": value.numofroom,
        "typeid": value.typeid,
        "id_number": value.id_number,
        "advancedPayment": value.advancedPayment,
        "remainingPayment": value.remainingPayment,
        "paymentmethod": value.paymentmethod
      }
    });
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
    } else {

    }
  };

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
  useEffect(() => {
    getpurposes({ setpurpose: setpurpose })
  }, [])

  const [changevalue, setchangevalue] = useState("Yes")
  const onSubmit = async (data) => {
    console.log(data, 'guest check in checkout entry')
    console.log(data.have_vehicle);
    const data1 = {
      "full_name": data.full_name,
      "number": data.number,
      "email": data.email,
      "adultguest": data.adultguest,
      "childguest": data.childguest,
      "numofroom": data.numofroom,
      "typeid": data.typeid,
      "id_number": data.id_number,
      "advancedPayment": data.advancedPayment,
      "remainingPayment": data.remainingPayment,
      "paymentmethod": data.paymentmethod

      // "image":selectedImage
    }
    console.log('hello gyest manual entry', data1)
    setvalue(data1)

    router.push("/guest-preview")

  };

  return (
    <div className=" xl:w-[100%]  lg:w-[1367px] ">
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="p-6 bg-white rounded-lg shadow-3xl">


          <h1 className="mb-4 text-2xl font-semibold">HOTEL GUEST CHECK-IN</h1>

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
                Email address(optional)
              </label>
              <div className='mt-[8px] relative'>
                <CiMail className={`absolute text-2xl left-4 ${errors.email ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                <input
                  type='email'
                  placeholder='Input Email address'
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.email ? 'border-red-500' : ''
                    }`}
                  {...register('email',)}
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
                Number of Adult guest
                </label>
                <div className='mt-2.5 relative'>
                  <MdOutlineLocationOn className={`absolute text-2xl left-4 ${errors.adultguest ? "top-1/2" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                  <input
                    type='text'
                    placeholder='Input visiting from'
                    className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.visiting ? 'border-red-500' : ''
                      }`}
                    {...register('adultguest',{required:true})}
                  />
                  {errors.adultguest && (
                    <span className='text-red-500'>
                      adult guest are required
                    </span>
                  )}
                </div>
              </div>
              <div className='w-[280px] mt-2'>
                <label
                  htmlFor='organization_name'
                  className='text-sm font-semibold text-[#333333] '
                >
                  Number of child guest 
                </label>
                <div className='mt-2.5 relative'>
                  <MdOutlineGroup className={`absolute text-2xl left-4 ${errors.childguest ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                  <input
                    type='text'
                    placeholder='Input number of visitor'
                    className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.numvisitor ? 'border-red-500' : ''
                      }`}
                    {...register('childguest',{required:true})}
                  />
                  {errors.childguest && (
                    <span className='text-red-500'>
                      Number of child guest is required
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className='w-[600px]   flex justify-between '>
            <div className='w-[280px] mt-2'>
                <label
                  htmlFor='organization_name'
                  className='text-sm font-semibold text-[#333333] '
                >
                  Number of rooms
                </label>
                <div className='mt-2.5 relative'>
                  <RiRectangleLine className={`absolute text-2xl left-4 ${errors.numofroom ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                  <input
                    type='text'
                    placeholder='Input number of visitor'
                    className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.id_number ? 'border-red-500' : ''
                      }`}
                    {...register('numofroom',{required:true})}
                  />
                  {errors.id_number && (
                    <span className='text-red-500'>
                      Number of room is required
                    </span>
                  )}
                </div>
              </div>
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
             
            </div>

            <div className='w-[600px]   flex justify-between '>
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
                  {...register('id_number',{required:true})}
                />
                {errors.id_number && (
                  <span className='text-red-500'>
                    Id Number is required
                  </span>
                )}
              </div>
            </div>
              <div className='w-[280px] mt-2'>
                <label
                  htmlFor='organization_name'
                  className='text-sm font-semibold text-[#333333] '
                >
                  Advanced payment
                </label>
                <div className='mt-2.5 relative'>
                  <RiRectangleLine className={`absolute text-2xl left-4 ${errors.advancedPayment ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                  <input
                    type='text'
                    placeholder='Input number of visitor'
                    className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.id_number ? 'border-red-500' : ''
                      }`}
                    {...register('advancedPayment',{required:true})}
                  />
                  {errors.advancedPayment&& (
                    <span className='text-red-500'>
                     Advanced payment are required
                    </span>
                  )}
                </div>
              </div>
            </div>


            <div className='w-[600px]   flex justify-between '>
            <div className='w-[280px] mt-2'>
              <label
                htmlFor='organization_name'
                className='text-sm font-semibold text-[#333333] '
              >
                Remaning Payment
              </label>
              <div className='mt-2.5 relative'>
                <RiRectangleLine className={`absolute text-2xl left-4 ${errors.remainingPayment ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                <input
                  type='text'
                  placeholder='Input number of visitor'
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.id_number ? 'border-red-500' : ''
                    }`}
                  {...register('remainingPayment',{required:true})}
                />
                {errors.remainingPayment && (
                  <span className='text-red-500'>
                    remaining payment is required
                  </span>
                )}
              </div>
            </div>
            <div className='w-[280px] mt-2'>
              <label
                htmlFor='organization_name'
                className='text-sm font-semibold text-[#333333] '
              >
                Payment method
              </label>
              <div className='mt-2.5 relative'>
                <RiRectangleLine className={`absolute text-2xl left-4 ${errors.paymentmethod ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                <input
                  type='text'
                  placeholder='Input number of visitor'
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.id_number ? 'border-red-500' : ''
                    }`}
                  {...register('paymentmethod',{required:true})}
                />
                {errors.paymentmethod && (
                  <span className='text-red-500'>
                    paymentmethod is required
                  </span>
                )}
              </div>
            </div>
          </div>







          </div>



        </div>
        <div className='w-[320px] my-10'>
          <DefaultButton text="Continue" />
        </div>

      </form>
    </div>

  );
};

export default VisitForm;