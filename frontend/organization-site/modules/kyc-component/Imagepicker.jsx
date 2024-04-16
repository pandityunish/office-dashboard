import Image from 'next/image'
import React from 'react'

export default function Imagepicker({title,handleImageChange,fileInputRef,selectedImage,handleImageClick,LuUpload}) {
  return (
    <div className='flex flex-col mt-6'>
    <input
type="file"
accept="image/*"
onChange={handleImageChange}
style={{ display: 'none' }}
ref={fileInputRef}
/>
<p className='text-sm font-semibold text-[#333333]'>{title}</p>
{selectedImage===null ?<>
<div className='w-[619px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
<LuUpload className="text-base text-[#A3A3A3]"/>
<p className='text-base font-normal leading-6 text-[#A3A3A3]'>Drag & drop file or <span className='text-primaryblue cursor-pointer' onClick={handleImageClick}>Browse</span></p>
</div>
</>:<>
{selectedImage?<div className='w-[619px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
<Image src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
alt="Selected" className='object-contain h-[100px]' onClick={handleImageClick} width={150} height={150}/>
</div>:<>
<div className='w-[619px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
<LuUpload className="text-base text-[#A3A3A3]"/>
<p className='text-base font-normal leading-6 text-[#A3A3A3]'>Drag & drop file or <span className='text-primaryblue cursor-pointer' onClick={handleImageClick}>Browse</span></p>
</div>
</>}

</>}

    </div>
  )
}
