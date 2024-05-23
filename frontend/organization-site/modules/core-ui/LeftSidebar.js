"use client";

import "./scroll.css";

import { useState } from "react";

import {
  MdDirectionsRun,
  MdAutoAwesome,
  MdAccessTime,
  MdOutlineKeyboardArrowRight,
  MdPersonOutline,
  MdLogout,
  MdOutlineDashboard,
} from "react-icons/md";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaRegClipboard } from "react-icons/fa";
import { TbTopologyStar } from "react-icons/tb";

import axiosInstance from "../axios";
import PreminumPlan from "../organization/PreminumPlan";
import ErrorDialog from "./ErrorDialog";
import { baseurl } from "../apiurl";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { showLeftSidebarAtom } from "@/jotai/ui-atoms";

const mainMenu = [
  { id: 1, menu: "Scan Now", path: "/scan" },
  { id: 2, menu: "Current Visitors", path: "/scan" },
  { id: 3, menu: "Manual Entry", path: "/manual-entry" },
];

const menuList = [
  {
    id: 4,
    menu: "Visitor",
    path: "/visitor-list",
    icon: FaPersonWalkingArrowRight,
  },
  {
    id: 5,
    menu: "Report",
    path: "/visitor-report",
    icon: HiOutlineDocumentReport,
  },
  {
    id: 6,
    menu: "Customers",
    path: "/customer-list",
    icon: MdDirectionsRun,
  },
  {
    id: 7,
    menu: "Guests",
    path: "/guest-list",
    icon: MdAutoAwesome,
  },
  {
    id: 8,
    menu: "Meeting Appointments",
    path: "/meeting-list",
    icon: MdAccessTime,
  },
];

