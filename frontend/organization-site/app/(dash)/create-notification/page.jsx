"use client"

import { useUserData } from '@/modules/hooks/useUserData';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";

import { FiMessageSquare } from "react-icons/fi";
import { useAtom } from 'jotai';
import { CiMail } from "react-icons/ci";
import { MdArrowDropDown, MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineGroup } from "react-icons/md";
import { idTypes, notificationAudiences, notificationTypes, organizationTypes, purpose } from '@/modules/data/organization_types_nature';
import { RiRectangleLine } from "react-icons/ri";
import { RiEBike2Fill } from "react-icons/ri";
import DefaultButton from '@/modules/core-ui/Button';
import { mannualdataAtom } from '@/jotai/dash-atoms';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Imagepicker from '@/modules/kyc-component/Imagepicker';
import { postnotification } from '@/modules/data/notification_service';
import { toast } from 'react-toastify';
import axiosInstance from '@/modules/axios';
import { notificationurl } from '@/modules/apiurl';
const MannualEntry = () => {
  const [value,setvalue]=useAtom(mannualdataAtom)
    const {register, handleSubmit, control, reset, formState: { errors } } 
    = useForm({defaultValues:{
      "full_name":value.full_name,
      "address":value.address,
      "number":value.number,
      "email":value.email,
      "visiting":value.visiting,
      "numvisitor":value.numvisitor,
      "typeid":value.typeid,
      "have_vehicle":value.have_vehicle,
      "vehicle_number":value.vehicle_number,
      "purpose":value.purpose,
      "id_number":value.id_number,
      "image":value.image
    }});
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
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
  
    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError
    } = useUserData()


    const onSubmit = async (data) => {
      
      try {
        console.log(selectedImage)
          const token=localStorage.getItem("access");
          const formData=new FormData();
          if(selectedImage===null){
            formData.append('audience', data.target_audience)
            formData.append('notification_type',data. notification_type)
            formData.append('title',data. title)
            formData.append('message',data. message)
          const response=await axiosInstance.post(`/notification/${user.id}/notifications-create`,
            formData,
          {headers:{
            'content-type': 'multipart/form-data',
            "Authorization":`Bearer ${token}`
          },
        
        },);
          console.log(response)
    
          if(response.status==201){
           
             console.log(response.data);
             reset();
             toast.success("Notification Sent successfully");
             router.push("/success")
          } else{
            // toast.error("Something went wrong")
            // console.log(response)
            router.push("/error")
          } 
          }else{
            formData.append('audience', data.target_audience)
            formData.append('notification_type',data. notification_type)
            formData.append('title',data. title)
            formData.append('message',data. message)
            formData.append('attach_file',selectedImage,selectedImage.name)
          const response=await axiosInstance.post(`/notification/${user.id}/notifications-create`,
            formData,
          {headers:{
            'content-type': 'multipart/form-data',
            "Authorization":`Bearer ${token}`
          },
        
        },);
          console.log(response)
    
          if(response.status==201){
           
             console.log(response.data);
             reset();
             toast.success("Notification Sent successfully")
             router.push("/success")
          } else{
            // toast.error("Something went wrong")
            // console.log(response)
            router.push("/error")
          } 
          }
          
         
      } catch (error) {
          toast.error("Something went wrong")
          console.log(error)
      }

    };

    return (
        <div className=" xl:w-[100%]  lg:w-[1367px] ">
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="p-6 bg-white rounded-lg shadow-3xl">
                    
            
                <h1 className="mb-4 text-2xl font-semibold">Create Notification</h1>
                
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                   
                <div className='w-[600px]  '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-normal text-[#A3A3A3] '
                    >
                      Notification Type
                    </label>
                    <div className='mt-[8px] relative'>
                        <select
                          className='block w-full p-4 text-[#A3A3A3] pl-5 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('notification_type',{required:true})}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                            Select notification type
                          </option>
                          {notificationTypes.map(org => (
                            <option key={org.id} value={org.value} className='text-sm  font-normal text-[#A3A3A3]'>
                              {org.title}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <MdArrowDropDown />
                        </div>

                        {errors.notification_type && (
                          <span className='text-red-500'>
                            Please select purpose 
                          </span>
                        )}
                      </div>
                    
                  </div>
                  <div className='w-[600px]  '>
                    <label
                      htmlFor='organization_name'
                      className='text-sm font-normal text-[#A3A3A3] '
                    >
                      Target Audience
                    </label>
                    <div className='mt-[8px] relative'>
                        <select
                          className='block w-full p-4 text-[#A3A3A3] pl-5 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none'
                          {...register('target_audience',{required:true})}
                        >
                          <option value="" className='text-[#A3A3A3] '>
                          Select target audience  
                          </option>
                          {notificationAudiences.map(org => (
                            <option key={org.id} value={org.value} className='text-sm  font-normal text-[#A3A3A3]'>
                              {org.title}
                            </option>
                          ))}
                        </select>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 ${errors.target_audience ? "-top-6" : ""} flex items-center px-2 text-gray-700`}>
                          <MdArrowDropDown />
                        </div>

                        {errors.target_audience && (
                          <span className='text-red-500'>
                            Please target audience
                          </span>
                        )}
                      </div>
                    
                  </div>
                  <div className='w-[600px]  '>
                    <label
                      htmlFor='title'
                      className='text-sm font-normal text-[#A3A3A3] '
                    >
                      Title
                    </label>
                    <div className='mt-[8px] relative'>

                      <input
                        type='text'
                        placeholder='Input title'
                        className={`block w-full p-4 pl-5 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.address ? 'border-red-500' : ''
                          }`}
                        {...register('title', { required: true })}
                      />
                      {errors.title && (
                        <span className='text-red-500'>
                          Title is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='w-[600px]  '>
                    <label
                      htmlFor='title'
                      className='text-sm font-normal text-[#A3A3A3] '
                    >
                      Message
                    </label>
                    <div className='mt-[8px] relative'>

                      <input
                        type='text'
                        placeholder='Input message'
                        className={`block w-full p-4 pl-5 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.address ? 'border-red-500' : ''
                          }`}
                        {...register('message', { required: true })}
                      />
                      {errors.title && (
                        <span className='text-red-500'>
                          Message is required
                        </span>
                      )}
                    </div>
                  </div>
                  
                  
                  
                  
                  

                  <Imagepicker fileInputRef={fileInputRef} LuUpload={LuUpload} handleImageChange={handleImageChange} handleImageClick={handleImageClick} selectedImage={selectedImage} title="Attach File (Optional)"/> 
                </div>
                
                

                </div>
                <div className='w-[320px] my-10'>
<DefaultButton text="Create"/>
</div>

            </form>
        </div>
    );
};

export default MannualEntry;