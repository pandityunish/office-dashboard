"use client";

import axiosInstance from "@/modules/axios";
import DefaultButton from "@/modules/core-ui/Button";
import LoadingComponent from "@/modules/core-ui/LoadingComponent";
import { useUserData } from "@/modules/hooks/useUserData";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { toast } from "react-toastify";
import { FaMobileScreen } from "react-icons/fa6";
import { IoMdLaptop } from "react-icons/io";
import { getLogDevices } from "@/modules/data/notification_service";
import { MdOutlineGroups } from "react-icons/md";
import { useRouter } from "next/navigation";

const Page = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isClicked, setIsClicked] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [devices, setDevices] = useState(null);
  const [approveVisitorBeforeAccess, setApproveVisitorBeforeAccess] = useState(
    user?.approve_visitor_before_access
  );
  const router = useRouter();

  useEffect(() => {
    getLogDevices({ toast, setDevices });
  }, []);

  const handlePasswordChange = async (data) => {
    try {
      const response = await axiosInstance.patch(
        "/user/change-password/",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully");
        router.push("/dash");
      }
    } catch (error) {
      toast.error(error.response.data[0]);
    }
  };

  const handleToggleSetting = async () => {
    try {
      const response = await axiosInstance.post(
        `/organization/${user.id}/settings`,
        { approve_visitor_before_access: !approveVisitorBeforeAccess },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (response.status === 201) {
        setApproveVisitorBeforeAccess(!approveVisitorBeforeAccess);
        toast.success("Settings updated");
      }
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };

  const onSubmit = () => {
    handlePasswordChange({
      old_password: oldPassword,
      new_password: password,
    });
  };
  
  if (isUserLoading) return <LoadingComponent />;

  return (
    <div className="lg:w-[100%] w-[1367px] py-4 mx-auto bg-white shadow-lg p-7 pt-12 rounded-lg">
      <h1 className="mb-4 text-2xl font-inter font-bold">Setting</h1>
      <div className="flex gap-8 mt-6">
        {["Change password", "Log Activity", "Other Settings"].map(
          (tab, index) => (
            <div
              key={index}
              className="w-[180px] flex flex-col items-center justify-center cursor-pointer transition duration-1000 ease-in"
              onClick={() => setIsClicked(index)}
            >
              <h1
                className={`${
                  isClicked === index
                    ? "font-bold text-primaryblue"
                    : "font-normal"
                } font-inter text-base transition duration-1000 ease-in`}
              >
                {tab}
              </h1>
              {isClicked === index && (
                <div className="bg-primaryblue h-[2px] mt-2 w-full"></div>
              )}
            </div>
          )
        )}
      </div>
      <div className="w-full bg-greyneutral h-[1px] mb-2"></div>

      {isClicked === 0 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-10 mt-8 mb-4"
        >
          <PasswordInput
            label="Old Password"
            register={register}
            name="oldPassword"
            value={oldPassword}
            setValue={setOldPassword}
            errors={errors}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
          <PasswordInput
            label="New Password"
            register={register}
            name="password"
            value={password}
            setValue={setPassword}
            errors={errors}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
          <div className="w-[320px] mt-10">
            <DefaultButton text="Change" />
          </div>
        </form>
      )}

      {isClicked === 1 && (
        <div className="flex flex-col mt-9">
          {devices ? (
            <>
              <div className="flex justify-between items-center">
                <p className="pl-[55px] font-semibold font-inter text-sm">
                  Name
                </p>
                <p className="pl-[50px] font-semibold font-inter text-sm">
                  IP address
                </p>
                <p className="font-semibold font-inter text-sm">Date</p>
              </div>
              {devices
                .sort((a, b) => new Date(b.create_at) - new Date(a.create_at))
                .map((device, index) => (
                  <DeviceLog key={index} device={device} />
                ))}
            </>
          ) : null}
        </div>
      )}

      {isClicked === 2 && (
        <div className="flex flex-col mt-9 h-[170px]">
          <div className="flex w-[532px] justify-between items-center">
            <div className="flex gap-5 items-center">
              <MdOutlineGroups className="text-2xl text-primaryblue" />
              <p className="font-semibold text-base">Visitors Allowed</p>
            </div>
            <div>
              <p className="font-semibold text-sm pb-1">off/on</p>
              <div
                className={`w-10 h-5 rounded-2xl flex items-center relative cursor-pointer ${
                  approveVisitorBeforeAccess ? "bg-primaryblue" : "bg-green-500"
                }`}
                onClick={handleToggleSetting}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute transition-transform transform ${
                    approveVisitorBeforeAccess ? "right-0" : "left-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PasswordInput = ({
  label,
  register,
  name,
  value,
  setValue,
  errors,
  isVisible,
  setIsVisible,
}) => (
  <div>
    <div className="flex items-center justify-between w-[600px]">
      <label htmlFor={name} className="text-sm font-normal text-[#A3A3A3]">
        {label}
      </label>
    </div>
    <div className="mt-2.5 relative">
      <CiLock
        className={`absolute text-2xl left-4 ${
          errors[name] ? "top-1/3" : "top-1/2"
        } transform -translate-y-1/2 text-gray-400`}
      />
      <div onClick={() => setIsVisible(!isVisible)} className="cursor-pointer">
        {isVisible ? (
          <MdOutlineVisibilityOff
            className={`absolute text-2xl right-4 ${
              errors[name] ? "top-1/3" : "top-1/2"
            } transform -translate-y-1/2 text-gray-400`}
          />
        ) : (
          <MdOutlineVisibility
            className={`absolute text-2xl right-4 ${
              errors[name] ? "top-1/3" : "top-1/2"
            } transform -translate-y-1/2 text-gray-400`}
          />
        )}
      </div>
      <input
        type={isVisible ? "text" : "password"}
        {...register(name, {
          value,
          onChange: (e) => setValue(e.target.value),
          required: `${label} is required`,
        })}
        placeholder={`Input your ${label.toLowerCase()}`}
        className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-gray-400 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
          errors[name] ? "border-red-500" : ""
        }`}
      />
      {errors[name] && (
        <p className="mt-1 text-red-500">{errors[name].message}</p>
      )}
    </div>
  </div>
);

const DeviceLog = ({ device }) => {
  const extractDeviceDetails = (deviceType) => {
    const match = deviceType.match(/\(([^)]+)\)/);
    return match ? match[1] : "Unknown";
  };

  const getDeviceOS = (deviceType) => {
    if (deviceType.includes("Windows")) {
      return "Windows";
    } else if (deviceType.includes("Android")) {
      return "Android";
    } else {
      return "Unknown";
    }
  };

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex justify-between py-2 items-center">
      <div className="flex gap-2 items-center">
        <div className="h-[48px] w-[48px] rounded-xl bg-[#E5F3FE] flex items-center justify-center">
          {getDeviceOS(device.device_type) === "Android" ? (
            <FaMobileScreen className="text-2xl text-primaryblue" />
          ) : (
            <IoMdLaptop className="text-2xl text-primaryblue" />
          )}
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-sm font-inter">
            {extractDeviceDetails(device.name_of_device)}
          </p>
          <p className="font-normal font-inter text-xs">
            {getDeviceOS(device.device_type)}
          </p>
        </div>
      </div>
      <p className="font-normal font-inter text-xs">{device.ip_address}</p>
      <div className="flex flex-col gap-2 items-center">
        <p className="font-normal font-inter text-xs">
          {convertDate(device.create_at)}
        </p>
      </div>
    </div>
  );
};

export default Page;
