"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdArrowDropDown,
  MdPersonOutline,
  MdOutlineMailOutline,
  MdOutlineLock,
} from "react-icons/md";
import { PiBagSimpleBold } from "react-icons/pi";
import { CgOrganisation } from "react-icons/cg";
import { FaMobileAlt } from "react-icons/fa";

import axiosInstance from "@/modules/axios";
import { organizationTypes } from "@/modules/data/organization_types_nature";

const AuthSlider = dynamic(() => import("@/modules/auth-component/AuthSlider"), { ssr: false });

export default function Register() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onRegisterSubmit = async (data) => {
    try {
      const orgnaization_registration_data = {
        ...data,
        is_organization: true,
        full_name: data.organization_name,
      };
      const response = await axiosInstance.post("/user/register/", orgnaization_registration_data);

      if (response.status === 201) {
        toast.success("Welcome, Successfully Registered");
        router.push(`/verify?mobile_number=${data.mobile_number}`);
      } else {
        toast.error("Registration Failed, Try Again");
      }
    } catch (error) {
      const status = error.response?.status;
      const responseData = error.response?.data;
      if (status === 500 || status === 404) {
        toast.error("Registration Failed, Try Again");
      } else if (responseData) {
        const message = responseData.mobile_number?.[0] || responseData[0] || "Registration Failed, Try Again";
        toast.error(message);
      } else {
        toast.error("Registration Failed, Try Again");
      }
    }
  };

  return (
    <div id="container" className="grid px-5 py-2 mx-auto overflow-y-scroll xl:px-32 md:grid-cols-2 font-inter max-w-9xl">
      <div className="flex flex-col">
        <div className="flex items-center justify-start px-4 py-10 bg-white md:px-0 mr-4">
          <div className="xl:max-w-[568px] 2xl:max-w-[568px]">
            <div className="text-center text-black flex justify-between items-center">
              <Image
                src={require(`../../assets/epass.png`)}
                alt="ePass Logo"
                className="h-11"
                width={100}
                height={44}
                loading="lazy"
              />
              <p>
                Already have an account?{" "}
                <span>
                  <Link
                    href="/login"
                    title="Create free account at epass"
                    className="ml-1 font-medium text-[#0F75BC] transition-all duration-200 hover:text-[#0F75BC] hover:underline focus:text-blue-700"
                  >
                    Login
                  </Link>
                </span>
              </p>
            </div>
            <h2 className="text-2xl font-semibold leading-tight mt-16 text-black sm:text-3xl">Register</h2>
            <p className="mt-2 text-sm text-[#090A0A] font-normal font-inter">
              Get started with Epass by filling in all the necessary details.
            </p>
            <form onSubmit={handleSubmit(onRegisterSubmit)} className="mt-6">
              <div className="space-y-5">
                <div>
                  <label htmlFor="organization_name" className="text-sm font-normal text-[#A3A3A3]">
                    Office Name
                  </label>
                  <div className="mt-2.5 relative">
                    <CgOrganisation className={`absolute text-2xl left-4 ${errors.organization_name ? "top-1/3" : "top-1/2"} transform -translate-y-1/2 text-gray-400`} />
                    <input
                      type="text"
                      placeholder="Input your office full name"
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.organization_name ? "border-red-500" : ""}`}
                      {...register("organization_name", { required: "Office name is required" })}
                    />
                    {errors.organization_name && (
                      <span className="text-red-500">{errors.organization_name.message}</span>
                    )}
                  </div>
                </div>
                <div className="w-full gap-2">
                  <section>
                    <label htmlFor="organization_type" className="text-sm font-normal text-[#A3A3A3]">
                      Office Type
                    </label>
                    <div className="mt-2.5 relative">
                      <select
                        className="block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none"
                        {...register("organization_type", { required: "Please select office type" })}
                      >
                        <option value="" className="text-[#A3A3A3]">
                          Select your office type
                        </option>
                        {organizationTypes.map((org) => (
                          <option key={org.id} value={org.value} className="text-sm font-normal text-[#A3A3A3]">
                            {org.title}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <MdArrowDropDown />
                      </div>
                      <PiBagSimpleBold className={`absolute text-2xl left-4 ${errors.organization_type ? "top-1/3" : "top-1/2"} transform -translate-y-1/2 text-gray-400`} />
                      {errors.organization_type && (
                        <span className="text-red-500">{errors.organization_type.message}</span>
                      )}
                    </div>
                  </section>
                </div>
                <div>
                  <label htmlFor="full_name" className="text-sm font-normal text-[#A3A3A3]">
                    Contact Person Name
                  </label>
                  <div className="mt-2.5 relative">
                    <MdPersonOutline className={`absolute text-2xl left-4 ${errors.full_name ? "top-1/3" : "top-1/2"} transform -translate-y-1/2 text-gray-400`} />
                    <input
                      type="text"
                      placeholder="Input contact person name"
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.full_name ? "border-red-500" : ""}`}
                      {...register("full_name", { required: "Person Name is required" })}
                    />
                    {errors.full_name && (
                      <span className="text-red-500">{errors.full_name.message}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-normal text-[#A3A3A3]">
                    E-mail
                  </label>
                  <div className="mt-2.5 relative">
                    <MdOutlineMailOutline className={`absolute text-2xl left-4 ${errors.email ? "top-1/3" : "top-1/2"} transform -translate-y-1/2 text-gray-400`} />
                    <input
                      type="email"
                      placeholder="Enter E-mail"
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.email ? "border-red-500" : ""}`}
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                      <span className="text-red-500">{errors.email.message}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="mobile_number" className="text-sm font-normal text-[#A3A3A3]">
                    Mobile Number
                  </label>
                  <div className="mt-2.5 relative">
                    <FaMobileAlt className={`absolute text-2xl left-4 ${errors.mobile_number ? "top-1/3" : "top-1/2"} transform -translate-y-1/2 text-gray-400`} />
                    <input
                      type="tel"
                      placeholder="Enter Mobile Number"
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.mobile_number ? "border-red-500" : ""}`}
                      {...register("mobile_number", { required: "Mobile number is required" })}
                    />
                    {errors.mobile_number && (
                      <span className="text-red-500">{errors.mobile_number.message}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-normal text-[#A3A3A3]">
                    Password
                  </label>
                  <div className="mt-2.5 relative">
                    <MdOutlineLock className={`absolute text-2xl left-4 ${errors.password ? "top-1/3" : "top-1/2"} transform -translate-y-1/2 text-gray-400`} />
                    <div onClick={() => setIsVisible(!isVisible)} className="cursor-pointer">
                      {isVisible ? (
                        <MdOutlineVisibilityOff className={`absolute text-2xl right-4 ${errors.password ? "top-1/3" : "top-1/2"} transform -translate-y-1/2 text-gray-400`} />
                      ) : (
                        <MdOutlineVisibility className={`absolute text-2xl right-4 ${errors.password ? "top-1/3" : "top-1/2"} transform -translate-y-1/2 text-gray-400`} />
                      )}
                    </div>
                    <input
                      type={isVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.password ? "border-red-500" : ""}`}
                      {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && (
                      <span className="text-red-500">{errors.password.message}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="flex items-start text-gray-500 mb-4" htmlFor="remember">
                    <input
                      className="ml-2 mt-1 leading-tight w-[20px] h-[20px]"
                      type="checkbox"
                      id="remember"
                      name="remember"
                    />
                    <span className="ml-1 text-base font-inter font-normal">
                      I agree to{" "}
                      <a href="www.google.com" target="_blank" className="text-[#7B61FF] cursor-pointer text-base font-inter font-normal">
                        Terms of Use
                      </a>{" "}
                      and acknowledge that I have read the{" "}
                      <a href="www.google.com" target="_blank" className="text-[#7B61FF] cursor-pointer text-base font-inter font-normal">
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="inline-flex items-center mt-4 bg-gradient-to-r from-[#25AAE1] to-[#0F75BC] justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <AuthSlider />
      </div>
    </div>
  );
}
