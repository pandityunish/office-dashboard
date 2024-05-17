"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { MdArrowDropDown, MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineGroup } from "react-icons/md";
import { RiEBike2Fill } from "react-icons/ri";
import { RiRectangleLine } from "react-icons/ri";

import DefaultButton from "@/modules/core-ui/Button";
import { idTypes, purpose } from "@/modules/data/organization_types_nature";

import { useAtom } from "jotai";
import { mannualdataAtom } from "@/jotai/dash-atoms";
import { useRouter } from "next/navigation";

const VisitForm = () => {
  const [value, setValue] = useAtom(mannualdataAtom);
  const [changeValue, setChangeValue] = useState("Yes");
  const [selectedPurpose, setSelectedPurpose] = useState('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: value.full_name,
      address: value.address,
      number: value.number,
      email: value.email,
      visiting: value.visiting,
      numvisitor: value.numvisitor,
      typeid: value.typeid,
      have_vehicle: value.have_vehicle,
      vehicle_number: value.vehicle_number,
      purpose: value.purpose,
      id_number: value.id_number,
      image: value.image,
    },
  });

  const onSubmit = async (data) => {
    const data1 = {
      full_name: data.full_name,
      address: data.address,
      number: data.number,
      email: data.email,
      visiting: data.visiting,
      numvisitor: data.numvisitor,
      typeid: data.typeid,
      have_vehicle: data.have_vehicle,
      vehicle_number: data.vehicle_number,
      purpose: data.purpose,
      id_number: data.id_number,
    };
    setValue(data1);
    router.push("/manual-preview");
  };

  return (
    <div className=" xl:w-[100%]  lg:w-[1367px] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 bg-white rounded-lg shadow-3xl">
          <h1 className="mb-4 text-2xl font-semibold">Visitor Entry Form</h1>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="w-[600px] ">
              <label
                htmlFor="full_name"
                className="text-sm font-semibold text-[#333333] "
              >
                Full Name
              </label>
              <div className="mt-[8px] relative">
                <IoPersonOutline
                  className={`absolute text-2xl left-4 ${
                    errors.full_name ? "top-1/3" : "top-1/2"
                  }  transform -translate-y-1/2 text-gray-400`}
                />

                <input
                  type="text"
                  placeholder="Input full name"
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                    errors.full_name ? "border-red-500" : ""
                  }`}
                  {...register("full_name", { required: true })}
                />
                {errors.full_name && (
                  <span className="text-red-500">Full Name is required</span>
                )}
              </div>
            </div>
            <div className="w-[600px] ">
              <label
                htmlFor="organization_name"
                className="text-sm font-semibold text-[#333333] "
              >
                Full Address
              </label>
              <div className="mt-[8px] relative">
                <IoLocationOutline
                  className={`absolute text-2xl left-4 ${
                    errors.address ? "top-1/3" : "top-1/2"
                  }  transform -translate-y-1/2 text-gray-400`}
                />

                <input
                  type="text"
                  placeholder="Input your address"
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                    errors.address ? "border-red-500" : ""
                  }`}
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <span className="text-red-500">Address is required</span>
                )}
              </div>
            </div>
            <div className="w-[600px] ">
              <label
                htmlFor="organization_name"
                className="text-sm font-semibold text-[#333333] "
              >
                Mobile Number
              </label>
              <div className="mt-2.5 relative">
                <FaMobileAlt
                  className={`absolute text-2xl left-4 ${
                    errors.number ? "top-1/3" : "top-1/2"
                  }  transform -translate-y-1/2 text-gray-400`}
                />

                <input
                  type="text"
                  placeholder="Input Mobile Number"
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                    errors.number ? "border-red-500" : ""
                  }`}
                  {...register("number", {
                    required: true,
                    maxLength: 10,
                    minLength: 10,
                  })}
                  address
                  is
                  required
                />
                {errors.number && (
                  <span className="text-red-500">
                    {errors.number && errors.number.type === "required" && (
                      <span className="text-red-500">
                        Mobile Number is required
                      </span>
                    )}
                    {errors.number && errors.number.type === "minLength" && (
                      <span className="text-red-500">
                        Number should be at least 10 digits
                      </span>
                    )}
                    {errors.number && errors.number.type === "maxLength" && (
                      <span className="text-red-500">
                        Number shouldn&apos;t be more than 10 digits
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
            <div className="w-[600px] ">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-[#333333] "
              >
                Email address
              </label>
              <div className="mt-[8px] relative">
                <CiMail
                  className={`absolute text-2xl left-4 ${
                    errors.email ? "top-1/3" : "top-1/2"
                  }  transform -translate-y-1/2 text-gray-400`}
                />

                <input
                  type="email"
                  placeholder="Input Email address"
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">
                    Email address is required
                  </span>
                )}
              </div>
            </div>
            <div className="w-[600px] mt-1 flex justify-between">
              <div className="w-[280px] mt-2">
                <label
                  htmlFor="visiting"
                  className="text-sm font-semibold text-[#333333] "
                >
                  Visiting From (Office or address)
                </label>
                <div className="mt-2.5 relative">
                  <MdOutlineLocationOn
                    className={`absolute text-2xl left-4 ${
                      errors.visiting ? "top-1/2" : "top-1/2"
                    }  transform -translate-y-1/2 text-gray-400`}
                  />

                  <input
                    type="text"
                    placeholder="Input visiting from"
                    className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                      errors.visiting ? "border-red-500" : ""
                    }`}
                    {...register("visiting")}
                  />
                  {errors.visiting && (
                    <span className="text-red-500">
                      Visiting From is required
                    </span>
                  )}
                </div>
              </div>
              <div className="w-[280px] mt-2">
                <label
                  htmlFor="organization_name"
                  className="text-sm font-semibold text-[#333333] "
                >
                  Number of visitor
                </label>
                <div className="mt-2.5 relative">
                  <MdOutlineGroup
                    className={`absolute text-2xl left-4 ${
                      errors.numvisitor ? "top-1/3" : "top-1/2"
                    }  transform -translate-y-1/2 text-gray-400`}
                  />

                  <input
                    type="text"
                    placeholder="Input number of visitor"
                    className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                      errors.numvisitor ? "border-red-500" : ""
                    }`}
                    {...register("numvisitor")}
                  />
                  {errors.numvisitor && (
                    <span className="text-red-500">
                      Number of visitor is required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[600px]   flex justify-between ">
              <div className="w-[280px] mt-2 ">
                <label
                  htmlFor="organization_name"
                  className="text-sm font-semibold text-[#333333] "
                >
                  Type of ID
                </label>
                <div className="mt-2.5 relative">
                  <select
                    className="block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none"
                    {...register("typeid")}
                  >
                    <option value="" className="text-[#A3A3A3] ">
                      Select Type of ID
                    </option>
                    {idTypes.map((org) => (
                      <option
                        key={org.id}
                        value={org.value}
                        className="text-sm  font-semibold text-[#333333]"
                      >
                        {org.title}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <MdArrowDropDown />
                  </div>
                  <RiRectangleLine
                    className={`absolute text-2xl left-4 ${
                      errors.typeid ? "top-1/3" : "top-1/2"
                    }  transform -translate-y-1/2 text-gray-400`}
                  />

                  {errors.typeid && (
                    <span className="text-red-500">Select ID Type</span>
                  )}
                </div>
              </div>
              <div className="w-[280px] mt-2">
                <label
                  htmlFor="organization_name"
                  className="text-sm font-semibold text-[#333333] "
                >
                  ID Number
                </label>
                <div className="mt-2.5 relative">
                  <RiRectangleLine
                    className={`absolute text-2xl left-4 ${
                      errors.id_number ? "top-1/3" : "top-1/2"
                    }  transform -translate-y-1/2 text-gray-400`}
                  />

                  <input
                    type="text"
                    placeholder="Enter ID Number"
                    className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                      errors.id_number ? "border-red-500" : ""
                    }`}
                    {...register("id_number")}
                  />
                  {errors.id_number && (
                    <span className="text-red-500">Id Number is required</span>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[600px]    flex justify-between ">
              <div className="mb-4 w-[280px]">
                <label
                  className="block mb-2 text-sm font-semibold text-[#333333]"
                  htmlFor="have_vehicle"
                >
                  Vehicle
                </label>
                <Controller
                  name="have_vehicle"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          onClick={() => {
                            setChangeValue("Yes");
                          }}
                          {...field}
                          id="have_vehicle"
                          type="radio"
                          value="yes"
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-4">
                        <input
                          onClick={() => {
                            setChangeValue("No");
                          }}
                          {...field}
                          id="have_vehicle"
                          type="radio"
                          value="no"
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  )}
                />
              </div>
              {changeValue === "No" ? (
                <></>
              ) : (
                <div className="w-[280px]  ">
                  <label
                    htmlFor="organization_name"
                    className="text-sm font-semibold text-[#333333] "
                  >
                    Vehicle Number
                  </label>
                  <div className="mt-2.5 relative">
                    <RiEBike2Fill
                      className={`absolute text-2xl left-4 ${
                        errors.vehicle_number ? "top-1/3" : "top-1/2"
                      }  transform -translate-y-1/2 text-gray-400`}
                    />

                    <input
                      type="text"
                      placeholder="Input vehicle number"
                      className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                        errors.vehicle_number ? "border-red-500" : ""
                      }`}
                      {...register("vehicle_number")}
                    />
                    {errors.vehicle_number && (
                      <span className="text-red-500">
                        Vehicle Number is required
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            {purpose === null ? (
              <></>
            ) : (
              <>
                <div className="w-[600px]">
                  <label
                    htmlFor="organization_name"
                    className="text-sm font-semibold text-[#333333]"
                  >
                    Purpose
                  </label>
                  <div className="mt-[8px] relative">
                    <select
                      className="block w-full p-4 text-[#A3A3A3] pl-12 placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 appearance-none"
                      {...register("purpose", { required: true })}
                      onChange={(e) => setSelectedPurpose(e.target.value)}
                    >
                      <option value="">Select purpose</option>
                      {purpose?.map((org) => (
                        <option key={org.id} value={org.value}>
                          {org.title}
                        </option>
                      ))}
                    </select>
                    <MdArrowDropDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl text-gray-700" />
                    <FiMessageSquare
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400`}
                    />

                    {errors.purpose && (
                      <span className="text-red-500">
                        Please select purpose
                      </span>
                    )}
                  </div>
                </div>

                {selectedPurpose === "Others" && (
                  <div className="w-[600px]">
                    <label
                      htmlFor="purpose"
                      className="text-sm font-semibold text-[#333333]"
                    >
                      Other Purpose
                    </label>
                    <div className="mt-[8px] relative">
                      <IoPersonOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400" />

                      <input
                        type="text"
                        placeholder="Purpose of Visit"
                        className="block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                        {...register("purpose", { required: true })}
                      />
                      {errors.purpose && (
                        <span className="text-red-500">
                          Purpose is required
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-[320px] my-10">
          <DefaultButton text="Continue" />
        </div>
      </form>
    </div>
  );
};

export default VisitForm;
