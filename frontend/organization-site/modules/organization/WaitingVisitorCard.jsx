"use client";
import Image from "next/image";
import axiosInstance from "../axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const WaitingVisitorCard = ({ data, setHistoryData }) => {
  const approveVisitorEntry = async () => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("access") : "";

      const res = await axiosInstance.post(
        "/organization/approve-visitor/",
        { is_approved: true, visit_id: data.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success(
          `Visitor ${res.data.full_name || ""} Approved Succesfull`
        );
        router.push("/waiting-visitors");
      }
    } catch (error) {}
  };
  return (
    <div className="flex flex-col w-full bg-white border rounded-md shadow-lg">
      <section className="grid items-center justify-between w-full grid-cols-4 bg-epassblue ">
        <div className="flex flex-col col-span-3 p-3 space-y-1 text-white rounded">
          <p className="text-sm">
            <span className="mr-1 font-medium text-gray-300">Name:</span>
            <span className="font-medium">{data.full_name}</span>
          </p>
          <p className="text-sm">
            <span className="mr-1 font-medium text-gray-300">Purpose:</span>
            <span className="font-medium">{data.purpose}</span>
          </p>
          <p className="text-sm">
            <span className="mr-1 font-medium text-gray-300">Vehicle:</span>
            <span className="font-medium">
              {data.have_vehicle ? "Yes" : "No"}
            </span>
          </p>
          <p className="text-sm">
            <span className="mr-1 font-medium text-gray-300">With Team:</span>
            <span className="font-medium">
              {data.is_with_team ? "Yes" : "No"}
            </span>
          </p>
          <p className="text-sm">
            <span className="mr-1 font-medium text-gray-300">
              Team Members:
            </span>
            <span className="font-medium">{data.number_of_team}</span>
          </p>
          <p className="text-sm">
            <span className="mr-1 font-medium text-gray-300">
              Visiting From:
            </span>
            <span className="font-medium">{data.visiting_from}</span>
          </p>
          <p className="text-sm">
            <span className="mr-1 font-medium text-gray-300">
              Vehicle Number:
            </span>
            <span className="font-medium">{data.vehicle_number}</span>
          </p>
          <p className="text-sm">
            <span className="mr-1 font-medium text-gray-300">
              Entry Approved:
            </span>
            <span className="font-medium">
              {data.is_approved ? "Yes" : "No"}
            </span>
          </p>
        </div>
        <div className="flex m-auto mx-2 ">
          <Image
            src="/user-avatar.png"
            height={300}
            width={300}
            alt="visitor-image-epass"
          />
        </div>
      </section>
      <div className="flex justify-between p-2">
        <button
          className="flex flex-col px-5 py-2 items-center bg-[#0f75bd] rounded shadow-md"
          onClick={approveVisitorEntry}
        >
          <p className="py-1 font-semibold text-white">Approve</p>
        </button>
        <button className="flex flex-col px-5 py-2 items-center bg-[#e84500] rounded shadow-md">
          <p className="py-1 font-semibold text-white">Decline</p>
        </button>
      </div>
    </div>
  );
};

export default WaitingVisitorCard;
