'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Link from 'next/link'
import axiosInstance from '@/modules/axios'
import { useRouter } from 'next/navigation'
import { userDataAtom } from '@/jotai/dash-atoms'
import { useAtom } from 'jotai'
import scan from '../../assets/qr scan with circle.png';
import dots from '../../assets/dot shape.png'
import Image from 'next/image'
import { MdPersonOutline } from "react-icons/md";
import DefaultButton from '@/modules/core-ui/Button'
import AuthSlider from '@/modules/auth-component/AuthSlider'
import { baseurl } from '@/modules/apiurl'
function VerifyOTP () {
  const router = useRouter()
  const [userData, setUserData] = useAtom(userDataAtom)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [otpValue, setOTPValue] = useState(['', '', '', '', '', '']);
  const onSubmit = async data => {
    try {
      const text = otpValue.join('');
      
      const payload = { otp:text, mobile_number: userData.mobile_number }
      const response = await axiosInstance.post('/organization/verify-otp/', payload)

      if (response.status === 200) {
        toast.success('Verification successful. Please login.')
        router.push('/final')
      }else{
        toast.error('Verification failed. Please try again.')
      }
    } catch (error) {
     console.log(error.response)
      toast.error('Verification failed. Please try again.')
    }
  }

  const handleResendOTP = async () => {
    try {
      const response = await axiosInstance.post('/user/resend-otp', {
        mobile_number:userData.mobile_number
      })

      if (response.status === 200) {
        toast.success('OTP send successful.')
        
      }
    } catch (error) {
      console.log(error.response)
      toast.error('Cannot Send. Please try again.')
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

  const handleOTPChange = (newValue, index) => {
    console.log(newValue);
    const newOTPValue = [...otpValue];
    newOTPValue[index] = newValue;
    setOTPValue(newOTPValue);
    if (newValue !== '' && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    if (newValue === '' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  return (
    <div className='grid px-5 py-2 mx-auto font-inter xl:px-32 md:grid-cols-2 max-w-9xl'>
      <div className='flex items-center justify-start px-4 py-10 bg-white md:px-0 '>
        <div className='xl:w-full xl:max-w-[460px] 2xl:max-w-[540px]'>
        <Image src={`${baseurl}/media/logo/epass.png`} alt="" className='h-11' width={150} height={44}/>

        
          <h2 className='text-2xl font-bold leading-tight text-black sm:text-4xl mt-10'>
          Verification
          </h2>
          <p className='mt-2 text-xs text-[#090A0A] font-normal'>
          The OTP has been sent to your email and mobile number.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
            <div className='space-y-5'>
              <div>
                <label
                  htmlFor='otp'
                  className='text-base font-medium text-gray-900 '
                >
                Enter  OTP
                </label>
                <div className='mt-2.5'>
                <div className="flex">
      {Array.from({ length: 6 }).map((e, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={otpValue[index] || ''}
          onChange={(e1) => handleOTPChange(e1.target.value, index)}
          className="w-12 h-12 mx-1 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          // {...register('otp', { required: true })}
        />
      ))}
       
                  <button className='text-black bg-[#E0E0E0] rounded-md px-4 text-xs font-bold h-12 ml-2 '
                  onClick={()=>{
                    handleResendOTP()
                  }}
                  >
                    Resend Code
                  </button>
    </div>
    {errors.otp && (
                    <span className='text-red-500'>OTP is required</span>
                  )}  
                </div>
              </div>
              <div className='pt-8'>
             <DefaultButton text="Continue"/>
              </div>
              <div className='flex items-center justify-center'>
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
        <AuthSlider/>
          {/* <Image width={300} src={scan} alt='' className=''/>
          <h1 className='text-3xl font-semibold mt-6'>Epass Account</h1>
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

export default VerifyOTP
