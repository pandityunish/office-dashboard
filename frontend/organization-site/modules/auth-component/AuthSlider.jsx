import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import scan from '../../app/assets/scan with circle.png';
import scan1 from '../../app/assets/time with circle.png';
import scan2 from '../../app/assets/qr scan with circle.png';


import Image from 'next/image';

export default function AuthSlider() {
  return (
    
 <Swiper  style={{
    "--swiper-pagination-color": "#25AAE1",
    "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-size": "10px",
    "--swiper-pagination-bullet-horizontal-gap": "3px"
  }} pagination={true}  autoplay={{
    delay: 2500,
    disableOnInteraction: true,
  }} modules={[Autoplay, Pagination]} className='h-[537px] w-[624.975px] '>
        <SwiperSlide className='flex flex-col items-center justify-center '>
            <div className='flex flex-col items-center justify-center'>
            <Image width={360} src={scan} alt='' className=''/>
            <h1 className='text-3xl font-semibold mt-6 font-inter'>Epass Account</h1>
          <p className='text-sm font-light mt-2'>Manage your daily transactions easily</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='flex flex-col items-center justify-center'>
            <Image width={360} src={scan1} alt='' className=''/>
            <h1 className='text-3xl font-semibold mt-6 font-inter '>Cut out manual processes, save time!</h1>
          <p className='text-sm font-light mt-2 font-inter w-[70%]'>Embrace a faster, safer, and more convenient entry process with our QR-Based Entry System, eliminating the hassle of paperwork.</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='flex flex-col items-center justify-center'>
            <Image width={360} src={scan2} alt='' className=''/>
            <h1 className='text-3xl font-semibold mt-6 font-inter '>Epass Account</h1>
          <p className='text-sm font-light mt-2'>Manage your daily transactions easily</p>
            </div>
        </SwiperSlide>
     
      </Swiper>
 
  )
}
