'use client'
import React, { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { redirect } from 'next/navigation'
import axiosInstance from '@/modules/axios'
import { useAtom } from 'jotai'
import { useUserData } from '@/modules/hooks/useUserData'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import LoadingComponent from '@/modules/core-ui/LoadingComponent'
import { CgOrganisation } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdArrowDropDown, MdPanoramaWideAngle } from "react-icons/md";
import { countries, organizationTypes } from '@/modules/data/organization_types_nature'
import { PiBagSimpleBold } from 'react-icons/pi'
import { MdLocationSearching } from "react-icons/md";
import { CiFlag1 } from "react-icons/ci";
import { TiLocationArrowOutline } from "react-icons/ti";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { MdShareLocation } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

import { CiMail } from "react-icons/ci";
import { FaWordpress } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import { TbArrowBigRight } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import DefaultButton from '@/modules/core-ui/Button'
import Imagepicker from '@/modules/kyc-component/Imagepicker'
import { districts, municipalites, province } from '@/modules/data/address'
import { kycdataAtom } from '@/jotai/dash-atoms'
import Image from 'next/image'

function VerifyKycForm() {
  const [value,setvalue]=useAtom(kycdataAtom);
  const [numberoflink, setnumberoflink] = useState(0)
  const {
    register,
    handleSubmit,
    setValue,
    control,
    onChange,
    formState: { errors },

  } = useForm({
    defaultValues:{
      "organization_name":value.org_name,
      "establishment_year":value.establishment_year,
      "pan_vat_number":value.pan_vat_number,
      "registration_number":value.registration_number,
      "country":value.country,
      "province":value.state,
      "district":value.district,
      "municipality":value.municipality,
      "city":value.city_village_area,
      "ward":value.ward_no,
      "full_name":value.contact_person_full_name,
      "whatsapp_number":value.whatsapp_viber_number,
      "secondary_number":value.contact_number,
      "telephone_number":value.telephone_number,
      "website":value.website,
      
      "link":value.social_link,
      "email":value.email,
      "mobilenumber":value.mobile_number,
      "organization_type":value.org_type,
    }
  });
 
  const [allprovince, setallprovince] = useState([]);
  const [numberofdocument, setnumberofdocument] = useState(0)
  const fileInputRefs = Array.from({ length: numberofdocument }, () => React.createRef());

  const handleImagesChange = (index, e) => {
    const file = e.target.files[0];
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = file;
      return newImages;
    });
  };
  const handleImagesClick = (index) => {
    // Logic to trigger file input click
    console.log(index);
    if(fileInputRefs[index].current){
      fileInputRefs[index].current.click();

    }
  };
  const [selectedImages, setSelectedImages] = useState(Array(numberofdocument).fill(null));

  const [selectedImage, setSelectedImage] = useState(value.logo);
const [alldistrict, setalldistrict] = useState([])
const [allmunicipality, setallmunicipality] = useState([])
const [isnewlink, setisnewlink] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleImageClick = () => {
    // Trigger the hidden file input when the image is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }else{
   
    }
  };
  const [regselectedImage, regsetSelectedImage] = useState(value.registration_certificate);
  const regfileInputRef = useRef(null);
  const [inputValues, setInputValues] = useState(Array(numberoflink).fill('')); // Initialize with empty strings

  const reghandleImageChange = (event) => {
    const file = event.target.files[0];
    regsetSelectedImage(file);
  };

  const reghandleImageClick = () => {
    // Trigger the hidden file input when the image is clicked
    if (fileInputRef.current) {
      regfileInputRef.current.click();
    }else{
   
    }
  };
  const [vatselectedImage, vatsetSelectedImage] = useState(null);
  const vatfileInputRef = useRef(null);
