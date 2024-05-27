"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useAtom } from "jotai";
import { phonenumberdataAtom } from "@/jotai/dash-atoms";

import axiosInstance from "@/modules/axios";
import DefaultButton from "@/modules/core-ui/Button";
import AuthSlider from "@/modules/auth-component/AuthSlider";

function ResetPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [phoneNumber] = useAtom(phonenumberdataAtom);

  const onSubmit = async (formData) => {
    const data = { ...formData, mobile_number: phoneNumber.number };

    try {
      const response = await axiosInstance.put("/user/reset-password/", data);
      if (response.status === 200) {
        toast.success("Password reset successful. Please login.");
        router.push("/login");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Password reset failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <>
      <div className="grid px-5 py-2 mx-auto lg:px-32 md:grid-cols-2 max-w-9xl">
        <div className="flex items-center justify-start px-4 py-10 bg-white md:px-0 ">
          <div
            className="xl:w-full xl:max-w-[460px] 2xl:max-w-[540px]"
            style={{ width: "80%" }}
          >
            <Image
              src={require(`../../assets/epass.png`)}
              alt="Logo"
              width={100}
              height={44}
              loading="lazy"
            />
            <h2 className="mt-6 text-2xl font-bold text-black sm:text-4xl">
              Reset Password
            </h2>
            <p className="mt-2 text-xs font-normal text-[#090A0A]">
              The OTP has been sent to your email and mobile number to reset the
              password.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <InputField
                id="otp"
                label="OTP"
                register={register("otp", { required: "OTP is required" })}
                error={errors.otp}
                placeholder="Enter OTP"
              />
              <InputField
                id="new_password"
                label="New Password"
                type="password"
                register={register("new_password", {
                  required: "New Password is required",
                })}
                error={errors.new_password}
                placeholder="Enter New Password"
              />
              <DefaultButton text="Reset Password" />
            </form>
          </div>
        </div>
        <AuthSlider />
      </div>
    </>
  );
}

function InputField({
  id,
  label,
  type = "text",
  register,
  error,
  placeholder,
}) {
  return (
    <div>
      <label htmlFor={id} className="text-base font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2.5">
        <input
          type={type}
          {...register}
          placeholder={placeholder}
          className={`block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border ${
            error ? "border-red-500" : "border-gray-200"
          } rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600`}
          aria-label={label}
        />
        {error && <span className="text-red-500">{error.message}</span>}
      </div>
    </div>
  );
}

export default ResetPassword;
