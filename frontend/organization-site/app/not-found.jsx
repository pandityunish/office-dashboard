'use client'

import DefaultButton from "@/modules/core-ui/Button";
import { useEffect } from "react"
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router=useRouter()
  useEffect(() => {
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    document.body.style.zoom = "70%";
    return () => {
      document.body.style.zoom = initialValue;
    };
  }, [])
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
     <Image src="/notfound.jpg" alt="" className=" mt-20" width={600} height={200}/>
     <h1 className="font-bold text-2xl lg:text-5xl text-center leading-[100px]">We’ve lost this page</h1>
     <p className="font-inter text-base lg:text-2xl text-center font-medium text-greyneutral py-5">Sorry, the page you are looking for doesn’t exist or has been moved</p>
     <div className="lg:w-[568px] w-[200px] mt-8" onClick={()=>{
      router.push("/dash")
     }}>
     <DefaultButton text="Back to home"/>
     </div>
    
    </div>
  )
}
