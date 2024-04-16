'use client'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/modules/axios'
import { useEffect, useState } from 'react'
import { MdPersonOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ReCAPTCHA from "react-google-recaptcha";
import '../../scrollbar.css'
import { MdOutlineVisibility } from "react-icons/md";
import scan from '../../assets/scan with circle.png';
import dots from '../../assets/dot shape.png'
import { MdOutlineVisibilityOff } from "react-icons/md";
import AuthSlider from '@/modules/auth-component/AuthSlider'
import { baseurl } from '@/modules/apiurl'

const Page = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const storedPassword =
    typeof window !== 'undefined' ? localStorage.getItem('password') : ''

  const [password, setPassword] = useState(storedPassword || '')
  const [isloading, setisloading] = useState(false)
  const [isvisiable, setisvisiable] = useState(false)
  const onLoginSubmit = async data => {
    try {
      setisloading(true)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      console.log(data.mobile_number)
      if(emailRegex.test(data.mobile_number)){
        console.log(data)
        const data1={
          "username": data.mobile_number,
        "password":data.password,
          "login_type":"email"
        }
        const response = await axiosInstance.post('/user/login/', data1);
        if (response.status === 200) {
          localStorage.setItem('access', response.data.access)
          localStorage.setItem('refresh', response.data.refresh)
          toast.success('Logged in Successfully')
           router.push('/dash')
            // setisloading(false);
      
           
        } else {
          setisloading(false);
          toast.error('Login Failed, check your credentials')
        }
      }else{
        const data1={
          "username": data.mobile_number,
        "password":data.password,
          "login_type":"mobile"
        }
        const response = await axiosInstance.post('/user/login/', data1);
        console.log(data);
        if (response.status === 200) {
          localStorage.setItem('access', response.data.access)
          localStorage.setItem('refresh', response.data.refresh)
          toast.success('Logged in Successfully')
           router.push('/dash')
            // setisloading(false);
      
           
        } else {
          setisloading(false);
          toast.error('Login Failed, check your credentials')
        }
      }
     
    } catch (error) {
      setisloading(false);
      console.log(error)
      if(error.response.status===500 ||error.response.status===404){
        toast.error('Login Failed, Try Again')
      }else{
        if (error && Object.values(error?.response?.data || []).length >= 1) {
          Object.values(error?.response?.data).map(e =>
            toast.error(e)
          )
        } else {
          toast.error('Login Failed, Try Again')
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
      <div className='grid px-5 py-2 somecontainer font-inter  md:grid-cols-2 max-w-9xl xl:px-32'>
        <div id='container' className='flex items-start container  justify-start px-4  bg-white md:px-0  lg:py-10'>
          <div className='xl:w-full xl:max-w-[568px] 2xl:max-w-[568px]'>
          <div className=" text-center text-black  flex justify-between items-center" >
          <Image src={`${baseurl}/media/logo/epass.png`} alt="" className='h-11' width={150} height={44}/>
          <p>Dont have an account? <span className=''><Link
                href='/register'
                title='Create free account at epass'
                className='ml-1 font-medium text-[#0F75BC] transition-all duration-200 hover:text-[#0F75BC] hover:underline focus:text-blue-700'
              >
                Register
              </Link></span></p>
        </div>
            <h2 className='text-2xl font-semibold leading-tight mt-16 text-black sm:text-3xl'>
              Login
            </h2>
            <p className='mt-2 text-sm text-[#090A0A] font-normal'>
            To log in, input your registered mobile number or email and password
              
            </p>
            <form
              onSubmit={handleSubmit(onLoginSubmit)}
              method='POST'
              className='mt-8'
            >
              <div className='space-y-5'>
                <div>
                  <label
                    htmlFor='mobile_number'
                    className='text-sm font-normal text-[#A3A3A3]'
                  >
                  
                   Email address or Mobile Number
                  </label>
                  <div className='mt-2.5 relative'>
  <MdPersonOutline  className={`absolute text-2xl left-4 ${errors.mobile_number?"top-1/3":"top-1/2"}  transform -translate-y-1/2 text-gray-400`} />
  <input
    type='tel'
    {...register('mobile_number', {
      required: 'Mobile number is required'
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
                  <div className='flex items-center justify-between'>
                    <label
                      htmlFor='password'
                      className='text-sm font-normal text-[#A3A3A3]'
                    >
                      Password
                    </label>
                   
                  </div>
                  <div className='mt-2.5 relative'>
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
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.password ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.password && (
                      <p className='mt-1 text-red-500'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

               <div className='flex justify-between'>
               <div>
                  <label
                    className='flex items-center font-bold text-gray-500'
                    htmlFor='remember'
                  >
                    <input
                      className='ml-2 leading-tight w-[20px] h-[20px] rounded-lg'
                      type='checkbox'
                      id='remember'
                      name='remember'
                    />
                    <span className='ml-1 text-sm font-normal'>Remember me</span>
                  </label>
                </div>
                <Link
                      href='/forgot'
                      title='forgot password'
                      className='text-sm font-medium text-[#0F75BC] hover:underline hover:text-blue-700 focus:text-blue-700'
                    >
                      Forgot password?
                    </Link>
               </div>
               {/* <div  className="scale-y-75">
               <ReCAPTCHA sitekey="6Lc1y0cpAAAAAE3OsvRxK4-HNY_11MTnsYJe1NEL"/>
               </div> */}
              
                <div className='z-20'>
                  <button
                    type='submit'
                    className='inline-flex items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                  >
                    {isloading===false?"Log in":"Loading"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='h-full w-[50%] md:flex text-white hidden overflow-hidden  flex-col items-center   justify-center pt-8 bg-primary fixed right-0 top-0 z-10 px-4 py-10 bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] border-l sm:py-16 lg:py-24'>
          <AuthSlider/>
          <Image width={300} src={dots}  alt='' className='absolute -top-20 rotate-180 -right-28'/>
        <Image  height={250} src={dots} alt='' className='absolute bottom-0   -left-44'/>
        <p className='text-sm font-light mt-2 font-inter absolute bottom-0'>
        © 2024 ePass. All Rights Reserved. 
        </p>
        {/* 
       
          <Image width={360} src={scan} alt='' className=''/>
          <h1 className='text-3xl font-semibold mt-6 font-inter'>Epass Account</h1>
          <p className='text-sm font-light mt-2'>Manage your daily transactions easily</p> */}
          {/* <div className='flex gap-1 mt-4'>
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
    </>
  )
}

export default Page
