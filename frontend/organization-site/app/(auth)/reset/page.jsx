'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axiosInstance from '@/modules/axios'
import {  useRouter  } from 'next/navigation'
import Link from 'next/link'
import dots from '../../assets/dot shape.png'
import scan from '../../assets/qr scan with circle.png';
import Image from 'next/image'
import DefaultButton from '@/modules/core-ui/Button'
import { useAtom } from 'jotai'
import { phonenumberdataAtom } from '@/jotai/dash-atoms'
import AuthSlider from '@/modules/auth-component/AuthSlider'
import { baseurl } from '@/modules/apiurl'
function ResetPassword () {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [value1,setvalue]=useAtom(phonenumberdataAtom)
  useEffect(() => {
    const initialValue = document.body.style.zoom;
  
    // Change zoom level on mount
    document.body.style.zoom = "80%";
    return () => {
      document.body.style.zoom = initialValue;
    };
  }, [])
  
  const onSubmit = async data => {
    try {
      console.log(value1.number)
      const data1={
        ...data,
        mobile_number:value1.number
      }
      const response = await axiosInstance.put('/user/reset-password/', data1)

      if (response.status === 200) {
        toast.success('Password reset successful. Please login.')
        router.push('/login')
      }
    } catch (error) {
      toast.error('Password reset failed. Please try again.')
    }
  }

  return (
    <div className='grid px-5 py-2 mx-auto lg:px-32 md:grid-cols-2 max-w-9xl'>
      <div className='flex items-center justify-start px-4 py-10 bg-white md:px-0 '>
        <div className='xl:w-full xl:max-w-md 2xl:max-w-xl'>
        <Image src={`${baseurl}/media/logo/epass.png`} alt="" className='h-11' width={150} height={44}/>
          <h2 className='text-2xl font-bold leading-tight text-black sm:text-4xl mt-6'>
             Reset Password
          </h2>
         
          <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
            <div className='space-y-5'>
              
              <div>
                <label
                  htmlFor='otp'
                  className='text-base font-medium text-gray-900'
                >
                  OTP
                </label>
                <div className='mt-2.5'>
                  <input
                    type='text'
                    placeholder='Enter OTP'
                    className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                    {...register('otp', { required: true })}
                  />
                  {errors.otp && (
                    <span className='text-red-500'>OTP is required</span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor='newPassword'
                  className='text-base font-medium text-gray-900'
                >
                  New Password
                </label>
                <div className='mt-2.5'>
                  <input
                    type='password'
                    placeholder='Enter New Password'
                    className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                    {...register('new_password', { required: true })}
                  />
                  {errors.newPassword && (
                    <span className='text-red-500'>
                      New Password is required
                    </span>
                  )}
                </div>
              </div>

              

              <div>
                <DefaultButton text="Reset Password"/>
                {/* <button
                  type='submit'
                  className='inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                  Reset Password
                </button> */}
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
         
        </div>
    </div>
  )
}

export default ResetPassword
