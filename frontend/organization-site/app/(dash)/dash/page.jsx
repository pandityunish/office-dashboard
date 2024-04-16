'use client'
import { useEffect, useState } from 'react'
import LoadingComponent from '@/modules/core-ui/LoadingComponent'
import axiosInstance from '@/modules/axios'

import { useUserData } from '@/modules/hooks/useUserData'
import { LiaIdCardSolid } from "react-icons/lia";
import { FaArrowRight } from "react-icons/fa6";
import { BsPersonCheck } from "react-icons/bs";
import { MdPeopleOutline } from "react-icons/md";
import { MdOutlineCalendarToday } from "react-icons/md";
import KycSection from '@/modules/dash-component/KycSection'
import MannualEntry from '@/modules/dash-component/MannualEntry'
import RecentVisitor from '@/modules/dash-component/RecentVisitor'
import VisitorWaiting from '@/modules/dash-component/VisitorWaiting'
import NewVisitors from '@/modules/dash-component/NewVisitors'
import PercentageSection from '@/modules/dash-component/PercentageSection'
import LineGraphSection from '@/modules/dash-component/LineGraphSection'
import BranchSection from '@/modules/dash-component/BranchSection'
import AdsComponent from '@/modules/dash-component/AdsComponent'
import { useRouter } from 'next/navigation'
import QrComponent from '@/modules/dash-component/QrComponent'

export default function Dash () {
  const [visitHistoryData, setVisitHistoryData] = useState([])
  const [todayHistoryData, setTodayHistoryData] = useState([])
  const [waitingVisitor, setWaitingVisitor] = useState([])
  const [currentWeekData, setCurrentWeekData] = useState([])
  const [qrcode, setqrcode] = useState("")
  const router=useRouter()

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
   const getuserqrcode=async()=>{
    try {
      const res = await axiosInstance.get(
        `/user/qr-code/${user.id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        }
      );
      if(res.status==200){
        // console.log(res.data);
        setqrcode(res.data);
        
      }
    } catch (error) {
      console.log(error)
    }
   }
   const features=[
    {"id":1,"name":"Visitor Check-in","icon":LiaIdCardSolid},
    {"id":4,"name":"Hotel Guest Check In","icon":MdOutlineCalendarToday},
    {"id":2,"name":"Customer Register","icon":BsPersonCheck},
    {"id":3,"name":"Meeting Appointment","icon":MdPeopleOutline},

   ]
  function filterDataForCurrentWeek (data) {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - dayOfWeek)
    startOfWeek.setHours(0, 0, 0, 0)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 7)
    endOfWeek.setHours(23, 59, 59, 999)

    const filteredData = data.filter(item => {
      const itemDate = new Date(item.visited_at)
      return itemDate >= startOfWeek && itemDate <= endOfWeek
    })

    return filteredData
  }

  useEffect(() => {
    ;(async () => {

      if (user !== undefined) {
        getuserqrcode();
        try {
          const res = await axiosInstance.get(
            `/organization/${user.id}/visit-history`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`
              }
            }
          )
          const today = new Date().toISOString().split('T')[0]
          if (res.status == 200) {
            const todaysVisits = res.data.filter(item =>
              item.visited_at.startsWith(today)
            )
            const waitingVisits = res.data.filter(
              item => item.is_approved == false
            )
            setCurrentWeekData([...filterDataForCurrentWeek(res.data)])

            setWaitingVisitor([...waitingVisits])
            setVisitHistoryData([...res.data])
            setTodayHistoryData([...todaysVisits]);
            
          }
        } catch (error) {
          console.log(error)
        }
      }
    })()
  }, [user])

  return (
    <div className=''>
      {!isUserLoading ? (
        <>
       
          <div className='flex items-start justify-between gap-5'>
            <section className='lg:w-[70%] w-[948px]'>
              <div className='flex justify-between gap-2 mt-2 w-full'>
{features.map((item,i)=>{
  return <div key={i} className='w-[213px] h-[150px] cursor-pointer font-inter rounded-lg bg-white shadow-3xl p-6' onClick={()=>{
    if(item.id===1){
      router.push("/manual-entry")
    }
  }}>
  <div className='bg-blue-100 p-2 rounded-full flex items-center justify-center h-[56px] w-[56px]'>
<item.icon className="text-primaryblue text-4xl"/>
  </div>
  <div className='flex justify-between mt-3 items-center '>
<p className={`text-sm font-inter font-medium ${item.id===1?"w-[55%]":"w-[70%]"}`}>{item.name}</p>
<FaArrowRight className="text-xl text-primaryblue"/>
  </div>
     </div>
})}
             
              </div>
              {user.is_kyc_verified===false? <KycSection />:<></>}
             
              <MannualEntry/>
              <div className='mt-10 flex justify-between w-full'>
              <RecentVisitor/>
              <VisitorWaiting/>
             
              </div>
              <NewVisitors/>
              <PercentageSection/>
              <LineGraphSection/>
            </section>
            
       
              
          
            <section className='flex m-2 flex-col lg:w-[25%] w-[388px]'>
          <QrComponent/>
           <BranchSection/>
           <AdsComponent/>
      
             
              
            </section>
          
          </div>
          <div className='mt-20 bg-primaryblue h-[46px] w-full -mb-4 flex justify-center items-center '>
                <p className='font-inter text-base font-medium text-white '>© 2024 ePass. All Rights Reserved.</p>
                </div>
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  )
}