const [isdocumentclick, setisdocumentclick] = useState(false);
  const vathandleImageChange = (event) => {
    const file = event.target.files[0];
    vatsetSelectedImage(file);
  };

  const vathandleImageClick = () => {
    // Trigger the hidden file input when the image is clicked
    if (fileInputRef.current) {
      vatfileInputRef.current.click();
    }else{
   
    }
  };
  const [licenselectedImage, licensetSelectedImage] = useState(null);
  const licenfileInputRef = useRef(null);

  const licenhandleImageChange = (event) => {
    const file = event.target.files[0];
    licensetSelectedImage(file);
  };

  const licenhandleImageClick = () => {
    // Trigger the hidden file input when the image is clicked
    if (fileInputRef.current) {
      licenfileInputRef.current.click();
    }else{
   
    }
  };
  const [citizenselectedImage, citizensetSelectedImage] = useState(null);
  const citizenfileInputRef = useRef(null);

  const citizenhandleImageChange = (event) => {
    const file = event.target.files[0];
    citizensetSelectedImage(file);
  };

  const citizenhandleImageClick = () => {
    // Trigger the hidden file input when the image is clicked
    if (fileInputRef.current) {
      citizenfileInputRef.current.click();
    }else{
   
    }
  };
  const router = useRouter()
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()

  if (!isUserLoading && user?.is_kyc_verified == true) {
    return redirect('/dash')
  }
  const handleInputChange = (index, value) => {
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };
  const onSubmit = async data => {
    try {
     console.log(selectedImages)
    if(regselectedImage===undefined || selectedImage===undefined){
toast.error("Please Select the images");
    }else{
      const data1={
        "org_name":data.organization_name,
        "establishment_year":data.establishment_year,
        "pan_vat_number":data.pan_vat_number,
        "registration_number":data.registration_number,
        "country":data.country,
        "state":data.province,
        "district":data.district,
        "municipality":data.municipality,
        "city_village_area":data.city,
        "ward_no":data.ward,
        "contact_person_full_name":data.full_name,
        "whatsapp_viber_number":data.whatsapp_number,
        "secondary_number":data.contact_number,
        "telephone_number":data.telephone_number,
        "website":data.website,
        "logo":selectedImage,
        "social_link":data.link,
        "email":data.email,
        "mobile_number":data.mobilenumber,
        "org_type":data.organization_type,
        "registration_certificate":regselectedImage,
        "anotherlink":inputValues,
        "otherdocument":selectedImages
              };
              setvalue(data1);
              router.push(
                "/kyc-preview"
              );
    }
      
     

    } catch (error) {
      
      // if (error.response.status === 500 || error.response.status === 404) {
      //   toast.error('KYC Verification failed, Try Again')
      // } else {
      //   if (error && Object.values(error?.response?.data || []).length >= 1) {
      //     Object.values(error?.response?.data).map(e =>
      //       toast.error(e[0].charAt(0).toUpperCase() + e[0].slice(1))
      //     )
      //   } else {
      //     toast.error('KYC Verification failed, Try Again')
      //   }
      // }
      console.error('Error submitting KYC data:', error)
    }
  }

  return (
    <>
      {isUserLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className='xl:w-[100%]  lg:w-[1367px] '>

            <div className=''>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className=' font-inter'
                encType='multipart/form-data'
              >
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>

               
                <div className={`flex flex-col p-5 rounded-xl
                 bg-white shadow-3xl w-[667px] ${errors.organization_name?"h-[500px]":"h-[420.02px]"} `}>
                  <h1 className='font-bold font-inter text-2xl leading-9'>Office Information</h1>
                  <div className='w-[619px] mt-5'>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Office Name
                    </label>
                    <div className='mt-2.5 relative'>
                      <CgOrganisation className={`absolute text-2xl left-4 ${errors.organization_name ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        placeholder='Input your office full name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-gray-200 ${errors.organization_name ? 'border-red-500' : ''
                          }`}
                        {...register('organization_name', { required: true })}
                      />
                      {errors.organization_name && (
                        <span className='text-red-500'>
                          Office name is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[619px] mt-2 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Establishment Year
                      </label>
                      <div className='mt-2.5 relative'>
                        <CiCalendar className={`absolute text-2xl left-4 ${errors.establishment_year ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input establishment year'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.establishment_year ? 'border-red-500' : ''
                            }`}
                          {...register('establishment_year', { required: true })}
                        />
                        {errors.establishment_year && (
                          <span className='text-red-500'>
                            Establishment year is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Registration Number
                      </label>
                      <div className='mt-2.5 relative'>
                        <TbLayoutDashboard className={`absolute text-2xl left-4 ${errors.registration_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input registration number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.registration_number ? 'border-red-500' : ''
                            }`}
                          {...register('registration_number', { required: true })}
                        />
                        {errors.registration_number && (
                          <span className='text-red-500'>
                            Registration number is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-[619px] mt-2 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        PAN / VAT Number
                      </label>
                      <div className='mt-2.5 relative'>
                        <MdPanoramaWideAngle className={`absolute text-2xl left-4 ${errors.pan_vat_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input PAN / VAT number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.pan_vat_number ? 'border-red-500' : ''
                            }`}
                          {...register('pan_vat_number', { required: true })}
                        />
                        {errors.pan_vat_number && (
                          <span className='text-red-500'>
                            PAN / VAT number is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2'>
                      <section>
                        <label
                          htmlFor='organization_type'
                          className='text-sm font-semibold text-[#333333]'
                        >
                          Office Type
                        </label>
                        <div className='mt-2.5 relative'>
                          <select
                            className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                            {...register('organization_type', { required: true })}
                          >
                            <option value="" className='text-[#A3A3A3] '>
                              Select office type
                            </option>
                            {organizationTypes.map(org => (
                              <option key={org.id} value={org.value} className='text-sm  font-semibold text-[#333333]'>
                                {org.title}
                              </option>
                            ))}
                          </select>
                          <div className={`pointer-events-none absolute inset-y-0 right-0 flex ${errors.organization_type ? "-top-6" : ""} items-center px-2 text-gray-700`}>
                            {/* Adjust the positioning of the dropdown button here */}
                            <MdArrowDropDown />
                          </div>
                          {/* Adjust the positioning of the dropdown button here */}
                          <PiBagSimpleBold className={`absolute text-2xl left-4 ${errors.organization_type ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                          {errors.organization_type && (
                            <span className='text-red-500'>
                              Please select organization type
                            </span>
                          )}
                        </div>


                      </section>
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col p-5 rounded-xl bg-white shadow-3xl w-[667px] ${errors.country?"h-[500px]":"h-[420.02px]"} `}>
                  <h1 className='font-bold font-inter text-2xl leading-9'>Address</h1>
                  <div className='w-[619px] mt-5  flex justify-between'>
                    <div className='w-[297.5px] mt-2 '>


                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Country
                      </label>
                      <div className='mt-2.5 relative'>
                        <select
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('country', { required: true })} 
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            console.log("Selected Value:", selectedValue);
                           if(selectedValue===""){

                           }else{
                            console.log(province[selectedValue]);
                            setallprovince(province[selectedValue])
                            setallprovince(province[selectedValue])
                           }
                             
                            
                          }}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                            Select country
                          </option>
                          {countries.map(org => (
                         
                            <option key={org.id} onClick={()=>{
                              
                            }} value={org.title} className='text-sm  font-semibold text-[#333333]' >
                             {org.title}
                            </option>
                            
                          ))}
                        </select>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 flex ${errors.country ? "-top-6" : ""} items-center px-2 text-gray-700`}>
                          <MdArrowDropDown />
                        </div>
                        <CiFlag1 className={`absolute text-2xl left-4 ${errors.country ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        {errors.country && (
                          <span className='text-red-500'>
                            Please select country
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className='w-[297.5px] mt-2 '>


                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        State / Province
                      </label>
                      <div className='mt-2.5 relative'>
                      <select
          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
          {...register('province', { required: true })}
          onChange={(e) => {
            const selectedValue = e.target.value;
            console.log("Selected Value:", selectedValue);

            setalldistrict(districts[selectedValue]);

            // Set the selected value using react-hook-form's setValue
            setValue('province', selectedValue);
          }}
        >
          <option value="" className='text-[#A3A3A3] '>
            Select state / province
          </option>
          {allprovince.map((org, i) => (
            <option key={i} value={org} className='text-sm font-semibold text-[#333333]'>
              {org}
            </option>
          ))}
        </select>

                        <div className={`pointer-events-none absolute inset-y-0 right-0 flex ${errors.province ? "-top-6" : ""} items-center px-2 text-gray-700`}>
                          <MdArrowDropDown />
                        </div>
                        <MdLocationSearching className={`absolute text-2xl left-4 ${errors.province ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        {errors.province && (
                          <span className='text-red-500'>
                            Please select province
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-[619px]   flex justify-between mt-2'>
                    <div className='w-[297.5px] mt-2 '>


                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        District
                      </label>
                      <div className='mt-2.5 relative'>
                        <select
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('district', { required: true })}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            console.log("Selected Value:", selectedValue);
                          
                           setallmunicipality(municipalites[selectedValue])
                          }}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                            Select district
                          </option>
                          {alldistrict.map((org,i) => (
                            <option key={i} value={org} className='text-sm  font-semibold text-[#333333]'>
                              {org}
                            </option>
                          ))}
                        </select>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 flex ${errors.district ? "-top-6" : ""} items-center px-2 text-gray-700`}>
                          <MdArrowDropDown />
                        </div>
                        <MdShareLocation className={`absolute text-2xl left-4 ${errors.district ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        {errors.district && (
                          <span className='text-red-500'>
                            Please select District
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2 '>


                      <label
                        htmlFor='district'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Municipality / Rural Municipality
                      </label>
                      <div className='mt-2.5 relative'>
                        <select
                          className='block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('municipality', { required: true })}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                            Select municipality
                          </option>
                          {allmunicipality.map((org,i) => (
                            <option key={i} value={org} className='text-sm  font-semibold text-[#333333]'>
                              {org}
                            </option>
                          ))}
                        </select>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 flex ${errors.municipality ? "-top-6" : ""} items-center px-2 text-gray-700`}>
                          <MdArrowDropDown />
                        </div>
                        <MdLocationOn className={`absolute text-2xl left-4 ${errors.municipality ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        {errors.municipality && (
                          <span className='text-red-500'>
                            Please select municipality
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-[619px] mt-2 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='organization_name'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Ward No.
                      </label>
                      <div className='mt-2.5 relative'>
                        <TbArrowBigRight className={`absolute text-2xl left-4 ${errors.establishment_year ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input ward no.'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.ward ? 'border-red-500' : ''
                            }`}
                          {...register('ward', { required: true })}
                        />
                        {errors.ward && (
                          <span className='text-red-500'>
                            ward is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='city'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        City / Tole / Area
                      </label>
                      <div className='mt-2.5 relative'>
                        <TiLocationArrowOutline className={`absolute text-2xl left-4 ${errors.city ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input City / Tole / Area'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.city ? 'border-red-500' : ''
                            }`}
                          {...register('city', { required: true })}
                        />
                        {errors.city && (
                          <span className='text-red-500'>
                            City / Tole / Area is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col p-5 rounded-xl bg-white shadow-3xl w-[667px] '>
                  <h1 className='font-bold font-inter text-2xl leading-9'>Contact</h1>
                  <div className='w-[619px] mt-5'>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Contact Person Full Name
                    </label>
                    <div className='mt-2.5 relative'>
                      <IoPersonOutline className={`absolute text-2xl left-4 ${errors.full_name ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        placeholder='Input contact person full name'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.full_name ? 'border-red-500' : ''
                          }`}
                        {...register('full_name', { required: true })}
                      />
                      {errors.full_name && (
                        <span className='text-red-500'>
                          Full name is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[619px] mt-3 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='telephone_number'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Telephone number
                      </label>
                      <div className='mt-2.5 relative'>
                        <MdOutlineLocalPhone className={`absolute text-2xl left-4 ${errors.telephone_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input  Telephone number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.telephone_number ? 'border-red-500' : ''
                            }`}
                          {...register('telephone_number', { required: true })}
                        />
                        {errors.telephone_number && (
                          <span className='text-red-500'>
                            Telephone number is required
                          </span>
                        )}
                      </div>
                    </div>
                   
                 <div className='w-[297.5px] mt-2'>
          <label
            htmlFor='organization_name'
            className='text-sm font-semibold text-[#333333] '
          >
            Mobile Number
          </label>
          <div className='mt-2.5 relative'>
            <IoIosPhonePortrait className={`absolute text-2xl left-4 ${errors.mobilenumber ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

            <input
              type='text'
              placeholder='Input Mobile Number'
              className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.mobilenumber ? 'border-red-500' : ''
                }`}
              {...register('mobilenumber', { required: true,maxLength:10,minLength:10 })}
            />
            {errors.mobilenumber && (
              <span className='text-red-500'>
                {errors.mobilenumber && errors.mobilenumber.type === "required" && (
                          <span className='text-red-500'>
                            Mobile Number is required
                          </span>
                        )}
                {errors.mobilenumber && errors.mobilenumber.type === "minLength" && <span className='text-red-500'>Number should be at least 10 digits</span> }
                        {errors.mobilenumber && errors.mobilenumber.type === "maxLeng th" && <span className='text-red-500'>Number shouldn&apos;t be more than 10 digits</span> }
              </span>
            )}
          </div>
        </div>    
                  </div>
                  <div className='w-[619px] mt-3 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='telephone_number'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Whatsapp / Viber Number
                      </label>
                      <div className='mt-2.5 relative'>
                        <FaWhatsapp className={`absolute text-2xl left-4 ${errors.whatsapp_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input Whatsapp / Viber Number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.whatsapp_number ? 'border-red-500' : ''
                            }`}
                          {...register('whatsapp_number', { required: true })}
                        />
                        {errors.whatsapp_number && (
                          <span className='text-red-500'>
                            Whatsapp / Viber Number is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='contact_number'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Alternative Contact Number
                      </label>
                      <div className='mt-2.5 relative'>
                        <MdOutlineLocalPhone className={`absolute text-2xl left-4 ${errors.contact_number ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input alternate number'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.contact_number ? 'border-red-500' : ''
                            }`}
                          {...register('contact_number', { required: true,minLength:10,maxLength:10 })}
                        />
                        {errors.contact_number && errors.contact_number.type === "required" && (
                          <span className='text-red-500'>
                            Alternative Contact is required
                          </span>
                        )}
                        {errors.contact_number && errors.contact_number.type === "minLength" && <span className='text-red-500'>Number should be at least 10 digits</span> }
                        {errors.contact_number && errors.contact_number.type === "maxLength" && <span className='text-red-500'>Number shouldn&apos;t be more than 10 digits</span> }
                      </div>
                    </div>
                  </div>
                  <div className='w-[619px] mt-3 flex justify-between'>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='email'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Email address
                      </label>
                      <div className='mt-2.5 relative'>
                        <CiMail className={`absolute text-2xl left-4 ${errors.email ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='email'
                          placeholder='Input email address'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.email ? 'border-red-500' : ''
                            }`}
                          {...register('email', { required: true })}
                        />
                        {errors.email && (
                          <span className='text-red-500'>
                            Email is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='w-[297.5px] mt-2'>
                      <label
                        htmlFor='Website'
                        className='text-sm font-semibold text-[#333333] '
                      >
                        Website
                      </label>
                      <div className='mt-2.5 relative'>
                        <FaWordpress className={`absolute text-2xl left-4 ${errors.website ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                        <input
                          type='text'
                          placeholder='Input website'
                          className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.website ? 'border-red-500' : ''
                            }`}
                          {...register('website', { required: true })}
                        />
                        {errors.website && (
                          <span className='text-red-500'>
                            Website is required
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                  <div className='w-[619px] mt-4'>
                    <label
                      htmlFor='link'
                      className='text-sm font-semibold text-[#333333] '
                    >
                      Social Media Link
                    </label>
                    <div className='mt-2.5 relative'>
                      <FaFacebook className={`absolute text-2xl left-4 ${errors.link ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

                      <input
                        type='text'
                        placeholder='Input social media link'
                        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.link ? 'border-red-500' : ''
                          }`}
                        {...register('link', { required: true })}
                      />
                      {errors.link && (
                        <span className='text-red-500'>
                          Link is required
                        </span>
                      )}
                    </div>
                  </div>
                  {[...Array(numberoflink)].map((_, index) => (
       <div key={index} className='w-[619px] mt-4'>
       <label htmlFor={`link-${index}`} className='text-sm font-semibold text-[#333333]'>
         Another Link
       </label>
       <div className='mt-2.5 relative'>
         {/* You can customize the icon based on the social media platform */}
         <FaFacebook className={`absolute text-2xl left-4 ${errors.link ? "top-1/3" : "top-1/2"}  transform -translate-y-1/2 text-gray-400`} />

         <input
           type='text'
           id={`link-${index}`}
           placeholder='Input social media link'
           className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.link ? 'border-red-500' : ''}`}
           value={inputValues[index]}
           onChange={(e) => handleInputChange(index, e.target.value)}
         />
       </div>
     </div>
      ))}
                 
                  <div className='flex gap-3 mt-6 items-center cursor-pointer' onClick={()=>{
                    setnumberoflink(numberoflink+1);
                  }}>
                 <p className='text-primaryblue font-bold text-sm leading-5 '>
                      Add another link</p>
                    <FaPlus className="text-sm text-primaryblue" />

                  </div>
                </div>
                <div className='flex flex-col  p-5 rounded-xl bg-white shadow-3xl w-[667px] '>
                  <h1 className='font-bold font-inter text-2xl leading-9'>Document </h1>
                  <div className=''>
                    <Imagepicker fileInputRef={fileInputRef} LuUpload={LuUpload} handleImageChange={handleImageChange} handleImageClick={handleImageClick} selectedImage={selectedImage} title="Logo"/>
                    <Imagepicker fileInputRef={regfileInputRef} LuUpload={LuUpload} handleImageChange={reghandleImageChange} handleImageClick={reghandleImageClick} selectedImage={regselectedImage} title="Registration Certificate / PAN / VAT Certificate / Licenses /Citizenship"/>
                    {isdocumentclick===false?<></>:<>
                    <Imagepicker fileInputRef={vatfileInputRef} LuUpload={LuUpload} handleImageChange={vathandleImageChange} handleImageClick={vathandleImageClick} selectedImage={vatselectedImage} title="Other Documents"/>
                    </>}
                    {[...Array(numberofdocument)].map((_, index) => (
                      <div className='flex flex-col mt-6' key={index}>
                      <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImagesChange(index, e)}
                  style={{ display: 'none' }}
                  ref={fileInputRefs[index]}
                  />
                  <p className='text-sm font-semibold text-[#333333]'>Other Document</p>
                  
                  {selectedImages[index]?<div className='w-[619px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
                  <Image
                src={URL.createObjectURL(selectedImages[index])}
                width={150} height={150}
                alt="Selected" className='object-contain h-[100px]'
                onClick={() => handleImageClick(index)}
              />
                  </div>:<>
                  <div className='w-[619px] h-[140px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
                  <LuUpload className="text-base text-[#A3A3A3]"/>
                  <p className='text-base font-normal leading-6 text-[#A3A3A3]'>Drag & drop file or <span className='text-primaryblue cursor-pointer' onClick={()=>{
                    handleImagesClick(index)
                    console.log(selectedImages);
                  }}>Browse</span></p>
                  </div>
                  </>}
                  
                  
                  
                      </div>
        // <div key={index} className='w-[619px] mt-4'>
        //   <label htmlFor={`file-${index}`} className='text-sm font-semibold text-[#333333]'>
        //     Upload Image {index + 1}
        //   </label>
        //   <div className='mt-2.5 relative'>
        //     <FaFacebook className={`absolute text-2xl left-4 top-1/2 transform -translate-y-1/2 text-gray-400`} />

        //     <input
        //       type='file'
        //       id={`file-${index}`}
        //       accept='image/*'
        //       onChange={(e) => handleImagesChange(index, e)}
        //       style={{ display: 'none' }}
        //       ref={fileInputRefs[index]}
        //     />
        //   </div>
        //   {selectedImages[index] ? (
        //     <div className='w-[619px] h-[150px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
        //       <Image
        //         src={URL.createObjectURL(selectedImages[index])}
        //         alt={`Selected ${index + 1}`}
        //         className='object-contain h-full w-full'
        //         onClick={() => handleImageClick(index)}
        //       />
        //     </div>
        //   ) : (
        //     <div className='w-[150px] h-[150px] mt-2 flex gap-2 items-center justify-center border-dashed border-2 border-spacing-2 border-[#A3A3A3] rounded-xl'>
        //       <p className='text-base font-normal leading-6 text-[#A3A3A3]'>
        //         Drag & drop file or{' '}
        //         <span className='text-primaryblue cursor-pointer' onClick={() => handleImageClick(index)}>
        //           Browse
        //         </span>
        //       </p>
        //     </div>
        //   )}
        // </div>
      ))}
                    <div className='flex gap-3 mt-6 items-center cursor-pointer' onClick={()=>{
                      setnumberofdocument(numberofdocument+1);
                    }}>
                    <FaPlus className="text-sm text-primaryblue" />
                <p className='text-primaryblue font-bold text-sm leading-5 '>
                      Add file upload</p>
                    

                  </div>
                  </div>
                
                </div>






                </div> 
                 
                <button
                  type='submit'
                  className='w-[320px] h-[56px] mb-12 mt-10 flex items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center  px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                Continue
                </button>
                
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default VerifyKycForm
