'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useForm,SubmitHandler  } from 'react-hook-form'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import { MdArrowDropDown } from "react-icons/md";
import { PiBagSimpleBold } from "react-icons/pi";
import '../../scrollbar.css'
import {
  organizationNatureTypes,
  organizationTypes
} from '@/modules/data/organization_types_nature'
import { userDataAtom } from '@/jotai/dash-atoms'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/modules/axios'
import scan from '../../assets/time with circle.png';
import dots from '../../assets/dot shape.png'
import { FaRegAddressCard } from "react-icons/fa6";

import { MdPersonOutline } from 'react-icons/md'
import { CgOrganisation } from "react-icons/cg";
import { FaMobileAlt } from "react-icons/fa";

import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from 'react-icons/ci'
import { useEffect, useState } from 'react'
import AuthSlider from '@/modules/auth-component/AuthSlider'
import { baseurl } from '@/modules/apiurl'

export default function Register () {
  const router = useRouter()
  const [userData, setUserData] = useAtom(userDataAtom)
const [isvisiable, setisvisiable] = useState(false)
const [conisvisiable, consetisvisiable] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  const onRegisterSubmit = async data => {
    console.log(data)
    try {
      // router.push('/verify')
      const orgnaization_registration_data = {
        ...data,
        is_organization: true,
        full_name: data.organization_name
      }
      console.log(orgnaization_registration_data);
      const response = await axiosInstance.post(
        '/user/register/',
        orgnaization_registration_data
      )
     
    
      console.log(response.data)
      if (response.status === 201) {
        console.log(response, response.status)
        setUserData({ ...response.data })
        toast.success('Welcome, Successfully Registered')
        router.push('/verify')
      }
      else{
        const data=response.data;
        console.log(data)
        toast.error('Registration Failed, Try Again')
      }
    } catch (error) {
      console.log(error.response)
      if(error.response.status===500 ||error.response.status===404){
        toast.error('Registration Failed, Try Again')
      }else{
        if (error && Object.values(error?.response?.data || []).length >= 1) {
          Object.values(error?.response?.data).map(e =>
            toast.error(e[0].charAt(0).toUpperCase() + e[0].slice(1))
          )
        } else {
          toast.error('Registration Failed, Try Again')
        }
      }
      
    }
  }
  useEffect(() => {
    const initialValue = document.body.style.zoom;
  
    // Change zoom level on mount
    document.body.style.zoom = "80%";
    return () => {
      document.body.style.zoom = initialValue;
    };
  }, [])
  return (
    <>
      <div id='container' className='grid px-5 py-2 overflow-y-scroll mx-auto xl:px-32 md:grid-cols-2 font-inter max-w-9xl'>
        <div   className='flex flex-col '>

       
        <div  className='flex  items-center justify-start px-4  py-10 bg-white md:px-0 mr-4'>
       
          <div className='xl:max-w-[568px] 2xl:max-w-[568px]'>
          <div className=" text-center text-black  flex justify-between items-center" >
          <Image src={`${baseurl}/media/logo/epass.png`} alt="" className='h-11' width={150} height={44}/>
          <p> Already have an account? <span className=''><Link
                href='/login'
                title='Create free account at epass'
                className='ml-1 font-medium text-[#0F75BC] transition-all duration-200 hover:text-[#0F75BC] hover:underline focus:text-blue-700'
              >
                Login
              </Link></span></p>
        </div>
          <h2 className='text-2xl font-semibold leading-tight mt-16 text-black sm:text-3xl'>
              Register
            </h2>
            <p className='mt-2 text-sm text-[#090A0A] font-normal font-inter'>
            Get started with Epass by filling in all the necessary details.
              
            </p>
          
         
            <form 
            onSubmit={handleSubmit(onRegisterSubmit)} 
            className='mt-6'>
              <div className='space-y-5'>
                <div>
                  <label
                    htmlFor='organization_name'
                    className='text-sm font-normal text-[#A3A3A3] '
                  >
                    Office Name
                  </label>
                  <div className='mt-2.5 relative'>
                  <CgOrganisation  className={`absolute text-2xl left-4 ${errors.organization_name?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                    <input
                      type='text'
                      placeholder='Input your office full name'
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.organization_name ? 'border-red-500' : ''
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
                <div className=' w-full  gap-2'>
                  <section>
                    <label
                      htmlFor='organization_type'
                      className='text-sm font-normal text-[#A3A3A3]'
                    >
                      Office Type
                    </label>
                    <div className='mt-2.5 relative'>
  <select
    className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
    {...register('organization_type', { required: true })}
  >
    <option value="" className='text-[#A3A3A3] '>
      Select your office type
    </option>
    {organizationTypes.map(org => (
      <option key={org.id} value={org.value} className='text-sm  font-normal text-[#A3A3A3]'>
        {org.title}
      </option>
    ))}
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    {/* Adjust the positioning of the dropdown button here */}
   <MdArrowDropDown />
  </div>
    {/* Adjust the positioning of the dropdown button here */}
   <PiBagSimpleBold className={`absolute text-2xl left-4 ${errors.organization_type?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`}/>
 
  {errors.organization_type && (
    <span className='text-red-500'>
      Please select office type
    </span>
  )}
</div>


                  </section>
                  
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='text-sm font-normal text-[#A3A3A3]'
                  >
                    Contact Person Name
                  </label>
                  <div className='mt-2.5 relative'>
                  <MdPersonOutline  className={`absolute text-2xl left-4 ${errors.full_name?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                    <input
                      type='text'
                      placeholder='Input contact person name'
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.full_name ? 'border-red-500' : ''
                    }`}
                      {...register('full_name', { required: true })}
                    />
                    {errors.full_name && (
                      <span className='text-red-500'>Person Name is required</span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='text-sm font-normal text-[#A3A3A3]'
                  >
                    E-mail
                  </label>
                  <div className='mt-2.5 relative'>
                  <MdOutlineMailOutline  className={`absolute text-2xl left-4 ${errors.email?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                    <input
                      type='email'
                      placeholder='Enter E-mail'
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.email ? 'border-red-500' : ''
                    }`}
                      {...register('email', { required: true })}
                    />
                    {errors.email && (
                      <span className='text-red-500'>Email is required</span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='mobile_number'
                    className='text-sm font-normal text-[#A3A3A3]'
                  >
                    Mobile Number
                  </label>
                  <div className='mt-2.5 relative'>
                  <FaMobileAlt  className={`absolute text-2xl left-4 ${errors.mobile_number?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />
                    <input
                      type='tel'
                      placeholder='Enter Mobile Number '
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.mobile_number ? 'border-red-500' : ''
                    }`}
                      {...register('mobile_number', { required: true })}
                    />
                    {errors.mobile_number && (
                      <span className='text-red-500'>
                        Mobile number is required
                      </span>
                    )}
                  </div>
                </div>
               
                <div>
                  <label
                    htmlFor='password'
                    className='text-sm font-normal text-[#A3A3A3]'
                  >
                    Password
                  </label>
                  <div className='mt-2.5 relative'>
                  <CiLock  className={`absolute text-2xl left-4 ${errors.password?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />
                  <MdOutlineVisibility  className={`absolute text-2xl right-4 ${errors.password?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />
                  <div onClick={()=>{
                    setisvisiable(!isvisiable)
                  }} className='cursor-pointer'>
                  {isvisiable===false?
                  <MdOutlineVisibility  className={`absolute text-2xl right-4 ${errors.password?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />:
                  <MdOutlineVisibilityOff  className={`absolute text-2xl right-4 ${errors.password?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />
                }  
                  </div>
                    <input
                      type={`${isvisiable==false?"password":"text"}`}
                      placeholder='Enter your password'
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.password ? 'border-red-500' : ''
                    }`}
                      {...register('password', { required: true })}
                    />
                    {errors.password && (
                      <span className='text-red-500'>Password is required</span>
                    )}
                  </div>
                </div>
                
                <div>
                <div>
                  <label
                    className='flex items-start  text-gray-500 mb-4'
                    // htmlFor='remember'
                  >
                    <input
                      className='ml-2 mt-1 leading-tight w-[20px] h-[20px]'
                      type='checkbox'
                      id='remember'
                      name='remember'
                    />
                    <span className='ml-1 text-base font-inter font-normal'>I agree to <a href='www.google.com' target="_blank" className='text-[#7B61FF] cursor-pointer text-base font-inter font-normal' >Terms of Use</a > and acknowledge that I have read the <a href='www.google.com' target="_blank" className='text-[#7B61FF] cursor-pointer text-base font-inter font-normal' >Privacy Policy</a>.</span>
                  </label>
                </div>
                {/* <ReCAPTCHA sitekey="6Lc1y0cpAAAAAE3OsvRxK4-HNY_11MTnsYJe1NEL" /> */}

                  <button
                    type='submit'
                    
                    className='inline-flex items-center mt-4 bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                   
                  >
                    Register
                  </button>
                  
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='h-full w-[50%] lg:flex text-white hidden overflow-hidden  flex-col items-center   justify-center pt-8 bg-primary fixed right-0 top-0 z-10 px-4 py-10 bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] border-l sm:py-16 lg:py-24'>
        <Image width={300} src={dots}  alt='' className='absolute -top-20 rotate-180 -right-28'/>
        <Image  height={250} src={dots} alt='' className='absolute bottom-0   -left-44'/>
        <AuthSlider/>
        <p className='text-sm font-light mt-2 font-inter absolute bottom-0'>
        © 2024 ePass. All Rights Reserved.
        </p>
          {/* <Image width={360} src={scan} alt='' className=''/>
          <h1 className='text-3xl font-semibold mt-6 text-center font-inter'>Cut out the manual process, <br /> save time!</h1>
          <p className='text-sm font-light mt-2 text-center w-[70%] font-inter'>Embrace a faster,safer, and more confident convident entry with our QR-Based Entry sytem,eliminating the hassle of paperwork</p>
          <div className='flex gap-1 mt-4'>
          <div className='h-2 w-5 rounded-2xl bg-[#25AAE1]'>

          </div>
          <div className='h-2 w-2 rounded-full bg-white'>

          </div>
        
<div className='h-2 w-2 rounded-full bg-white'>

</div>
          </div> */}
         
        </div>
        {/* <div className='flex items-center justify-end px-4 py-10 border-l sm:py-16 lg:py-24'>
          <div>
            <Image
              width={500}
              height={500}
              className='w-full mx-auto'
              src='/qr-scanning.svg'
              alt='qr-scanning'
            />
            <div className='w-full mx-auto mt-5 xl:max-w-xl'>
              <h3 className='text-2xl font-bold text-center text-black'>
                Get Your Own QR
              </h3>
              <p className='leading-relaxed text-center text-gray-500 mt-2.5 text-xs'>
                Revolutionize your organization&apos;s entry management with
                Epass, where QR technology paves the way for a paperless future.
                Leave behind the clutter of paperwork and embrace the simplicity
                of a digital entry experience. Register today and be part of the
                wave of change in entry management.
              </p>
              <div className='flex items-center justify-center mt-10 space-x-3'>
                <div className='bg-orange-500 rounded-full w-20 h-1.5' />
                <div className='bg-gray-200 rounded-full w-12 h-1.5' />
                <div className='bg-gray-200 rounded-full w-12 h-1.5' />
              </div>
            </div>
          </div>
        </div> */}
      </div>
      </div>
    </>
  )
}
