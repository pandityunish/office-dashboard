"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { CiMail } from "react-icons/ci";
import { RiRectangleLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

import { useAtom } from "jotai";
import { mannualdataAtom } from "@/jotai/dash-atoms";

import axiosInstance from "@/modules/axios";
import { useUserData } from "@/modules/hooks/useUserData";

const VisitForm = () => {
  const [value, setvalue] = useAtom(mannualdataAtom);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      have_vehicle: value.have_vehicle,
    },
  });
  const router = useRouter();
  console.log(value.have_vehicle);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserData();

  const [isLoading, setisLoading] = useState(false);
  console.log(value, "this is a preview page");
  const onSubmit = async (data) => {
    console.log(value.mobile_number);
    setisLoading(true);
    if (!isUserLoading) {
      const formData = new FormData();
      formData.append("full_name", value.full_name);
      formData.append("mobile_number", value.mobile_number);
      formData.append("email", value.email);
      formData.append("type_of_id", value.typeid);
      formData.append("id_number", value.id_number);
      formData.append("company_name", value.company_name);
      formData.append("country", value.country);
      formData.append("state", value.state);
      formData.append("city", value.city);
      formData.append("additional_requirements", value.additional_requirements);
      formData.append("organization", user.id);

      const res = await axiosInstance.post(
        `/organization/customercreate/`,

        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${
              typeof window !== "undefined"
                ? localStorage?.getItem("access")
                : ""
            }`,
          },
        }
      );
      console.log(res.data);
      if (res.status === 200 || res.status === 201) {
        toast.success(`Manual Entry For ${value.full_name} Successfull`);
        router.push("/success");
        reset();
        setisLoading(false);
      }
    } else {
      setisLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="xl:w-[100%]  lg:w-[1367px] ">
      <div className="p-6 bg-white rounded-lg shadow-3xl">
        <h1 className="mb-4 text-2xl font-semibold">CUSTOMER REGISTRATION</h1>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="w-[600px] ">
            <label
              htmlFor="organization_name"
              className="text-sm font-semibold text-[#333333] "
            >
              Full Name
            </label>
            <div className="mt-[8px] relative">
              <IoPersonOutline
                className={`absolute text-2xl left-4 ${
                  errors.full_name ? "top-1/3" : "top-1/2"
                }  transform -translate-y-1/2 text-gray-400`}
              />

              <input
                type="text"
                readOnly={true}
                value={value.full_name}
                placeholder="Input full name"
                className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.full_name ? "border-red-500" : ""
                }`}
                {...register("full_name", { required: true })}
              />
              {errors.organization_name && (
                <span className="text-red-500">Full Name is required</span>
              )}
            </div>
          </div>

          <div className="w-[600px] ">
            <label
              htmlFor="mobile_number"
              className="text-sm font-semibold text-[#333333] "
            >
              Mobile Number
            </label>
            <div className="mt-[8px] relative">
              <FaMobileAlt
                className={`absolute text-2xl left-4 ${
                  errors.address ? "top-1/3" : "top-1/2"
                }  transform -translate-y-1/2 text-gray-400`}
              />

              <input
                type="text"
                readOnly={true}
                value={value.mobile_number}
                placeholder="Input Mobile Number"
                className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.mobile_number ? "border-red-500" : ""
                }`}
                {...register("mobile_number", { required: true })}
              />
              {errors.mobile_number && (
                <span className="text-red-500">Mobile Number is required</span>
              )}
            </div>
          </div>
          <div className="w-[600px] ">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#333333] "
            >
              Email address
            </label>
            <div className="mt-[8px] relative">
              <CiMail
                className={`absolute text-2xl left-4 ${
                  errors.email ? "top-1/3" : "top-1/2"
                }  transform -translate-y-1/2 text-gray-400`}
              />

              <input
                type="email"
                readOnly={true}
                value={value.email}
                placeholder="Input Email address"
                className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">Email address is required</span>
              )}
            </div>
          </div>

          <div className="w-[600px] ">
            <label
              htmlFor="typeid"
              className="text-sm font-semibold text-[#333333] "
            >
              Type of ID
            </label>
            <div className="mt-[8px] relative">
              <CiMail
                className={`absolute text-2xl left-4 ${
                  errors.typeid ? "top-1/3" : "top-1/2"
                }  transform -translate-y-1/2 text-gray-400`}
              />

              <input
                type="text"
                readOnly={true}
                value={value.typeid}
                placeholder="Input Type of ID"
                className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.typeid ? "border-red-500" : ""
                }`}
                {...register("typeid", { required: true })}
              />
              {errors.typeid && (
                <span className="text-red-500">Type of ID is required</span>
              )}
            </div>
          </div>

          <div className="w-[600px] mt-2">
            <label
              htmlFor="organization_name"
              className="text-sm font-semibold text-[#333333] "
            >
              ID Number
            </label>
            <div className="mt-2.5 relative">
              <RiRectangleLine
                className={`absolute text-2xl left-4 ${
                  errors.id_number ? "top-1/3" : "top-1/2"
                }  transform -translate-y-1/2 text-gray-400`}
              />

              <input
                type="text"
                placeholder="Input mobile_number of visitor"
                value={value.id_number}
                readOnly={true}
                className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.id_number ? "border-red-500" : ""
                }`}
                {...register("id_number", { required: true })}
              />
              {errors.id_number && (
                <span className="text-red-500">Id Number is required</span>
              )}
            </div>
          </div>

          <div className="w-[600px] ">
            <label
              htmlFor="company_name"
              className="text-sm font-semibold text-[#333333] "
            >
              Company Name
            </label>
            <div className="mt-[8px] relative">
              <IoPersonOutline
                className={`absolute text-2xl left-4 ${
                  errors.company_name ? "top-1/3" : "top-1/2"
                }  transform -translate-y-1/2 text-gray-400`}
              />

              <input
                type="text"
                readOnly={true}
                value={value.company_name}
                placeholder="Input Company Name"
                className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.company_name ? "border-red-500" : ""
                }`}
                {...register("company_name", { required: true })}
              />
              {errors.company_name && (
                <span className="text-red-500">Company Name is required</span>
              )}
            </div>
          </div>

          <div className="w-[600px] ">
            <label
              htmlFor="country"
              className="text-sm font-semibold text-[#333333] "
            >
              Country
            </label>
            <div className="mt-[8px] relative">
              <IoLocationOutline
                className={`absolute text-2xl left-4 ${
                  errors.country ? "top-1/3" : "top-1/2"
                }  transform -translate-y-1/2 text-gray-400`}
              />

              <input
                type="text"
                readOnly={true}
                value={value.country}
                placeholder="Input Country"
                className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.country ? "border-red-500" : ""
                }`}
                {...register("country", { required: true })}
              />
              {errors.country && (
                <span className="text-red-500">Country is required</span>
              )}
            </div>
          </div>

          <div className="w-[600px] ">
            <label
              htmlFor="state"
              className="text-sm font-semibold text-[#333333] "
            >
              State
            </label>
            <div className="mt-[8px] relative">
              <IoLocationOutline
                className={`absolute text-2xl left-4 ${
                  errors.state ? "top-1/3" : "top-1/2"
                }  transform -translate-y-1/2 text-gray-400`}
              />

              <input
                type="text"
                readOnly={true}
                value={value.state}
                placeholder="Input State"
                className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.state ? "border-red-500" : ""
                }`}
                {...register("state", { required: true })}
              />
              {errors.state && (
                <span className="text-red-500">State is required</span>
              )}
            </div>
          </div>

          <div className="w-[600px] ">
            <label
              htmlFor="city"
              className="text-sm font-semibold text-[#333333] "
            >
              City
            </label>
            <div className="mt-[8px] relative">
              <IoLocationOutline
                className={`absolute text-2xl left-4 ${
                  errors.city ? "top-1/3" : "top-1/2"
                }  transform -translate-y-1/2 text-gray-400`}
              />

              <input
                type="text"
                readOnly={true}
                value={value.city}
                placeholder="Input City"
                className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.city ? "border-red-500" : ""
                }`}
                {...register("city", { required: true })}
              />
              {errors.city && (
                <span className="text-red-500">City is required</span>
              )}
            </div>
          </div>

          <div className="w-[600px] ">
            <label
              htmlFor="additional_requirements"
              className="text-sm font-semibold text-[#333333] "
            >
              Additional Requirements
            </label>
            <div className="mt-[8px] relative">
              <FiMessageSquare
                className={`absolute text-2xl left-4 ${
                  errors.additional_requirements ? "top-1/3" : "top-1/2"
                }  transform -translate-y-1/2 text-gray-400`}
              />

              <input
                type="text"
                readOnly={true}
                value={value.additional_requirements}
                placeholder="Input Additional Requirements"
                className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.additional_requirements ? "border-red-500" : ""
                }`}
                {...register("additional_requirements", { required: true })}
              />
              {errors.additional_requirements && (
                <span className="text-red-500">
                  Additional Requirements is required
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="w-[320px] h-[56px] mb-12 rounded-xl mt-10 flex items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center  px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
          onClick={() => {
            if (isLoading === false) {
              onSubmit();
            } else {
            }
          }}
        >
          {isLoading === false ? "Continue" : "Loading"}
        </button>
        <div
          type="submit"
          className="w-[320px] h-[56px] rounded-xl mb-12 mt-10 flex items-center bg-white justify-center  px-4 py-4 text-base font-semibold text-black transition-all duration-200    border-2 border-gray-950"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </div>
      </div>
    </div>
  );
};

export default VisitForm;
