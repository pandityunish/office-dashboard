import DefaultButton from '@/modules/core-ui/Buttons'
import Image from 'next/image'
import React from 'react'

export default function GetInTouch() {
  return (
    <div className='bg-bgcolor font-inter lg:w-full w-[1200px]'>
<p className='font-bold text-[65px] pt-20 font-inter text-center leading-[70px]'>Get in<span className='text-primaryblue'> Touch</span>

</p>
<p className=' font-normal text-xl text-center my-4 '>If you have anything to ask, feel free to send us a message</p>

<div className='flex flex-col items-center justify-center pb-40 mt-20 space-y-10'>
<div className='w-[700px]  '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Full Name
                    </label>
                    <div className='mt-[8px] relative'>

                      <input
                        type='text'
                        placeholder='Input branch full name'
                        className={`block w-full p-4  text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 
                          `}
                       
                      />
                      
                    </div>
                  </div>
                  <div className='w-[700px] gap-2 flex items-center justify-center'>
                  <div className='w-[375px]  '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Phone number
                    </label>
                    <div className='mt-[8px] relative'>
                        <div className='absolute flex items-center gap-2 justify-center left-4 top-1/2  transform -translate-y-1/2 text-gray-400'>
                           <Image src="/nepal.png" width={20} height={20} alt='some'/>
                           <p className='font-bold text-sm font-inter text-black'>Nepal (+977)  |</p>
                        </div>

                      <input
                        type='text'
                        placeholder='Input your phone number'
                        className={`block w-full p-4 pl-[150px]  text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 
                          `}
                       
                      />
                      
                    </div>
                  </div>
                  <div className='w-[335px]  '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Email address
                    </label>
                    <div className='mt-[8px] relative'>

                      <input
                        type='email'
                        placeholder='Input branch email address'
                        className={`block w-full p-4  text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 
                          `}
                       
                      />
                      
                    </div>
                  </div>
                  </div>
                  <div className='w-[700px]  '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Message
                    </label>
                    <div className='mt-[8px] relative'>

                      <textarea
                       cols="50"
                       rows="5"
                        type='text'
                        placeholder='Input your message'
                        className={`block w-full p-4  text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 
                          `}
                       
                      />
                      
                    </div>
                  </div>
                 <div className='w-[700px]'>
                 <DefaultButton text="Submit"/>
                 </div>
</div>
    </div>
  )
}
