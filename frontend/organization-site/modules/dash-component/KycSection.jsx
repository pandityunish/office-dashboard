import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getorgprofile } from '../data/profile_service';
import { useUserData } from '../hooks/useUserData';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { unverifykycdata } from '@/jotai/dash-atoms';

export default function KycSection() {
  const router=useRouter();
  const [value,setvalue]=useAtom(unverifykycdata);
  const [kycorg, setkycorg] = useState(null);
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData();
useEffect(() => {
  getorgprofile({toast:toast,setorgkyc:setkycorg,id:user.id})
}, [])

  return (
    <div className='flex relative justify-between shadow-3xl lg:w-full w-[958px] h-[185px] rounded-xl  mt-10 font-inter text-white bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC]'>
    <div className='p-7'>
    <p className='text-2xl font-bold'>KYC </p>
     <p className='leading-6 font-normal text-base w-[540px]'>Fill your kyc as per required information. Your kyc will be verified within 24 hours.</p>
     <div className='w-[124px] h-[36px] cursor-pointer rounded-xl bg-white text-primaryblue flex items-center justify-center mt-5' onClick={()=>{
      if(user.organization_status===null){
        router.push("/verify-kyc")
      }else{
        const data1={
          "org_name":user.organization_name,
          "establishment_year":user.establishment_year,
          "pan_vat_number":kycorg.results[0].pan_number,
          "registration_number":kycorg.results[0].registration_number,
          "country":kycorg.results[0].country,
          "state":kycorg.results[0].state,
          "district":kycorg.results[0].district,
          "municipality":kycorg.results[0].municipality,
          "city_village_area":kycorg.results[0].city_village_area,
          "ward_no":kycorg.results[0].ward_no,
          "contact_person_full_name":kycorg.results[0].contact_person_full_name,
          "whatsapp_viber_number":kycorg.results[0].whatsapp_viber_number,
          "secondary_number":kycorg.results[0].secondary_number,
          "telephone_number":kycorg.results[0].telephone_number,
          "website":kycorg.results[0].website,
          "logo":kycorg.results[0].logo ,
          "social_link":kycorg.results[0].social_media_links[0].link,
          "email":user.email,
          "mobile_number":kycorg.results[0].mobilenumber,
          "org_type":user.organization_type,
          "registration_certificate":kycorg.results[0].registration_certificate,
          "anotherlink":kycorg.results[0].social_media_links,
          "otherdocument":kycorg.results[0].documents
                };
                setvalue(data1);
        router.push("/unverify-kyc")
      }

     }}>
      {user.organization_status===null?" Fill KYC":"Pending"} 
     </div>
    </div>
   

    <div className="w-[281px] absolute -right-0 h-[207px] -top-2 p-2  rounded-l-[90px] rounded-r-xl bg-cover bg-center" style={{ backgroundImage: 'url("/kyc.png")' }}>

</div>
    </div>
  )
}
