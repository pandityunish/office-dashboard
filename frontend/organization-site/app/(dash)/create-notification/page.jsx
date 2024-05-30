"use client";

import { useUserData } from "@/modules/hooks/useUserData";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LuUpload } from "react-icons/lu";
import { useAtom } from "jotai";
import { MdArrowDropDown } from "react-icons/md";
import {
  notificationAudiences,
  notificationTypes,
} from "@/modules/data/organization_types_nature";
import DefaultButton from "@/modules/core-ui/Button";
import { useRef, useState, useEffect } from "react";
import Imagepicker from "@/modules/kyc-component/Imagepicker";
import { createNotification } from "@/modules/data/notification_service";
import { toast } from "react-toastify";
import axiosInstance from "@/modules/axios";
import Select from "react-select";

const MannualEntry = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `${user.full_name} - ${user.email}`,
  }));

  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleAudienceChange = (event) => {
    const selectedAudience = event.target.value;
    setShowUserDropdown(selectedAudience === "Individual User");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log('################################################', file)
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { data: user } = useUserData();

  const onSubmit = async (data) => {
    try {
      const response = await createNotification({
        toast,
        userId: user.id,
        notification_type: data.notification_type,
        target_audience: data.target_audience,
        title: data.title,
        message: data.message,
        selectedUser: showUserDropdown ? selectedUser : null,
        selectedImage,
      });

      if (response.status == 201) {
        reset();
        toast.success("Notification Sent successfully");
        router.push("/success");
      } else {
        router.push("/error");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="xl:w-[100%] lg:w-[1367px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 bg-white rounded-lg shadow-3xl">
          <h1 className="mb-4 text-2xl font-semibold">Create Notification</h1>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="w-[600px]">
              <label
                htmlFor="notification_type"
                className="text-sm font-normal text-[#A3A3A3]"
              >
                Notification Type
              </label>
              <div className="mt-[8px] relative">
                <select
                  className="block w-full p-4 text-[#A3A3A3] pl-5 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none"
                  {...register("notification_type", { required: true })}
                >
                  <option value="" className="text-[#A3A3A3]">
                    Select notification type
                  </option>
                  {notificationTypes.map((org) => (
                    <option
                      key={org.id}
                      value={org.value}
                      className="text-sm font-normal text-[#A3A3A3]"
                    >
                      {org.title}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <MdArrowDropDown />
                </div>

                {errors.notification_type && (
                  <span className="text-red-500">Please select purpose</span>
                )}
              </div>
            </div>
            <div className="w-[600px]">
              <label
                htmlFor="target_audience"
                className="text-sm font-normal text-[#A3A3A3]"
              >
                Target Audience
              </label>
              <div className="mt-[8px] relative">
                <select
                  className="block w-full p-4 text-[#A3A3A3] pl-5 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none"
                  {...register("target_audience", { required: true })}
                  onChange={handleAudienceChange}
                >
                  <option value="" className="text-[#A3A3A3]">
                    Select target audience
                  </option>
                  {notificationAudiences.map((org) => (
                    <option
                      key={org.id}
                      value={org.value}
                      className="text-sm font-normal text-[#A3A3A3]"
                    >
                      {org.title}
                    </option>
                  ))}
                </select>
                <div
                  className={`pointer-events-none absolute inset-y-0 right-0 ${
                    errors.target_audience ? "-top-6" : ""
                  } flex items-center px-2 text-gray-700`}
                >
                  <MdArrowDropDown />
                </div>

                {errors.target_audience && (
                  <span className="text-red-500">Please target audience</span>
                )}
              </div>
              {showUserDropdown && (
                <div className="w-[600px] mt-4">
                  <label
                    htmlFor="user"
                    className="text-sm font-normal text-[#A3A3A3]"
                  >
                    Select User
                  </label>
                  <div className="mt-[8px]">
                    <Select
                      options={userOptions}
                      value={userOptions.find(
                        (option) => option.value === selectedUser?.value
                      )}
                      onChange={handleUserChange}
                      getOptionValue={(option) => option.value}
                      className="text-black"
                      placeholder="Select user"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="w-[600px]">
              <label
                htmlFor="title"
                className="text-sm font-normal text-[#A3A3A3]"
              >
                Title
              </label>
              <div className="mt-[8px] relative">
                <input
                  type="text"
                  placeholder="Input title"
                  className={`block w-full p-4 pl-5 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                    errors.title ? "border-red-500" : ""
                  }`}
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-red-500">Title is required</span>
                )}
              </div>
            </div>
            <div className="w-[600px]">
              <label
                htmlFor="message"
                className="text-sm font-normal text-[#A3A3A3]"
              >
                Message
              </label>
              <div className="mt-[8px] relative">
                <input
                  type="text"
                  placeholder="Input message"
                  className={`block w-full p-4 pl-5 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <span className="text-red-500">Message is required</span>
                )}
              </div>
            </div>

            <Imagepicker
              title="Attach File (Optional)"
              handleImageChange={handleImageChange}
              fileInputRef={fileInputRef}
              selectedImage={selectedImage}
              handleImageClick={handleImageClick}
              LuUpload={LuUpload}
            />
          </div>
        </div>
        <div className="w-[320px] my-10">
          <DefaultButton text="Create" />
        </div>
      </form>
    </div>
  );
};

export default MannualEntry;
