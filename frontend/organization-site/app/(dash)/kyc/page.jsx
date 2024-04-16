'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/modules/axios'
import Image from 'next/image'
import { useUserData } from '@/modules/hooks/useUserData'
import LoadingComponent from '@/modules/core-ui/LoadingComponent'

const fetchKYCData = async () => {
  const response = await axiosInstance.get('/organization/kyc/me', {
    headers: {
      Authorization: `Bearer ${
        typeof window !== 'undefined' ? localStorage?.getItem('access') : ''
      }`
    }
  })
  return response.data
}

function KYCVerificationPage () {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()

  const {
    data: kycData,
    isLoading: isKycLoading,
    isError
  } = useQuery(['kycData'], fetchKYCData)

  if (isKycLoading) {
    return <LoadingComponent />
  }

  if (isError) {
    return <p>Error loading KYC data.</p>
  }

  return (
    <div className='max-w-full py-6 mx-auto'>
      <h1 className='mb-4 text-3xl font-semibold text-epassblue'>
        KYC Verification Information
      </h1>

      <div className='mb-8'>
        <div className='grid gap-3 text-sm '>
          <div className='mb-3'>
            <h2 className='text-sm font-medium text-gray-700'>Logo</h2>
          {kycData?.logo===null?<Image
              height={100}
              width={100}
              src={
                 '/user-avatar.png'
              }
              alt='Organization Logo'
              className='max-w-md p-2 rounded-sm shadow'
            />:<Image
              height={100}
              width={100}
              src={
                !isUserLoading && user.is_kyc_verified && !isKycLoading
                  ? `https://api.epass.com.np${kycData?.logo}`
                  : '/user-avatar.png'
              }
              alt='Organization Logo'
              className='max-w-md p-2 rounded-sm shadow'
            />}  
          </div>
          <div className='p-5 shadow-lg bg-gray-50'>
            <h2 className='text-lg font-medium text-gray-700'>
              Organization Details
            </h2>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                Establishment Year:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.establishment_year}
              </span>
            </p>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                VAT Number:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.vat_number}
              </span>
            </p>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                PAN Number:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.pan_number}
              </span>
            </p>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                Registration Number:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.registration_number}
              </span>
            </p>
          </div>
          <div className='p-5 shadow-lg bg-gray-50'>
            <h2 className='text-lg font-medium text-gray-700'>Location</h2>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                Country:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.country}
              </span>
            </p>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                State:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.state}
              </span>
            </p>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                District:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.district}
              </span>
            </p>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                Municipality:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.municipality}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className='mb-8'>
        <div className='grid gap-3'>
          <div className='p-5 shadow-lg bg-gray-50'>
            <h2 className='text-lg font-medium text-gray-700'>
              Contact Details
            </h2>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                City/Village/Area:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.city_village_area}
              </span>
            </p>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                Ward No:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.ward_no}
              </span>
            </p>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                WhatsApp/Viber Number:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.whatsapp_viber_number}
              </span>
            </p>
          </div>
          <div className='p-5 shadow-lg bg-gray-50'>
            <h2 className='text-lg font-medium text-gray-700'>
              Additional Contacts
            </h2>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                Secondary Number:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.secondary_number}
              </span>
            </p>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                Telephone Number:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.telephone_number}
              </span>
            </p>
            <p className='my-1'>
              <span className='my-1 text-xs font-normal text-gray-600'>
                Website:
              </span>
              <span className='px-2 text-sm italic font-medium text-epassblue'>
                {kycData.website}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className='p-5 mb-10 shadow-lg bg-gray-50'>
        <h2 className='text-lg font-medium text-gray-700'>Summary</h2>
        <p className='text-sm'>{kycData.organization_summary}</p>
      </div>
    </div>
  )
}

export default KYCVerificationPage
