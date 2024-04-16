import AboutComponent from '@/modules/ui/AboutComponent'
import React from 'react'

export default function page() {
  return (
    <div className='pt-20 bg-bgcolor lg:w-full w-[1200px] flex flex-col items-center justify-center'>
        <p className='font-bold text-[65px] font-inter text-center leading-[70px]'>We are the people who <br /><span className='text-primaryblue'>compelling </span> the stories</p>
        <p className='w-[800px] font-normal text-xl text-center mt-10'>Lorem ipsum dolor sit amet consectetur. Suscipit vel pharetra auctor nibh convallis ac turpis. Eu eget amet ornare aliquet vel eu id id. Enim eget nullam elit magna massa consequat.</p>
<AboutComponent/>

    </div>
  )
}
