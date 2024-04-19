import React, { useEffect, useState } from "react";
import {
  filterAllVisitors,
  filterreportgraph,
  getvisitorcount,
} from "../data/dash_service";
import { toast } from "react-toastify";
import { useUserData } from "../hooks/useUserData";

export default function PercentageSection() {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserData();
  
  const [todayvisitors, settodayvisitors] = useState(null);
  const [yesterdayvisitors, setyesterdayvisitors] = useState(null);

  const getYesterdayDate = (date, days) => {
    const yesterday = new Date(date);

    yesterday.setDate(yesterday.getDate() - 1);
    console.log(yesterday.setDate(yesterday.getDate() - 1));
    return yesterday;
  };

  function convertDateFormat(inputDateString) {
    const originalDate = new Date(inputDateString);

    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const [count, setcount] = useState(null);

  useEffect(() => {
    const today = convertDateFormat(new Date());
    const yesterday = convertDateFormat(getYesterdayDate(new Date(), 1));
    filterAllVisitors({ setdata: settodayvisitors }).finally(() => {
      console.log(todayvisitors);
    });
    getvisitorcount({ toast: toast, id: user.id, setcount: setcount });
    filterreportgraph({
      toast: toast,
      setdata: setyesterdayvisitors,
      startdate: yesterday,
      enddate: yesterday,
      id: user.id,
      purpose: "",
    });
  }, []);

  const calculatePercentageChange = (oldValue, newValue) => {
    console.log(newValue);
    if (oldValue === 0) {
      return newValue === 0 ? 0 : 100;
    }

    const percentageChange = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
    console.log(percentageChange);
    return parseFloat(percentageChange.toFixed(2));
  };

  return (
    <div className="flex lg:w-full w-[948px] mt-10 gap-2 justify-between">
      {todayvisitors === null || count === null ? (
        <></>
      ) : (
        <div className="w-[213px] h-[92px] rounded-xl shadow-3xl p-5 border border-primaryblue bg-white">
          <div className="flex gap-5 items-center">
            <p className="text-2xl font-bold font-inter leading-8">
              {todayvisitors.count}
            </p>
          </div>
          <p className="text-base font-medium leading-6 font-inter">
            Number of Visitors
          </p>
        </div>
      )}
      {count === null ? (
        <></>
      ) : (
        <>
          {" "}
          <div className="w-[213px] h-[92px] shadow-3xl rounded-xl p-5 border bg-white border-primarysky">
            <div className="flex gap-5 items-center">
              <p className="text-2xl font-bold font-inter leading-8">
                {count.results.length <= 0
                  ? "0"
                  : count.results[0].count + count.results[1].count}
              </p>
            </div>
            <p className="text-base font-medium leading-6 font-inter">
              Number of Visit
            </p>
          </div>
          <div className="w-[213px] h-[92px] shadow-3xl rounded-xl p-5 border bg-white border-[#FFAB1E]">
            <div className="flex gap-5 items-center">
              <p className="text-2xl font-bold font-inter leading-8">
                {count.results.length <= 0 ? "0" : count.results[0].count}
              </p>
            </div>
            <p className="text-base font-medium leading-6 font-inter">
              Manual Entry Visits
            </p>
          </div>
          <div className="w-[213px] h-[92px] shadow-3xl rounded-xl p-5 border bg-white border-[#0FBC88]">
            <div className="flex gap-5 items-center">
              <p className="text-2xl font-bold font-inter leading-8">
                {count.results.length <= 0 ? "0" : count.results[1].count}
              </p>
            </div>
            <p className="text-base font-medium leading-6 font-inter">
              QR code scan visits
            </p>
          </div>
        </>
      )}
    </div>
  );
}
