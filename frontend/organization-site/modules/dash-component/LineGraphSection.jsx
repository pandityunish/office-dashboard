import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { filterreportgraph } from "../data/dash_service";
import { toast } from "react-toastify";
import { useUserData } from "../hooks/useUserData";
import { purpose, purpose2 } from "../data/organization_types_nature";
import { MdArrowDropDown } from "react-icons/md";
defaults.maintainAspectRatio = true;
export default function LineGraphSection() {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserData();
  const today = convertDateFormat(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [endselecteddate, setendselecteddate] = useState(today);
  const [linedata, setdata] = useState(null);
  useEffect(() => {
    filterreportgraph({
      toast: toast,
      enddate: "",
      id: user.id,
      purpose: "",
      setdata: setdata,
      startdate: "",
    });
  }, []);
  const searchreport = (e) => {
    console.log(endselecteddate);
    filterreportgraph({
      toast: toast,
      enddate: endselecteddate,
      id: user.id,
      purpose: e,
      setdata: setdata,
      startdate: selectedDate,
    });
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log(user.id);
    filterreportgraph({
      toast: toast,
      enddate: endselecteddate,
      id: user.id,
      purpose: "",
      setdata: setdata,
      startdate: selectedDate,
    });
  };
  const endhandleDateChange = (event) => {
    console.log(event.target.value);
    setendselecteddate(event.target.value);
    filterreportgraph({
      toast: toast,
      enddate: endselecteddate,
      id: user.id,
      purpose: "",
      setdata: setdata,
      startdate: selectedDate,
    });
  };
  function convertDateFormat(inputDateString) {
    const originalDate = new Date(inputDateString);

    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="lg:w-full w-[958px] mt-10 shadow-3xl justify-between bg-white p-6 ">
      <h1 className="font-bold text-2xl leading-9 mb-3">Visitor Report</h1>

      <div className="flex gap-5 py-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="datepicker"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="datepicker"
            value={selectedDate}
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={handleDateChange}
            className=" p-2 border w-[150px] rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="datepicker"
          >
            End Date:
          </label>
          <input
            type="date"
            id="enddatepicker"
            value={endselecteddate}
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={endhandleDateChange}
            className=" p-2 border w-[150px] rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="datepicker"
          >
            Search Purpose
          </label>
          <div className="w-[170px] ">
            <div className="mt-[3px] relative">
              <select
                className="block w-full p-2 text-[#A3A3A3] pl-2 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border  rounded bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none"
                onChange={(e) => {
                  console.log(e.target.value);
                  searchreport(e.target.value);
                }}
              >
                <option value="" className="text-[#A3A3A3] ">
                  Select purpose
                </option>
                {purpose2.map((org) => (
                  <option
                    key={org.id}
                    value={org.value}
                    className="text-sm  font-normal text-[#A3A3A3]"
                  >
                    {org.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <MdArrowDropDown />
              </div>
            </div>
          </div>
          {/* <input
        type="text"
        
       
      onChange={(e)=>searchreport(e.target.value)}
        placeholder='Purpose'
        className=" p-2 border w-[150px] rounded focus:outline-none focus:border-blue-500"
      /> */}
        </div>
        <div></div>
      </div>
      {linedata === null ? (
        <div></div>
      ) : (
        <>
          {linedata.length <= 0 ? (
            <div>No data available</div>
          ) : (
            <Line
              data={{
                labels: linedata.map((data) => data.label),
                datasets: [
                  {
                    label: "Check In",
                    data: linedata.map((data) => data.check_in),
                    backgroundColor: "#0FBC88",
                    borderColor: "#0FBC88",
                  },
                  {
                    label: "Check Out",
                    data: linedata.map((data) => data.check_out),
                    backgroundColor: "#FF3A3A",
                    borderColor: "#FF3A3A",
                  },
                  {
                    label: "Total",
                    data: linedata.map((data) => data.totalvisit),
                    backgroundColor: "#0F75BC",
                    borderColor: "#0F75BC",
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                    title: {
                      font: {
                        size: 12,
                        weight: 700,
                      },
                    },
                    labels: {
                      padding: 9,
                      textAlign: "center",
                      usePointStyle: true,
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.5,
                  },
                },
              }}
            />
          )}{" "}
        </>
      )}
    </div>
  );
}
