import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import scan from "../../app/assets/scan with circle.png";
import scan1 from "../../app/assets/time with circle.png";
import scan2 from "../../app/assets/qr scan with circle.png";

import "swiper/css";
import "swiper/css/pagination";

export default function AuthSlider() {
  return (
    <div className="h-full w-[50%] lg:flex text-white hidden overflow-hidden  flex-col items-center   justify-center pt-8 bg-primary fixed right-0 top-0 z-10 px-4 py-10 bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] border-l sm:py-16 lg:py-24">
      <Swiper
        style={{
          "--swiper-pagination-color": "#25AAE1",
          "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "10px",
          "--swiper-pagination-bullet-horizontal-gap": "3px",
        }}
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        modules={[Autoplay, Pagination]}
        className="h-[537px] w-[624.975px] "
      >
        <SwiperSlide className="flex flex-col items-center justify-center ">
          <div className="flex flex-col items-center justify-center">
            <Image width={360} src={scan} alt="" className="" loading="lazy" />
            <h1 className="text-3xl font-semibold mt-6 font-inter">
              Epass Account
            </h1>
            <p className="text-sm font-light mt-2">
              Manage your daily transactions easily
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center">
            <Image width={360} src={scan1} alt="" className="" loading="lazy" />
            <h1 className="text-3xl font-semibold mt-6 font-inter ">
              Cut out manual processes, save time!
            </h1>
            <p className="text-sm font-light mt-2 font-inter w-[70%]">
              Embrace a faster, safer, and more convenient entry process with
              our QR-Based Entry System, eliminating the hassle of paperwork.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center">
            <Image width={360} src={scan2} alt="" className="" loading="lazy" />
            <h1 className="text-3xl font-semibold mt-6 font-inter ">
              Epass Account
            </h1>
            <p className="text-sm font-light mt-2">
              Manage your daily transactions easily
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
      <p className="text-sm font-light mt-2 font-inter absolute bottom-0">
        © 2024 ePass. All Rights Reserved.
      </p>
    </div>
  );
}
