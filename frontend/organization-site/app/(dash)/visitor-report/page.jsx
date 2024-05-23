"use client";

import "../visitor.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";
import {
  MdOutlineFilterAlt,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdOutlinePictureAsPdf,
  MdOutlineDelete,
  MdArrowDropDown,
  MdOutlineVisibility,
} from "react-icons/md";

import DefaultButton from "@/modules/core-ui/Button";
import ErrorDialog from "@/modules/core-ui/ErrorDialog";
import { baseurl } from "@/modules/apiurl";
import { getNewVisitor } from "@/modules/data/dash_service";

export default function VisitorReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const [visitorsPerPage, setVisitorsPerPage] = useState(10);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [newvisitors, setNewVisitors] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [endSelectedDate, setEndSelectedDate] = useState("");
  const [isexpanded, setisexpanded] = useState(false);
  const [isFilter, setisFilter] = useState(false);
  const [open, setopen] = useState(false);

  const startEntry = (currentPage - 1) * visitorsPerPage + 1;
  const endEntry = Math.min(currentPage * visitorsPerPage, totalVisitors);
  const pageNumbers = Array.from({ length: 2 }, (_, index) => index + 1);
  const totalPages = Math.ceil(totalVisitors / visitorsPerPage);

  const fetchVisitors = (e = "") => {
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

  const handleVisitorsPerPageChange = (e) => {
    setVisitorsPerPage(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlesearch = (e) => {
    fetchVisitors((e = e));
  };

  useEffect(() => {
    fetchVisitors();
  }, [currentPage, visitorsPerPage, selectedDate, endSelectedDate, isFilter]);

  const convertDate = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return formattedDate;
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const endhandleDateChange = (event) => {
    setEndSelectedDate(event.target.value);
  };

  const handleClose = () => {
    setopen(false);
  };

  const handleClearButton = () => {
    setSelectedDate("");
    setEndSelectedDate("");
    fetchVisitors();
  };

  const handleDownloadCsv = async () => {
    try {
      const response = await fetch(`${baseurl}/visitor/download-csv`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      saveAs(blob, "Visitor_list.csv");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await fetch(`${baseurl}/visitor/download-pdf`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      saveAs(blob, "Visitor_list.pdf");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
    <div className="mt-10 rounded-xl p-7 shadow-lg bg-white font-inter">
      <ErrorDialog
        handleClose={handleClose}
        onclick={() => {}}
        open={open}
        text={"delete Visitor?"}
      />

      <div className="flex justify-between">
        <h1 className="font-bold text-2xl leading-9 ">Visitor Report</h1>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              className="border  border-[#898989] p-4 rounded-xl h-[45px] w-[333px]  focus:outline-none pl-10"
              placeholder="Type here..."
              onChange={(e) => {
                handlesearch(e.target.value);
              }}
            />
            <IoSearchSharp className="absolute text-xl left-3 top-1/2  transform -translate-y-1/2 text-gray-400" />
          </div>
          <div
            className="flex gap-2 cursor-pointer w-[84px] items-center justify-center rounded-xl h-[34px] border-2 border-black  "
            onClick={() => {
              setisFilter(!isFilter);
            }}
          >
            <p className="font-bold font-inter text-xs ">Filter</p>
            <MdOutlineFilterAlt className="text-sm" />
          </div>
          <div
            className="flex gap-2 cursor-pointer w-[100px] relative items-center justify-center rounded-xl h-[34px] border-2 border-black  "
            onClick={() => {}}
          >
            <div
              className="flex"
              onClick={() => {
                setisexpanded(!isexpanded);
              }}
            >
              <p className="font-bold font-inter text-xs">Export</p>
              <MdArrowDropDown className="text-sm" />
            </div>
            {isexpanded ? (
              <div className="absolute w-[93px] h-[81.15px] flex flex-col items-center justify-center gap-3 -bottom-[90px] shadow-3xl rounded-xl bg-white">
                <div
                  className="flex gap-2 items-center justify-center"
                  onClick={handleDownloadPdf}
                >
                  <MdOutlinePictureAsPdf className="text-xl" />
                  <p className="font-normal font-inter text-base">PDF</p>
                </div>
                <div
                  className="flex gap-2 items-center justify-center"
                  onClick={handleDownloadCsv}
                >
                  <HiOutlineDocumentText className="text-xl" />
                  <p className="font-normal font-inter text-base">Excel</p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {isFilter === false ? (
        <></>
      ) : (
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
                onChange={handleDateChange}
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
                onChange={endhandleDateChange}
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
            <div 
              className="w-[149px] h-[56px] mt-7 border-black font-semibold font-inter text-lg  rounded-xl border-2 flex items-center justify-center"
              onClick={handleClearButton}
            >
              Clear
            </div>
            <div className="w-[149px] mt-7">
              <DefaultButton text="Filter" />
            </div>
          </div>
        </div>
      )}
      {newvisitors === null ? (
        <></>
      ) : (
        <div id="container1" className="overflow-x-auto">
          <table className="min-w-full table-auto divide-y divide-gray-300 mt-8">
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
                  Mobile No.
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Email address
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  ID Type
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  ID Number
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Purpose
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Vehicle
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Vehicle Number
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  No. of Members
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Visit From
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]"></th>
              </tr>
            </thead>
            <tbody className="py-20">
              {newvisitors.map((row, index) => (
                <tr key={index}>
                  <td className="py-2 px-2  text-xs font-inter font-bold">
                    {index + 1}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter  whitespace-nowrap text-[#111827]">
                    {convertDate(row.visited_at)}
                  </td>
                  <td className="py-2 px-2 pl-4 font-normal text-xs font-inter text-[#111827]">
                    {row.full_name}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {row?.mobile_number}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    <div className="flex gap-4 items-center">{row?.email}</div>
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {row?.type_of_id}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {row.id_number}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {row.purpose}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {row.have_vehicle ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {row.vehicle_number ? row.vehicle_number : "NiL"}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {row.number_of_team}
                  </td>
                  <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                    {row.visiting_from}
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
                          setopen(true);
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
        </div>
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