const LeftSidebar = () => {
  const [isadminopen, setisadminopen] = useState(false);
  const [isbranchopen, setisbranchopen] = useState(false);
  const [ismannualopen, setismannualopen] = useState(false);
  const [isnotificationopen, setisnotificationopen] = useState(false);

  const onLogout = async () => {
    try {
      const fcmToken = localStorage.getItem("fcmToken");

      const requestData = {
        fcm_token: fcmToken,
      };

      const response = await axiosInstance.post("/user/logout/", requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (response.status === 200) {
        localStorage.clear();
        router.replace("/login");
      } else {
        toast.error("Logout Failed. Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const [open, setopen] = useState(false);
  const handleClose = () => {
    setopen(false);
  };
  const pageFullUrl = usePathname();
  const router = useRouter();
  const [showLeftSidebar, setShowLeftSidebar] = useAtom(showLeftSidebarAtom);

  return (
    <AnimatePresence>
      {showLeftSidebar && (
        <motion.section
          id="container"
          className="min-w-[256px] h-full  w-[256px] pt-6  flex  overflow-y-auto pb-3 flex-col items-start justify-start  bg-white text-black fixed left-0 top-0 z-10 "
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.2 }}
          style={{}}
        >
          <ErrorDialog
            handleClose={handleClose}
            onclick={onLogout}
            open={open}
            text={"logout?"}
          />
          <div className="flex justify-between mt-3 mb-6 px-0.5   ">
            <section className="flex items-center justify-center px-7">
              <Link href="/dash">
                {" "}
                <img
                  src={`${baseurl}/media/logo/epass.png`}
                  alt=""
                  className="h-8 cursor-pointer"
                />
              </Link>
            </section>
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="flex  flex-col w-full px-4">
              <div
                className="px-2 py-4 bg-[#E5F3FE] flex  cursor-pointer  items-center gap-3 h-[40px] text-primaryblue rounded-xl   w-full "
                onClick={() => {
                  if (pageFullUrl === "/dash") {
                    window.location.reload();
                  } else {
                    router.push("/dash");
                  }
                }}
              >
                <MdOutlineDashboard className="text-2xl" />
                <p className="font-inter font-bold text-sm">Dashboard</p>
              </div>
              <div className="flex flex-col gap-5 w-full mt-4 pl-2">
                <div
                  className="flex items-center w-full h-[21px] justify-between cursor-pointer"
                  onClick={() => {
                    setisadminopen(!isadminopen);
                    // router.push(menu.path)
                  }}
                >
                  <div className="flex gap-3 items-center text-neutralBlack">
                    <MdPersonOutline className="text-xl" />
                    <p className="text-sm font-bold font-inter text-neutralBlack">
                      Sub-admin
                    </p>
                  </div>
                  <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                </div>
                {isadminopen === true ? (
                  <div className="flex flex-col pl-8 -mt-2 space-y-2">
                    <div
                      className="flex gap-3 items-center justify-between text-neutralBlack"
                      onClick={() => {
                        router.push("/create-sub-admin");
                      }}
                    >
                      <p className="text-xs font-bold font-inter text-neutralBlack cursor-pointer">
                        Create sub-admin
                      </p>
                      <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                    </div>
                    <div
                      className="flex gap-3 items-center justify-between text-neutralBlack"
                      onClick={() => {
                        router.push("/sub-admin-list");
                      }}
                    >
                      <p className="text-xs font-bold font-inter text-neutralBlack cursor-pointer">
                        All sub-admin
                      </p>
                      <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div
                  className="flex items-center w-full h-[21px] justify-between cursor-pointer"
                  onClick={() => {
                    setisbranchopen(!isbranchopen);
                    // router.push(menu.path)
                  }}
                >
                  <div className="flex gap-3 items-center text-neutralBlack">
                    <TbTopologyStar className="text-xl" />
                    <p className="text-sm font-bold font-inter text-neutralBlack">
                      Branch
                    </p>
                  </div>
                  <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                </div>
                {isbranchopen === true ? (
                  <div className="flex flex-col pl-8 -mt-2 space-y-2">
                    <div
                      className="flex gap-3 items-center justify-between text-neutralBlack cursor-pointer"
                      onClick={() => {
                        router.push("/create-branch");
                      }}
                    >
                      <p className="text-xs font-bold font-inter text-neutralBlack">
                        Create branch
                      </p>
                      <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                    </div>
                    <div
                      className="flex gap-3 items-center justify-between text-neutralBlack cursor-pointer"
                      onClick={() => {
                        router.push("/branch-list");
                      }}
                    >
                      <p className="text-xs font-bold font-inter text-neutralBlack">
                        All branch
                      </p>
                      <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div
                  className="flex items-center w-full h-[21px] justify-between cursor-pointer"
                  onClick={() => {
                    setismannualopen(!ismannualopen);
                    // router.push(menu.path)
                  }}
                >
                  <div className="flex gap-3 items-center text-neutralBlack">
                    <FaRegClipboard className="text-xl" />
                    <p className="text-sm font-bold font-inter text-neutralBlack">
                      Mannual Check-in
                    </p>
                  </div>
                  <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                </div>
                {ismannualopen === true ? (
                  <div className="flex flex-col pl-8 -mt-2 space-y-2">
                    <div
                      className="flex gap-3 items-center justify-between text-neutralBlack cursor-pointer"
                      onClick={() => {
                        router.push("/manual-entry");
                      }}
                    >
                      <p className="text-xs font-bold font-inter text-neutralBlack">
                        Create mannual Check-in
                      </p>
                      <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                    </div>
                    <div
                      className="flex gap-3 items-center justify-between text-neutralBlack cursor-pointer"
                      onClick={() => {
                        router.push("/visitor-list");
                      }}
                    >
                      <p className="text-xs font-bold font-inter text-neutralBlack">
                        All mannual
                      </p>
                      <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {menuList.map((menu, i) => {
                  return (
                    <div
                      key={i}
                      className="flex items-center w-full h-[21px] justify-between cursor-pointer"
                      onClick={() => {
                        router.push(menu.path);
                      }}
                    >
                      <div className="flex gap-3 items-center text-neutralBlack">
                        <menu.icon className="text-xl" />
                        <p className="text-sm font-bold font-inter text-neutralBlack">
                          {menu.menu}
                        </p>
                      </div>
                      <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                    </div>
                  );
                })}
                <div
                  className="flex items-center w-full h-[21px] justify-between cursor-pointer"
                  onClick={() => {
                    setisnotificationopen(!isnotificationopen);
                  }}
                >
                  <div className="flex gap-3 items-center text-neutralBlack">
                    <IoMdNotificationsOutline className="text-xl" />
                    <p className="text-sm font-bold font-inter text-neutralBlack">
                      Notification
                    </p>
                  </div>
                  <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                </div>
                {isnotificationopen === true ? (
                  <div className="flex flex-col pl-8 -mt-2 space-y-2">
                    <div
                      className="flex gap-3 items-center justify-between text-neutralBlack cursor-pointer"
                      onClick={() => {
                        router.push("/create-notification");
                      }}
                    >
                      <p className="text-xs font-bold font-inter text-neutralBlack">
                        Create notification
                      </p>
                      <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                    </div>
                    <div
                      className="flex gap-3 items-center justify-between text-neutralBlack cursor-pointer"
                      onClick={() => {
                        router.push("/notifications");
                      }}
                    >
                      <p className="text-xs font-bold font-inter text-neutralBlack">
                        All notification
                      </p>
                      <MdOutlineKeyboardArrowRight className="text-neutralBlack text-xl" />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#A3A3A3] my-4"></div>
            <div className="flex items-center w-full h-[21px] px-6 justify-between">
              <div
                className="flex gap-3 items-center text-neutralBlack cursor-pointer"
                onClick={() => {
                  router.push("/settings");
                }}
              >
                <IoEllipsisHorizontal className="text-xl" />
                <p className="text-sm font-bold font-inter ">Settings</p>
              </div>
            </div>
            <div className="flex items-center w-full h-[21px] px-6 mt-6 justify-between">
              <div
                className="flex gap-3 items-center text-neutralBlack cursor-pointer"
                onClick={() => {
                  setopen(!open);
                }}
              >
                <MdLogout className="text-xl" />
                <p className="text-sm font-bold font-inter ">Logout</p>
              </div>
            </div>
          </div>
          <PreminumPlan />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default LeftSidebar;
