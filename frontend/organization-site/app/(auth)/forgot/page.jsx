'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axiosInstance from '@/modules/axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import scan from '../../assets/qr scan with circle.png';
import dots from '../../assets/dot shape.png'
import Image from 'next/image'
import { MdPersonOutline } from "react-icons/md";
import { useAtom } from 'jotai'
import { phonenumberdataAtom } from '@/jotai/dash-atoms'
import AuthSlider from '@/modules/auth-component/AuthSlider'
import { baseurl } from '@/modules/apiurl'
function ForgotPassword () {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [value,setvalue]=useAtom(phonenumberdataAtom)
  useEffect(() => {
    const initialValue = document.body.style.zoom;
  
    // Change zoom level on mount
    document.body.style.zoom = "85%";
    return () => {
      document.body.style.zoom = initialValue;
    };
  }, [])
  const onSubmit = async data => {
    
    try {
      const response = await axiosInstance.post('/user/forgot-password/', data)
console.log(response)
      if (response.status === 200) {
        toast.success('OTP sent for password reset. Check your mobile.')
        router.push(`/reset`);
        setvalue({number:data.mobile_number})
      }
    } catch (error) {
      console.log(error)
      toast.error('OTP sending failed. please check your number and try again.')
    }
  }

  return (
    <div className='grid px-5 py-2 mx-auto font-inter xl:px-32 md:grid-cols-2 max-w-9xl'>
      <div className='flex items-center justify-start px-4 py-10 bg-white md:px-0 '>
        <div className='xl:w-full xl:max-w-[460px] 2xl:max-w-[540px]'>
        <Image src={`${baseurl}/media/logo/epass.png`} alt="" className='h-11' width={150} height={44}/>
          <h2 className='text-2xl font-bold leading-tight text-black sm:text-4xl mt-10'>
            Forgot Password
          </h2>
          {/* You can add a link to the login page here */}
          <p className='mt-2 text-xs text-[#090A0A] font-normal font-inter'>
          The OTP has been sent to your email and mobile number to reset the password.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
            <div className='space-y-5'>
            <div>
                  <label
                    htmlFor='mobile_number'
                    className='text-sm font-normal text-[#A3A3A3]'
                  >
                   Username (Mobile Number or Email)
                  </label>
                  <div className='mt-2.5 relative'>
  <MdPersonOutline  className={`absolute text-2xl left-4 ${errors.mobile_number?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />
  <input
    type='tel'
    {...register('mobile_number', {
      required: 'Username is required'
    })}
    placeholder='Input your mobile number or email'
    className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.mobile_number ? 'border-red-500' : ''
      }`}
  />
  {errors.mobile_number && (
    <p className='mt-1 text-red-500'>
      {errors.mobile_number.message}
    </p>
  )}
</div>

                </div>

              <div>
                <button
                  type='submit'
                  className='inline-flex items-center mt-10 bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                 Continue
                </button>
              </div>
              <div className='flex items-center justify-center mt-5'>
              <Link
                href='/login'
                title='login now'
                className='text-base font-normal text-center'
              >
                Go Back
              </Link>
              </div>
             
            </div>
          </form>
        </div>
      </div>
      <div className='h-full w-[50%] lg:flex text-white hidden overflow-hidden  flex-col items-center   justify-center pt-8 bg-primary fixed right-0 top-0 z-10 px-4 py-10 bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] border-l sm:py-16 lg:py-24'>
        <Image width={300} src={dots}  alt='' className='absolute -top-20 rotate-180 -right-28'/>
        <Image  height={250} src={dots} alt='' className='absolute bottom-0   -left-44'/>
          {/* <Image width={360} src={scan} alt='' className=''/> */}
          <AuthSlider/>
          {/* <h1 className='text-3xl font-semibold mt-6'>Epass Account</h1>
          <p className='text-sm font-light mt-2'>Manage your daily transactions easily</p>
          <div className='flex gap-1 mt-4'>
          <div className='h-2 w-5 rounded-2xl bg-[#25AAE1]'>

          </div>
          <div className='h-2 w-2 rounded-full bg-white'>

          </div>
        
<div className='h-2 w-2 rounded-full bg-white'>

</div>
          </div> */}
          {/* <div>
            <Image
              width={400}
              height={400}
              className='w-full mx-auto'
              src='/qr-scanning.svg'
              alt='qr-scanning'
            />
            <div className='w-full mx-auto mt-5 xl:max-w-lg'>
              <h3 className='text-2xl font-bold text-center text-black'>
                Get Your Own QR
              </h3>
              <p className='leading-relaxed text-center text-gray-500 mt-2.5 text-xs'>
                Epass revolutionizes the entry management system with QR
                technology. Say goodbye to paperwork and hello to a seamless
                digital entry experience. Register your organization today and
                join the paperless future of efficient entry management.
              </p>
              <div className='flex items-center justify-center mt-10 space-x-3'>
                <div className='bg-orange-500 rounded-full w-20 h-1.5' />
                <div className='bg-gray-200 rounded-full w-12 h-1.5' />
                <div className='bg-gray-200 rounded-full w-12 h-1.5' />
              </div>
            </div>
          </div> */}
        </div>
    </div>
  )
}

export default ForgotPassword
