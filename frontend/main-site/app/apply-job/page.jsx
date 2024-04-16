"use client"
import DefaultButton from '@/modules/core-ui/Buttons'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { LuUpload } from 'react-icons/lu'

export default function Appplyjob() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
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
  return (
    <div className='bg-bgcolor font-inter lg:w-full w-[1200px]'>
<p className='font-bold text-[65px] pt-20 font-inter text-center leading-[70px]'><span className='text-primaryblue'> Junior </span>UI/UX Designer

</p>
<div className='flex gap-3 mt-3 justify-center' >
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Full Time
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Design
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Remote
</div>
</div>
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
                       rows="3"
                        type='text'
                        placeholder='Input your message'
                        className={`block w-full p-4  text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 
                          `}
                       
                      />
                      
                    </div>
                  </div>
                  <div className='flex flex-col mt-6 '>
    <input
type="file"
accept="image/*"
onChange={handleImageChange}
style={{ display: 'none' }}
ref={fileInputRef}
/>
<p className='text-sm font-semibold text-[#333333]'>Upload your resume/cv</p>
{selectedImage===null ?<>
<div className='w-[700px] h-[140px] bg-white mt-2 flex flex-col gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
<LuUpload className="text-base text-[#A3A3A3]"/>
<p className='text-sm font-normal leading-6 text-center text-[#A3A3A3]'><span className='text-primaryblue cursor-pointer' onClick={handleImageClick}>Upload your resume</span>  or drag and drop it here <br />
Only .doc, .docx, .pdf, .odt, .rtf</p>
</div>
</>:<>
{selectedImage?<div className='w-[700px] bg-white h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
<Image src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
alt="Selected" className='object-contain h-[100px]' onClick={handleImageClick} width={150} height={150}/>
</div>:<>
<div className='w-[700px] h-[140px] mt-2 bg-white flex flex-col gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
<LuUpload className="text-base text-[#A3A3A3]"/>
<p className='text-sm font-normal text-center leading-6 text-[#A3A3A3]'><span className='text-primaryblue cursor-pointer' onClick={handleImageClick}>Upload your resume</span>  or drag and drop it here <br />
Only .doc, .docx, .pdf, .odt, .rtf</p></div>
</>}

</>}

    </div>
                 <div className='w-[700px]'>
                 <DefaultButton text="Submit"/>
                 </div>
</div>
    </div>
  )
}
