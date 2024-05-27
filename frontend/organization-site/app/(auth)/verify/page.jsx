"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

import axiosInstance from "@/modules/axios";
import DefaultButton from "@/modules/core-ui/Button";
import AuthSlider from "@/modules/auth-component/AuthSlider";

function VerifyOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpValue, setOTPValue] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    const mobileNumber = searchParams.get("mobile_number");
    if (mobileNumber) {
      setMobileNumber(mobileNumber);
    }
  }, [searchParams]);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    if (!mobileNumber) {
      toast.error("Mobile number is not found. Please try again.");
      return;
    }

    try {
      const text = otpValue.join("");
      const payload = { otp: text, mobile_number: mobileNumber };

      const response = await axiosInstance.post(
        "/organization/verify-otp/",
        payload
      );

      if (response.status === 200) {
        toast.success("Verification successful. Please login.");
        router.push("/final");
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    if (!mobileNumber) {
      toast.error("Mobile number is not set. Please try again.");
      return;
    }

    try {
      const response = await axiosInstance.post("/user/resend-otp/", {
        mobile_number: mobileNumber,
      });

      if (response.status === 200) {
        toast.success("OTP sent successfully.");
      }
    } catch (error) {
      toast.error("Cannot send OTP. Please try again.");
    }
  };

  const handleOTPChange = (newValue, index) => {
    const newOTPValue = [...otpValue];
    newOTPValue[index] = newValue;
    setOTPValue(newOTPValue);
    if (newValue !== "" && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    } else if (newValue === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="grid px-5 py-2 mx-auto font-inter xl:px-32 md:grid-cols-2 max-w-9xl">
      <div className="flex items-center justify-start px-4 py-10 bg-white md:px-0">
        <div
          className="xl:w-full xl:max-w-[460px] 2xl:max-w-[540px]"
          style={{ width: "74%" }}
        >
          <Image
            src={require(`../../assets/epass.png`)}
            alt=""
            className="h-11"
            width={100}
            height={44}
            loading="lazy"
          />

          <h2 className="text-2xl font-bold leading-tight text-black sm:text-4xl mt-10">
            Verification
          </h2>
          <p className="mt-2 text-xs text-[#090A0A] font-normal">
            The OTP has been sent to your email and mobile number.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="otp"
                  className="text-base font-medium text-gray-900"
                >
                  Enter OTP
                </label>
                <div className="mt-2.5">
                  <div className="flex">
                    {otpValue.map((value, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={value}
                        onChange={(e) => handleOTPChange(e.target.value, index)}
                        className="w-12 h-12 mx-1 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    ))}
                    <button
                      type="button"
                      className="text-black bg-[#E0E0E0] rounded-md px-4 text-xs font-bold h-12 ml-2"
                      onClick={handleResendOTP}
                    >
                      Resend Code
                    </button>
                  </div>
                  {errors.otp && (
                    <span className="text-red-500">OTP is required</span>
                  )}
                </div>
              </div>
              <div className="pt-8">
                <DefaultButton text="Continue" />
              </div>
              <div className="flex items-center justify-center">
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

export default VerifyOTP;
