"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { MdArrowDropDown } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { RiRectangleLine } from "react-icons/ri";

import { idTypes } from "@/modules/data/organization_types_nature";
import DefaultButton from "@/modules/core-ui/Button";

import { useAtom } from "jotai";
import { mannualdataAtom } from "@/jotai/dash-atoms";

const VisitForm = () => {
  const [value, setValue] = useAtom(mannualdataAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: value });
  const router = useRouter();

  const onSubmit = async (data) => {
    setValue(data);
    router.push("/customer-preview");
  };

  return (
    <div className=" xl:w-[100%]  lg:w-[1367px] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 bg-white rounded-lg shadow-3xl">
          <h1 className="mb-4 text-2xl font-semibold">CUSTOMER REGISTRATION</h1>

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
                Mobile Number
              </label>
              <div className="mt-2.5 relative">
                <FaMobileAlt
                  className={`absolute text-2xl left-4 ${
                    errors.mobile_number ? "top-1/3" : "top-1/2"
                  }  transform -translate-y-1/2 text-gray-400`}
                />

                <input
                  type="text"
                  placeholder="Input Mobile Number"
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                    errors.mobile_number ? "border-red-500" : ""
                  }`}
                  {...register("mobile_number", {
                    required: true,
                    maxLength: 10,
                    minLength: 10,
                  })}
                />
                {errors.mobile_number && (
                  <span className="text-red-500">
                    {errors.mobile_number &&
                      errors.mobile_number.type === "required" && (
                        <span className="text-red-500">
                          Mobile Number is required
                        </span>
                      )}
                    {errors.mobile_number &&
                      errors.mobile_number.type === "minLength" && (
                        <span className="text-red-500">
                          Number should be at least 10 digits
                        </span>
                      )}
                    {errors.mobile_number &&
                      errors.mobile_number.type === "maxLength" && (
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
                Email address(optional)
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
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500">
                    Email address is required
                  </span>
                )}
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
                    <span className="text-red-500">
                      Please select Type of Id
                    </span>
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
                    placeholder="Input ID Number"
                    className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                      errors.id_number ? "border-red-500" : ""
                    }`}
                    {...register("id_number", { required: true })}
                  />
                  {errors.id_number && (
                    <span className="text-red-500">Id Number is required</span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-[600px] ">
              <label
                htmlFor="company_name"
                className="text-sm font-semibold text-[#333333] "
              >
                Company Name(optional)
              </label>
              <div className="mt-[8px] relative">
                <CiMail
                  className={`absolute text-2xl left-4 ${
                    errors.company_name ? "top-1/3" : "top-1/2"
                  }  transform -translate-y-1/2 text-gray-400`}
                />

                <input
                  type="text"
                  placeholder="Input Company Name"
                  className={`block w-full p-4 pl-12 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                    errors.company_name ? "border-red-500" : ""
                  }`}
                  {...register("company_name")}
                />
                {errors.company_name && (
                  <span className="text-red-500">Company Name is required</span>
                )}
              </div>
            </div>
            <div className="w-[600px] ">
              <label
                htmlFor="country"
                className="text-sm font-semibold text-[#333333] "
              >
                Country
              </label>
              <input
                type="text"
                placeholder="Input country"
                className={`block w-full p-4 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.country ? "border-red-500" : ""
                }`}
                {...register("country", { required: true })}
              />
              {errors.country && (
                <span className="text-red-500">Country is required</span>
              )}
            </div>
            <div className="w-[600px] ">
              <label
                htmlFor="state"
                className="text-sm font-semibold text-[#333333] "
              >
                State
              </label>
              <input
                type="text"
                placeholder="Input state"
                className={`block w-full p-4 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.state ? "border-red-500" : ""
                }`}
                {...register("state", { required: true })}
              />
              {errors.state && (
                <span className="text-red-500">State is required</span>
              )}
            </div>
            <div className="w-[600px] ">
              <label
                htmlFor="city"
                className="text-sm font-semibold text-[#333333] "
              >
                City
              </label>
              <input
                type="text"
                placeholder="Input city"
                className={`block w-full p-4 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                  errors.city ? "border-red-500" : ""
                }`}
                {...register("city", { required: true })}
              />
              {errors.city && (
                <span className="text-red-500">City is required</span>
              )}
            </div>
            <div className="w-[600px] ">
              <label
                htmlFor="additional_requirements"
                className="text-sm font-semibold text-[#333333] "
              >
                Additional Requirements
              </label>
              <textarea
                placeholder="Input Additional Requirements"
                className="block w-full p-4 text-black placeholder-[#A3A3A3] placeholder:font-normal transition-all duration-200 border border-greyneutral rounded-[10px] bg-white focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                {...register("additional_requirements")}
              />
            </div>
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
