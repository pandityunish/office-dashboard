"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import AdsComponent from "@/modules/dash-component/AdsComponent";
import QrComponent from "@/modules/dash-component/QrComponent";
import { useUserData } from "@/modules/hooks/useUserData";
import axiosInstance from "@/modules/axios";
import { organizationTypes } from "@/modules/data/organization_types_nature";

export default function Profile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserData();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setValue("full_name", user.full_name);
      setValue("mobile_number", user.mobile_number);
      setValue("email", user.email);
      setValue("address", user.address);
      setValue("organization_name", user.organization_name);
      setValue("organization_type", user.organization_type);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("access");
      const response = await axiosInstance.put(`/user/update/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        router.push("/dash");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error updating profile:", error.response.data);
        toast.error(`Failed to update profile: ${error.response.data.message}`);
      } else {
        console.error("Error updating profile:", error.message);
        toast.error("Failed to update profile");
      }
    }
  };

  return (
    <div>
      {user === null || isUserLoading || user === null ? (
        <></>
      ) : (
        <div className="flex justify-between">
          <section className="lg:w-[73%] w-[948px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full rounded-xl bg-white shadow-lg mt-3 pb-10"
            >
              <div className="bg-gradient-to-r from-[#25AAE1] to-[#0F75BC] h-[90px] w-full rounded-t-xl"></div>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 p-10">
                <div className="w-[400px]">
                  <label
                    htmlFor="full_name"
                    className="text-sm font-semibold text-[#333333]"
                  >
                    Full Name
                  </label>
                  <div className="mt-[8px] relative">
                    <input
                      type="text"
                      placeholder="Input full name"
                      className={`block w-full p-4 pl-8 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                        errors.full_name ? "border-red-500" : ""
                      }`}
                      {...register("full_name", { required: true })}
                    />
                    {errors.full_name && (
                      <span className="text-red-500">
                        Full Name is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-[400px]">
                  <label
                    htmlFor="mobile_number"
                    className="text-sm font-semibold text-[#333333]"
                  >
                    Mobile Number
                  </label>
                  <div className="mt-[8px] relative">
                    <input
                      type="text"
                      placeholder="Input mobile number"
                      className={`block w-full p-4 pl-8 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                        errors.mobile_number ? "border-red-500" : ""
                      }`}
                      {...register("mobile_number", { required: true })}
                    />
                    {errors.mobile_number && (
                      <span className="text-red-500">
                        Mobile Number is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-[400px]">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-[#333333]"
                  >
                    Email address
                  </label>
                  <div className="mt-[8px] relative">
                    <input
                      type="text"
                      placeholder="Input email address"
                      className={`block w-full p-4 pl-8 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-500">Email is required</span>
                    )}
                  </div>
                </div>
                <div className="w-[400px]">
                  <label
                    htmlFor="address"
                    className="text-sm font-semibold text-[#333333]"
                  >
                    Address
                  </label>
                  <div className="mt-[8px] relative">
                    <input
                      type="text"
                      placeholder="Input address"
                      className={`block w-full p-4 pl-8 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                        errors.address ? "border-red-500" : ""
                      }`}
                      {...register("address", { required: true })}
                    />
                    {errors.address && (
                      <span className="text-red-500">Address is required</span>
                    )}
                  </div>
                </div>
                <div className="w-[400px]">
                  <label
                    htmlFor="organization_name"
                    className="text-sm font-semibold text-[#333333]"
                  >
                    Organization Name
                  </label>
                  <div className="mt-[8px] relative">
                    <input
                      type="text"
                      placeholder="Input Organization Name"
                      className={`block w-full p-4 pl-8 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                        errors.organization_name ? "border-red-500" : ""
                      }`}
                      {...register("organization_name", { required: true })}
                    />
                    {errors.organization_name && (
                      <span className="text-red-500">
                        Organization Name is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-[400px]">
                  <label
                    htmlFor="organization_type"
                    className="text-sm font-semibold text-[#333333]"
                  >
                    Organization Type
                  </label>
                  <div className="mt-[8px] relative">
                    <select
                      className={`block w-full p-4 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                        errors.organization_type ? "border-red-500" : ""
                      }`}
                      {...register("organization_type", { required: true })}
                    >
                      <option value="" className="text-[#A3A3A3]">
                        Select your office type
                      </option>
                      {organizationTypes.map((org) => (
                        <option key={org.id} value={org.value} className="text-sm font-normal text-[#333333]">
                          {org.title}
                        </option>
                      ))}
                    </select>
                    {errors.organization_type && (
                      <span className="text-red-500">
                        Organization Type is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-[400px]">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#333333]"
                  >
                    Password
                  </label>
                  <div className="mt-[8px] relative">
                    <input
                      type="password"
                      placeholder="Input password"
                      className={`block w-full p-4 pl-8 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-textfromgray focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-red-500">Password is required</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="inline-flex h-[53px] w-[152px] items-center bg-gradient-to-r from-[#25AAE1] to-[#0F75BC] justify-center px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </section>
          <section className="flex m-2 flex-col lg:w-[25%] w-[388px]">
            <QrComponent />
            <AdsComponent />
          </section>
        </div>
      )}
    </div>
  );
}