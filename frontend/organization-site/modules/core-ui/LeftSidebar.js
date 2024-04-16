'use client'
import { useAtom } from 'jotai'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { showLeftSidebarAtom } from '@/jotai/ui-atoms'
import { useUserData } from '@/modules/hooks/useUserData'
import { GrOverview } from 'react-icons/gr'
import { GiTreeBranch } from 'react-icons/gi'
import { TbCircleFilled } from 'react-icons/tb'
import { FcSettings } from 'react-icons/fc'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { BsViewStacked } from "react-icons/bs";

import { MdOutlineClose } from 'react-icons/md'
import { BsClockHistory } from 'react-icons/bs'
import { BiDockTop } from 'react-icons/bi'
import { useQuery } from '@tanstack/react-query'
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { LuMessageSquare } from "react-icons/lu";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiSquareSplitHorizontalLight } from "react-icons/pi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdPersonOutline } from "react-icons/md";
import { TbTopologyStar } from "react-icons/tb";
import { FaRegClipboard } from "react-icons/fa";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import './scroll.css';
import {
  FaArrowsDownToPeople,
  FaClipboardList,
  FaMessage
} from 'react-icons/fa6'

import Image from 'next/image'
import axiosInstance from '../axios'
import CircularDays from '../dash-component/CircularDays'
import PreminumPlan from '../organization/PreminumPlan'
import ErrorDialog from './ErrorDialog'
import { baseurl } from '../apiurl'

const mainMenu = [
  { id: 1, menu: 'Scan Now', path: '/scan' },
  { id: 2, menu: 'Current Visitors', path: '/scan' },
  { id: 3, menu: 'Manual Entry', path: '/manual-entry' }
]

const menuList = [

  { id: 4, menu: 'Visitor', path: '/visitor-list', icon: FaPersonWalkingArrowRight },
  { id: 5, menu: 'Report', path: '/visitor-report', icon: HiOutlineDocumentReport },
]

