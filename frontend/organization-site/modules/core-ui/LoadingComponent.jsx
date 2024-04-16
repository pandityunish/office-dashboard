'use client'

import Image from 'next/image';
import * as React from 'react'
import { baseurl } from '../apiurl';

export default function LoadingComponent () {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 1) % 101);
    }, 50);

    const loaderTime = 5000;

    setTimeout(() => {
      clearInterval(interval);
    }, loaderTime);

    return () => clearInterval(interval);
  }, []);
  
  const gradientColor = `linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 69, 223, ${progress / 100}))`;

  

  return (
   <div className='flex items-center flex-col justify-center mt-10 h-[100vh] w-[100%]'>
               <Image src={`${baseurl}/media/logo/epass.png`} alt="" className='h-14 ' width={150} height={44}/>

     <div className="w-[287px] bg-black h-[3px] mt-10 rounded overflow-hidden shadow-2xl">
      <div className="h-full bg-blue-500 transition-all duration-500 "  style={{ width: `${progress}%`, backgroundImage: gradientColor,  }}></div>
    </div>
   </div>
  )
}
