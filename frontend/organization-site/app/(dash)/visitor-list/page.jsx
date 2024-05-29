"use client";

import React, { useEffect, useState } from "react";

import { IoSearchSharp } from "react-icons/io5";
import { MdArrowDropDown, MdOutlineVisibility } from "react-icons/md";
import { MdOutlineFilterAlt } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";

import { toast } from "react-toastify";
import { deletevisitor, getNewVisitor } from "@/modules/data/dash_service";
import DefaultButton from "@/modules/core-ui/Button";
import Link from "next/link";
import ErrorDialog from "@/modules/core-ui/ErrorDialog";
import { baseurl } from "@/modules/apiurl";
import { useUserData } from "@/modules/hooks/useUserData";

export default function Visitorlist() {
  const [currentPage, setCurrentPage] = useState(1);
  const [visitorsPerPage, setVisitorsPerPage] = useState(10);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [newVisitors, setNewVisitors] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [endSelectedDate, setEndSelectedDate] = useState("");
  const [open, setOpen] = useState(false);
  const [visitorId, setVisitorId] = useState(0);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserData();

  useEffect(() => {
    fetchVisitors();
  }, [currentPage, visitorsPerPage, selectedDate, endSelectedDate, isFilter]);

  const fetchVisitors = (e="") => {
    getNewVisitor({
      toast: toast,
      searchtext: e,
      setvisitor: handleSetVisitors,
      enddate: endSelectedDate,
      startdate: selectedDate,
      page: currentPage,
      perPage: visitorsPerPage,
    });
  };

  const handleSetVisitors = (data) => {
    if (data.results && data.results.length > 0) {
      setNewVisitors(data.results);
      setTotalVisitors(data.count);
    } else {
      setNewVisitors([]);
      setTotalVisitors(0);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleVisitorsPerPageChange = (e) => {
    setVisitorsPerPage(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    fetchVisitors(e=e);
  };

  const handleDateChange = (dateType, date) => {
    if (dateType === "start") {
      setSelectedDate(date);
    } else {
      setEndSelectedDate(date);
    }
  };

  const handleFilterToggle = () => {
    setIsFilter(!isFilter);
  };

  const handleClearButton = () => {
    setSelectedDate("");
    setEndSelectedDate("");
    fetchVisitors()
  }

  const handleDeleteVisitor = () => {
    deletevisitor({ toast: toast, id: visitorId }).finally(() => {
      setNewVisitors(null);
      fetchVisitors();
      handleClose();
    });
  };

  const handleClose = () => {
    setOpen(false);
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

  const startEntry = (currentPage - 1) * visitorsPerPage + 1;
  const endEntry = Math.min(currentPage * visitorsPerPage, totalVisitors);

  const totalPages = Math.ceil(totalVisitors / visitorsPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const startEntries = (currentPage - 1) * visitorsPerPage + 1;
  const endEntries = Math.min(currentPage * visitorsPerPage, totalVisitors);

  return (
    <div className="lg:w-full w-[1367px]  mt-10 rounded-xl p-7 shadow-lg bg-white font-inter">
      <ErrorDialog
        handleClose={handleClose}
        onclick={handleDeleteVisitor}
        open={open}
        text={"Delete Visitor?"}
      />

      <div className="flex justify-between">
        <h1 className="font-bold text-2xl leading-9 ">Visitor List</h1>
        <div className="flex gap-2 items-center">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              className="border border-[#898989] p-4 rounded-xl h-[45px] w-[333px]  focus:outline-none pl-10"
              placeholder="Search here..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            <IoSearchSharp className="absolute text-xl left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div
            className="flex gap-2 cursor-pointer w-[84px] items-center justify-center rounded-xl h-[34px] border-2 border-black  "
            onClick={handleFilterToggle}
          >
            <p className="font-bold font-inter text-xs ">Filter</p>
            <MdOutlineFilterAlt className="text-sm" />
          </div>

          <div
            className="flex gap-2 cursor-pointer w-[141px] items-center justify-center rounded-xl h-[34px] border-2 border-black  "
            onClick={() => {
              saveAs(
                `${baseurl}/organization/${user.id}/visitor-history/download`,
                "Visitor list"
              );
            }}
          >
            <p className="font-bold font-inter text-xs ">Download PDF</p>
            <GoDownload className="text-sm" />
          </div>
        </div>
      </div>

      {isFilter && (
        <div className="flex gap-3">
          <div className="flex gap-5 py-4">
            <div>
              <label
                className="block font-normal font-inter text-sm mb-2"
                htmlFor="datepicker"
              >
                Start Date:
              </label>
              <input
                type="date"
                id="datepicker"
                placeholder="Select a date"
                value={selectedDate}
                pattern="\d{4}-\d{2}-\d{2}"
                onChange={(e) => handleDateChange("start", e.target.value)}
                className="p-2 border w-[298px] h-[60px] rounded-xl text-xl text-[#A3A3A3] border-[#A3A3A3]"
              />

            </div>
            <div>
              <label
                className="block font-normal font-inter text-sm mb-2"
                htmlFor="datepicker"
              >
                End Date:
              </label>
              <input
                type="date"
                id="datepicker"
                placeholder="Select a date"
                value={endSelectedDate}
                pattern="\d{4}-\d{2}-\d{2}"
                onChange={(e) => handleDateChange("end", e.target.value)}
                className="p-2 border w-[298px] h-[60px] rounded-xl text-xl text-[#A3A3A3] border-[#A3A3A3]"
              />

            </div>

            <div className="w-[308px] ">
              <label
                htmlFor="organization_name"
                className="text-sm font-normal text-[#A3A3A3] "
              >
                Visitor Type
              </label>
              <div className=" relative mt-1">
                <select className="block w-full p-4 text-[#A3A3A3]  placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none">
                  <option value="" className="text-[#A3A3A3] ">
                    Visitor Type
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <MdArrowDropDown />
                </div>
              </div>
            </div>
            <div className="w-[149px] h-[56px] mt-7 border-black font-semibold font-inter text-lg  rounded-xl border-2 flex items-center justify-center" onClick={handleClearButton}>
              Clear
            </div>
            <div
              className="w-[149px] mt-7"
              onClick={() => {
                getNewVisitor({
                  toast: toast,
                  searchtext: "",
                  setvisitor: handleSetVisitors,
                  enddate: endSelectedDate,
                  startdate: selectedDate,
                  page: currentPage,
                  perPage: visitorsPerPage,
                });
              }}
            >
              <DefaultButton text="Filter" />
            </div>
          </div>
        </div>
      )}

      {newVisitors && (
        <>
          <table className="min-w-full divide-y divide-gray-300 mt-8">
            <thead>
              <tr>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  SN
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Date/Time
                </th>
                <th className="py-3 px-2 pl-4 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Name
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Address
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Mobile No.
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Email address
                </th>

                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Purpose
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]"></th>
              </tr>
            </thead>
            <tbody className="py-20">
              {newVisitors.map((row, index) => (
                <tr key={index}>
                  <td className="py-2 px-2  text-xs font-inter font-bold">
                    {index + 1}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {convertDate(row.visited_at)}
                  </td>
                  <td className="py-2 px-2 pl-4 font-normal text-xs font-inter text-[#111827]">
                    {row.full_name}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {row?.visiting_from}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {row?.mobile_number}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    <div className="flex gap-4 items-center">{row?.email}</div>
                  </td>

                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {row.purpose}
                  </td>
                  <td>
                    {" "}
                    <div className="flex gap-2 items-end justify-end">
                      <Link
                        href={{
                          pathname: "/visitor-details",
                          query: {
                            id: row.id,
                          },
                        }}
                      >
                        {" "}
                        <div className="rounded-lg my-2 h-[32px] w-[32px] flex flex-col justify-center items-center border border-[#898989]">
                          <MdOutlineVisibility className="text-[#898989] text-2xl" />
                        </div>
                      </Link>
                      <div
                        className="rounded-lg my-2 h-[32px] cursor-pointer w-[32px] flex flex-col justify-center items-center bg-[#FFE4E4]"
                        onClick={() => {
                          setVisitorId(row.id);
                          setOpen(true);
                        }}
                      >
                        <MdOutlineDelete className="text-[#FF3A3A] text-2xl" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div className="flex items-end mt-5 justify-between">
        <p className="font-normal text-xs">
          Showing {startEntry} to {endEntry} of {totalVisitors} entries
        </p>
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center gap-2">
            <p className="font-normal text-xs mt-3">Show</p>
            <div className="mt-2.5 relative">
              <select
                onChange={handleVisitorsPerPageChange}
                className="block h-[40px] w-[48px] px-2 text-[#A3A3A3]  placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none"
              >
                <option value="10" className="text-[#A3A3A3] ">
                  10
                </option>
                <option value="20" className="text-[#A3A3A3] ">
                  20
                </option>
                <option value="30" className="text-[#A3A3A3] ">
                  30
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <MdArrowDropDown />
              </div>
            </div>
            <p className="font-normal text-xs mt-3">entries</p>
          </div>

          {/* Pagination */}
          <div className="flex space-x-2 items-center mt-4">
            {totalVisitors > visitorsPerPage && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <MdKeyboardArrowLeft className="text-2xl" />
              </button>
            )}

            {totalVisitors > visitorsPerPage &&
              pageNumbers.map((page) => (
                <button
                  key={page}
                  className={`w-[24px] h-[24px] flex items-center justify-center rounded-md text-xs font-inter font-normal ${
                    currentPage === page
                      ? "bg-primaryblue text-white"
                      : "text-[#A3A3A3] text-xs font-normal font-inter"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

            {totalVisitors > visitorsPerPage && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
