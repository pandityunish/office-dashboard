"use client";

import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { MdArrowDropDown, MdOutlineVisibility } from "react-icons/md";
import { MdOutlineFilterAlt } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";

import { saveAs } from "file-saver";
import Link from "next/link";

import { deletebranch, getOrgBranchList } from "@/modules/data/dash_service";
import DefaultButton from "@/modules/core-ui/Button";
import ErrorDialog from "@/modules/core-ui/ErrorDialog";
import ActiveInactive from "@/modules/kyc-component/ActiveInactive";
import { baseurl } from "@/modules/apiurl";
import { useUserData } from "@/modules/hooks/useUserData";

export default function BranchList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [branchesPerPage, setBranchesPerPage] = useState(10);
  const [totalBranches, setTotalBranches] = useState(0);
  const [newVisitors, setNewVisitors] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [endSelectedDate, setEndSelectedDate] = useState("");
  const [branchId, setBranchId] = useState("");

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserData();

  useEffect(() => {
    if (user && !isUserLoading) {
      fetchBranches();
    }
  }, [user, currentPage, branchesPerPage, selectedDate, endSelectedDate]);

  const fetchBranches = () => {
    getOrgBranchList({
      toast: toast,
      id: user.id,
      setBranches: handleSetBranches,
      searchtext: "",
      startdate: selectedDate,
      enddate: endSelectedDate,
      page: currentPage,
      perPage: branchesPerPage,
    });
  };

  const handleSetBranches = (data) => {
    if (data.results && data.results.length > 0) {
      setNewVisitors(data.results);
      setTotalBranches(data.count);
    } else {
      setNewVisitors([]);
      setTotalBranches(0);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setCurrentPage(1);
    getOrgBranchList({
      toast: toast,
      id: user.id,
      setBranches: handleSetBranches,
      searchtext: e,
      startdate: selectedDate,
      enddate: endSelectedDate,
    });
  };

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

  const totalPages = Math.ceil(totalBranches / branchesPerPage);
  const showAdjacentPages = 2;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const visiblePages = pageNumbers.slice(
    Math.max(currentPage - showAdjacentPages, 0),
    Math.min(currentPage + showAdjacentPages + 1, totalPages)
  );

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    getOrgBranchList({
      toast: toast,
      id: user.id,
      setBranches: handleSetBranches,
      searchtext: "",
      startdate: event.target.value,
      enddate: endSelectedDate,
    });
  };

  const endHandleDateChange = (event) => {
    setEndSelectedDate(event.target.value);
    getOrgBranchList({
      toast: toast,
      id: user.id,
      setBranches: handleSetBranches,
      searchtext: "",
      enddate: event.target.value,
      startdate: selectedDate,
    });
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="lg:w-full w-[1367px]  mt-10 rounded-xl p-7 shadow-lg bg-white font-inter">
      <ErrorDialog
        handleClose={handleClose}
        onclick={() => {
          deletebranch({ toast: toast, id: branchId }).finally(() => {
            setNewVisitors(null);
            getOrgBranchList({
              toast: toast,
              id: user.id,
              setBranches: handleSetBranches,
              searchtext: "",
              enddate: endSelectedDate,
              startdate: selectedDate,
            });
            handleClose();
          });
        }}
        open={open}
        text={"delete branch?"}
      />
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl leading-9 ">Branch List</h1>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              className="border  border-[#898989] p-4 rounded-xl h-[45px] w-[333px]  focus:outline-none pl-10"
              placeholder="Search here..."
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
            <IoSearchSharp className="absolute text-xl left-3 top-1/2  transform -translate-y-1/2 text-gray-400" />
          </div>
          <div
            className="flex gap-2 cursor-pointer w-[84px] items-center justify-center rounded-xl h-[34px] border-2 border-black  "
            onClick={() => {
              setIsFilter(!isFilter);
            }}
          >
            <p className="font-bold font-inter text-xs ">Filter</p>
            <MdOutlineFilterAlt className="text-sm" />
          </div>
          <div
            className="flex gap-2 cursor-pointer w-[141px] items-center justify-center rounded-xl h-[34px] border-2 border-black  "
            onClick={() => {
              saveAs(
                `${baseurl}/organization/${user.id}/branches/download-excel`
              );
            }}
          >
            <p className="font-bold font-inter text-xs ">Download PDF</p>
            <GoDownload className="text-sm" />
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
                onChange={endHandleDateChange}
                className="p-2 border w-[298px] h-[60px] rounded-xl text-xl text-[#A3A3A3] border-[#A3A3A3]"
              />
            </div>
            <div
              className="w-[149px] h-[56px] mt-7 cursor-pointer border-black font-semibold font-inter text-lg  rounded-xl border-2 flex items-center justify-center"
              onClick={() => {
                setEndSelectedDate("");
                setSelectedDate("");
              }}
            >
              Clear
            </div>
            <div
              className="w-[149px] mt-7"
              onClick={() => {
                getOrgBranchList({
                  toast: toast,
                  id: user.id,
                  setBranches: handleSetBranches,
                  searchtext: "",
                  enddate: event.target.value,
                  startdate: selectedDate,
                });
              }}
            >
              <DefaultButton text="Filter" />
            </div>
          </div>
        </div>
      )}
      {newVisitors === null ? (
        <></>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-300 mt-8">
            <thead>
              <tr>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  SN
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Branch Name
                </th>
                <th className="py-3 px-2 pl-4 text-start font-bold text-xs font-inter text-[#A3A3A3]">
                  Branch No.
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
                  Contact Person
                </th>
                <th className="py-3 px-2 text-start font-bold text-xs font-inter text-[#A3A3A3]"></th>
              </tr>
            </thead>
            <tbody className="py-20">
              {newVisitors &&
                newVisitors.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-2  text-xs font-inter font-bold">
                      {index + 1}
                    </td>
                    <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                      {row.name}
                    </td>
                    <td className="py-2 px-2 pl-4 font-normal text-xs font-inter text-[#111827]">
                      {row.branch_no}
                    </td>
                    <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                      {row?.district}
                    </td>
                    <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                      {row?.mobile_no}
                    </td>
                    <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                      <div className="flex gap-4 items-center">
                        {row?.email}
                      </div>
                    </td>

                    <td className="py-2 px-2 font-normal text-xs font-inter text-[#111827]">
                      {row.contact_person}
                    </td>
                    <td>
                      {" "}
                      <div className="flex gap-2 items-end justify-end">
                        <ActiveInactive
                          id={row.id}
                          lock_branch={row.lock_branch}
                        />
                        <Link
                          href={{
                            pathname: "/branch-list/details",
                            query: {
                              id: row.id,
                            },
                          }}
                        >
                          <div className="rounded-lg my-2 h-[32px] w-[32px] flex flex-col justify-center items-center border border-[#898989]">
                            <MdOutlineVisibility className="text-[#898989] text-2xl" />
                          </div>
                        </Link>
                        <div
                          className="rounded-lg my-2 h-[32px] w-[32px] flex flex-col justify-center items-center bg-[#FFE4E4] cursor-pointer"
                          onClick={() => {
                            setBranchId(row.id);
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
          Showing {currentPage} to{" "}
          {Math.min(currentPage * branchesPerPage, totalBranches)} of{" "}
          {totalBranches} entries
        </p>
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center gap-2">
            <p className="font-normal text-xs mt-3">Show</p>
            <div className="mt-2.5 relative">
              <select
                onChange={(value) => setBranchesPerPage(value)}
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
          <div className="flex space-x-2 items-center mt-4">
            {totalBranches > branchesPerPage && (
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

            {totalBranches > branchesPerPage && visiblePages.map((page) => (
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

            {totalBranches > branchesPerPage && (
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