const LeftSidebar = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
const [ishistoryexpanded, setishistoryexpanded] = useState(false);
const [kycData, setKycData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const [isadminopen, setisadminopen] = useState(false);
const [isbranchopen, setisbranchopen] = useState(false);
const [ismannualopen, setismannualopen] = useState(false)
const [isnotificationopen, setisnotificationopen] = useState(false);
useEffect(() => {
  // const fetchKYCData = async () => {
  //   try {
  //     const response = await axiosInstance.get('/organization/kyc/me', {
  //       headers: {
  //         Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage?.getItem('access') : ''}`
  //       }
  //     });
  //     setKycData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching KYC data:', error);
  //     setError(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // fetchKYCData(); // Initial data fetch

  // You can add dependencies to the dependency array if you want to re-fetch data based on certain changes
}, []);
const [open, setopen] = useState(false)
const handleClose=()=>{
  setopen(false)
 }
 const pageFullUrl = usePathname();
  const router = useRouter()
  const [showLeftSidebar, setShowLeftSidebar] = useAtom(showLeftSidebarAtom)

  return (
    <AnimatePresence>
      {showLeftSidebar && (
        <motion.section id='container'
          className='min-w-[256px] h-full  w-[256px] pt-6  flex  overflow-y-auto pb-3 flex-col items-start justify-start  bg-white text-black fixed left-0 top-0 z-10 '
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: '0%' }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.2 }}
          style={{
           
           
           
           
          }}
        >
           <ErrorDialog handleClose={handleClose} onclick={()=>{
router.replace("/login");
localStorage.clear();
      }} open={open} text={"logout?"}/>
          <div className='flex justify-between mt-3 mb-6 px-0.5   '>
            <section className='flex items-center justify-center px-7'>
          <Link href='/dash'>  <img src={`${baseurl}/media/logo/epass.png`} alt="" className='h-8 cursor-pointer'/></Link>
           
             
            </section>
           
          </div>
          <div className='flex flex-col items-center w-full'>
            <div className='flex  flex-col w-full px-4'>
            <div className='px-2 py-4 bg-[#E5F3FE] flex  cursor-pointer  items-center gap-3 h-[40px] text-primaryblue rounded-xl   w-full ' onClick={()=>{
              
             if(pageFullUrl==="/dash"){
              window.location.reload()
             }else{
              router.push("/dash");
             }
              
            }}>
              <MdOutlineDashboard className="text-2xl"/>
              <p className='font-inter font-bold text-sm'>Dashboard</p>
            </div>
            <div className='flex flex-col gap-5 w-full mt-4 pl-2'>
            <div  className='flex items-center w-full h-[21px] justify-between cursor-pointer' onClick={()=>{
                setisadminopen(!isadminopen)
                // router.push(menu.path)
              }}>
             <div className='flex gap-3 items-center text-neutralBlack'>
             <MdPersonOutline className="text-xl"/>
             <p className='text-sm font-bold font-inter text-neutralBlack'>Sub-admin</p>
             </div>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
              </div>
             {isadminopen===true?<div className='flex flex-col pl-8 -mt-2 space-y-2'>
              
              <div className='flex gap-3 items-center justify-between text-neutralBlack' onClick={()=>{
              router.push("/create-sub-admin")
              }}>

             <p className='text-xs font-bold font-inter text-neutralBlack cursor-pointer'>Create sub-admin</p>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
             </div>
             <div className='flex gap-3 items-center justify-between text-neutralBlack' onClick={()=>{
router.push("/sub-admin-list")
             }}>

             <p className='text-xs font-bold font-inter text-neutralBlack cursor-pointer'>All sub-admin</p>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
             </div>
            
             </div>:<></>}
              <div  className='flex items-center w-full h-[21px] justify-between cursor-pointer' onClick={()=>{
                setisbranchopen(!isbranchopen)
                // router.push(menu.path)
              }}>
             <div className='flex gap-3 items-center text-neutralBlack'>
             <TbTopologyStar className="text-xl"/>
             <p className='text-sm font-bold font-inter text-neutralBlack'>Branch</p>
             </div>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
              </div>
              {isbranchopen===true?<div className='flex flex-col pl-8 -mt-2 space-y-2'>
              
              <div className='flex gap-3 items-center justify-between text-neutralBlack cursor-pointer' onClick={()=>{
                router.push("/create-branch")
              }}>

             <p className='text-xs font-bold font-inter text-neutralBlack'>Create branch</p>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
             </div>
             <div className='flex gap-3 items-center justify-between text-neutralBlack cursor-pointer' onClick={()=>{
              router.push("/branch-list")
             }}>

             <p className='text-xs font-bold font-inter text-neutralBlack'>All branch</p>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
             </div>
            
             </div>:<></>}
             <div  className='flex items-center w-full h-[21px] justify-between cursor-pointer' onClick={()=>{
                setismannualopen(!ismannualopen)
                // router.push(menu.path)
              }}>
             <div className='flex gap-3 items-center text-neutralBlack'>
             <FaRegClipboard className="text-xl"/>
             <p className='text-sm font-bold font-inter text-neutralBlack'>Mannual Check-in</p>
             </div>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
              </div>
             {ismannualopen===true?<div className='flex flex-col pl-8 -mt-2 space-y-2'>
              
              <div className='flex gap-3 items-center justify-between text-neutralBlack cursor-pointer' onClick={()=>{
                router.push("/manual-entry")
              }}>

             <p className='text-xs font-bold font-inter text-neutralBlack'>Create mannual Check-in</p>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
             </div>
             <div className='flex gap-3 items-center justify-between text-neutralBlack cursor-pointer' onClick={()=>{
              router.push("/visitor-list")
             }}>

             <p className='text-xs font-bold font-inter text-neutralBlack'>All mannual</p>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
             </div>
            
             </div>:<></>}
            {menuList.map((menu,i)=>{
              return <div key={i} className='flex items-center w-full h-[21px] justify-between cursor-pointer' onClick={()=>{
                
                router.push(menu.path)
              }}>
             <div className='flex gap-3 items-center text-neutralBlack'>
             <menu.icon className="text-xl"/>
             <p className='text-sm font-bold font-inter text-neutralBlack'>{menu.menu}</p>
             </div>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
              </div>
            })}
              <div  className='flex items-center w-full h-[21px] justify-between cursor-pointer' onClick={()=>{
                setisnotificationopen(!isnotificationopen)
              }}>
             <div className='flex gap-3 items-center text-neutralBlack'>
             <IoMdNotificationsOutline className="text-xl"/>
             <p className='text-sm font-bold font-inter text-neutralBlack'>Notification</p>
             </div>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
              </div>
              {isnotificationopen===true?<div className='flex flex-col pl-8 -mt-2 space-y-2'>
              
              <div className='flex gap-3 items-center justify-between text-neutralBlack cursor-pointer' onClick={()=>{
                router.push("/create-notification")
              }}>

             <p className='text-xs font-bold font-inter text-neutralBlack'>Create notification</p>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
             </div>
             <div className='flex gap-3 items-center justify-between text-neutralBlack cursor-pointer' onClick={()=>{
              router.push("/notifications")
             }}>

             <p className='text-xs font-bold font-inter text-neutralBlack'>All notification</p>
             <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl"/>
             </div>
            
             </div>:<></>}
            </div>
           
        </div>
        <div className='h-[1px] w-full bg-[#A3A3A3] my-4'></div>
        <div className='flex items-center w-full h-[21px] px-6 justify-between'>
             <div className='flex gap-3 items-center text-neutralBlack cursor-pointer' onClick={()=>{
              router.push("/settings")
             }}>
             <IoEllipsisHorizontal className="text-xl"/>
             <p className='text-sm font-bold font-inter '>Settings</p>
             </div>
             
              </div>
              <div className='flex items-center w-full h-[21px] px-6 mt-6 justify-between'>
              <div className='flex gap-3 items-center text-neutralBlack cursor-pointer' onClick={()=>{
                setopen(!open)
              }}>
             <MdLogout className="text-xl"/>
             <p className='text-sm font-bold font-inter '>Logout</p>
             </div>
             </div>
          </div>
        <PreminumPlan/>
          
         
         
            
        </motion.section>
       )} 
    </AnimatePresence>
  )
}

export default LeftSidebar
