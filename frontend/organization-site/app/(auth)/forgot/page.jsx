"use client";

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { MdPersonOutline } from "react-icons/md";

import dynamic from "next/dynamic";
import { useAtom } from "jotai";
import { phonenumberdataAtom } from "@/jotai/dash-atoms";
import axiosInstance from "@/modules/axios";

const AuthSlider = dynamic(
  () => import("@/modules/auth-component/AuthSlider"),
  { ssr: false }
);

function ForgotPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [, setvalue] = useAtom(phonenumberdataAtom);

  const onSubmit = useCallback(
    async (data) => {
      try {
        const response = await axiosInstance.post(
          "/user/forgot-password/",
          data
        );
        if (response.status === 200) {
          toast.success("OTP sent for password reset. Check your mobile.");
          router.push(`/reset`);
          setvalue({ number: data.mobile_number });
        }
      } catch (error) {
        toast.error(
          "OTP sending failed. please check your number and try again."
        );
      }
    },
    [router, setvalue]
  );

  return (
    <div className="grid px-5 py-2 mx-auto font-inter xl:px-32 md:grid-cols-2 max-w-9xl">
      <div
        className="flex items-center justify-center px-4 py-10 bg-white md:px-0"
        style={{ justifyContent: "center" }}
      >
        <div
          className="xl:w-full xl:max-w-[460px] 2xl:max-w-[540px]"
          style={{ width: "80%" }}
        >
          <Image
            src={require("../../assets/epass.png")}
            alt="ePass Logo"
            className="h-11"
            width={100}
            height={44}
            loading="lazy"
          />
          <h2 className="text-2xl font-bold leading-tight text-black sm:text-4xl mt-10">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="mobile_number"
                  className="text-sm font-normal text-[#A3A3A3]"
                >
                  Username (Mobile Number or Email)
                </label>
                <div className="mt-2.5 relative">
                  <MdPersonOutline
                    className={`absolute text-2xl left-4 ${
                      errors.mobile_number ? "top-1/3" : "top-1/2"
                    } transform -translate-y-1/2 text-gray-400`}
                  />
                  <input
                    type="tel"
                    {...register("mobile_number", {
                      required: "Username is required",
                    })}
                    placeholder="Input your mobile number or email"
                    className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                      errors.mobile_number ? "border-red-500" : ""
                    }`}
                  />
                  {errors.mobile_number && (
                    <p className="mt-1 text-red-500">
                      {errors.mobile_number.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex items-center mt-10 bg-gradient-to-r from-[#25AAE1] to-[#0F75BC] justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                >
                  Continue
                </button>
              </div>
              <div className="flex items-center justify-center mt-5">
                <Link
                  href="/login"
                  title="login now"
                  className="text-base font-normal text-center"
                >
                  Go Back
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <AuthSlider />
    </div>
  );
}

export default React.memo(ForgotPassword);
