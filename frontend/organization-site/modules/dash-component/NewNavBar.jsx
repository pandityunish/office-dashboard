"use client";

import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useUserData } from "../hooks/useUserData";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { allsearchresults } from "../data/searchfeatures";
import { useAtom } from "jotai";
import { showLeftSidebarAtom } from "@/jotai/ui-atoms";
import { baseurl } from "../apiurl";
import { getorgprofile } from "../data/profile_service";
import { toast } from "react-toastify";
import { getNotificationsCount } from "../data/notification_service";

export default function NewNavBar() {
  const router = useRouter();
  const pageFullUrl = usePathname();
  const [showLeftSidebar, setShowLeftSidebar] = useAtom(showLeftSidebarAtom);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserData();

  const [searchTerm, setsearchTerm] = useState("");
  const [objects, setObjects] = useState(allsearchresults);

  const handleSearch = (e) => {
    searchTerm(e.target.value);
  };
  const [notificationCount, setNotificationCount] = useState(null);
  const filteredObjects = objects.filter((obj) =>
    obj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [kycorg, setkycorg] = useState(null);

  useEffect(() => {
    if (user === null || isUserLoading) {
    } else {
      getorgprofile({ toast: toast, setorgkyc: setkycorg, id: user.id });
      getNotificationsCount({
        toast: toast,
        id: user.id,
        setnotificationscount: setNotificationCount,
      });
    }
  }, [user]);

  return (
    <div className="flex lg:w-full w-[1367px] mt-4 sm:p-7 p-4 md:pr-9 pr-0 justify-between">
      <div className="flex gap-4 items-center">
        <IoMenu
          className="text-3xl cursor-pointer"
          onClick={() => {
            setShowLeftSidebar(!showLeftSidebar);
          }}
        />
        <div className="flex flex-col">
          <p className="text-[#A0AEC0] font-inter text-xs font-normal">
            Page /{" "}
            <span className="text-[#2D3748] ">
              {pageFullUrl === "/verify-kyc" || pageFullUrl === "/kyc-preview"
                ? "Kyc"
                : pageFullUrl === "/manual-entry" ||
                  pageFullUrl === "/manual-preview"
                ? " Manual Visitor Entry Form"
                : pageFullUrl === "/profile"
                ? "Profile"
                : pageFullUrl === "/edit-profile"
                ? "Profile"
                : pageFullUrl === "/sub-admin-list/details"
                ? "Sub Admin details"
                : pageFullUrl === "/visitor-report"
                ? "Visitor/Visitor Report"
                : pageFullUrl === "/create-sub-admin"
                ? "Create New Sub Admin User"
                : pageFullUrl === "/create-notification"
                ? "Notification/Create Notification"
                : pageFullUrl === "/settings"
                ? "Setting"
                : pageFullUrl === "/notifications"
                ? "Notification"
                : pageFullUrl === "/create-branch"
                ? "Branch/Create Branch"
                : pageFullUrl === "/visitor-details"
                ? "Visitor/Visitor Details"
                : pageFullUrl === "/sub-admin-list"
                ? "Sub Admin/Sub admin List"
                : pageFullUrl === "/branch-list"
                ? "Branch/Branch list"
                : pageFullUrl === "/branch-list/details"
                ? "Branch Details"
                : pageFullUrl === "/visitor-list"
                ? "Visitor/ Visitor List"
                : "Dashboard"}
            </span>
          </p>
          <p className="font-bold text-base font-inter mt-1">
            {" "}
            {pageFullUrl === "/verify-kyc" || pageFullUrl === "/kyc-preview"
              ? "Kyc"
              : pageFullUrl === "/manual-entry" ||
                pageFullUrl === "/manual-preview"
              ? " Manual Visitor Entry Form"
              : pageFullUrl === "/create-sub-admin"
              ? "Create New Sub Admin User"
              : pageFullUrl === "/visitor-report"
              ? "Visitor Report"
              : pageFullUrl === "/sub-admin-list/details"
              ? "Sub Admin Details"
              : pageFullUrl === "/profile"
              ? "Profile"
              : pageFullUrl === "/edit-profile"
              ? "Profile"
              : pageFullUrl === "/settings"
              ? "Setting"
              : pageFullUrl === "/create-notification"
              ? "Create Notification"
              : pageFullUrl === "/create-branch"
              ? "Create Branch"
              : pageFullUrl === "/notifications"
              ? "Notification"
              : pageFullUrl === "/visitor-details"
              ? "Visitor Details"
              : pageFullUrl === "/sub-admin-list"
              ? "Sub admin List"
              : pageFullUrl === "/branch-list/details"
              ? "Branch Details"
              : pageFullUrl === "/branch-list"
              ? "Branch list"
              : pageFullUrl === "/visitor-list"
              ? "Visitor List"
              : "Dashboard"}
          </p>
        </div>
      </div>
      <div className="flex items-center md:gap-6 gap-0 relative">
        <div className="relative">
          <form autoComplete="off">
            <input
              type="search"
              autoComplete="new-password"
              className="border  border-[#898989] p-4 rounded-xl h-[45px] w-[333px]   focus:outline-none pl-10"
              placeholder="Search here..."
              onChange={(e) => setsearchTerm(e.target.value)}
            />
          </form>
          <IoSearchSharp className="absolute text-xl left-3 top-1/2  transform -translate-y-1/2 text-gray-400" />
          <div
            className={`${
              searchTerm === "" ? "hidden" : "absolute"
            } z-50 p-7 bg-white shadow-3xl rounded-lg h-[200px] w-[333px] mt-2`}
          >
            {filteredObjects.map((e, i) => {
              return (
                <p
                  key={i}
                  className="font-inter font-normal text-sm py-2 cursor-pointer"
                  onClick={() => {
                    router.push(e.path);
                    setsearchTerm("");
                  }}
                >
                  {e.name}
                </p>
              );
            })}
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push("/notifications");
          }}
        >
          <div className="relative">
            <IoMdNotificationsOutline className="text-3xl" />
            <div className="h-3 w-3 absolute top-1 right-1 flex text-[8px] items-center justify-center rounded-full bg-red-500 text-white">
              {notificationCount ? notificationCount?.count : 0}
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            router.push("/profile");
          }}
        >
          <p className="font-bold font-inter text-base">{user?.full_name}</p>
          <div className="h-[40px] w-[40px] rounded-full">
            <img
              src={
                kycorg === null || kycorg.results.length === 0
                  ? "/user-avatar.png"
                  : `${baseurl}${kycorg.results[0].logo}`
              }
              alt="Organization Logo"
              className="h-[40px] w-[40px] rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
