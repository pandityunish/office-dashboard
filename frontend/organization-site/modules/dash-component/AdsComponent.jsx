import React, { useEffect, useRef, useState } from 'react'
import { getadsbanner } from '../data/dash_service';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { baseurl } from '../apiurl';
export default function AdsComponent() {


 

const [banner, setbanner] = useState(null)
useEffect(() => {

  getadsbanner({setbanner:setbanner})

}, []);

  return (
    <Swiper  style={{
      "--swiper-pagination-color": "#25AAE1",
      "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
      "--swiper-pagination-bullet-inactive-opacity": "1",
      "--swiper-pagination-bullet-size": "10px",
      "--swiper-pagination-bullet-horizontal-gap": "3px"
    }} pagination={true} autoplay={{
      delay: 2500,
      disableOnInteraction: true,
    }} modules={[Autoplay, Pagination]} className=' w-[340px]  mt-5'>
      {banner===null?<></>:<>
      {banner.results.map((e,i)=>{
            return <SwiperSlide key={i} className='flex flex-col items-center justify-center '>
             
            <img  src={`${baseurl}${e.image_path}`} alt='' className='h-[199px] w-full rounded-xl'/>
         
        </SwiperSlide>
          })}
      </>}
          
         
       
        </Swiper>

  )
}
