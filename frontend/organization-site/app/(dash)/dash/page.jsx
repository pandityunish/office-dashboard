"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { LiaIdCardSolid } from "react-icons/lia";
import { BsPersonCheck } from "react-icons/bs";
import {
  MdPeopleOutline,
  MdOutlineCalendarToday,
  MdArrowRightAlt,
} from "react-icons/md";

import { useUserData } from "@/modules/hooks/useUserData";
import LoadingComponent from "@/modules/core-ui/LoadingComponent";
import KycSection from "@/modules/dash-component/KycSection";
import MannualEntry from "@/modules/dash-component/MannualEntry";
import RecentVisitor from "@/modules/dash-component/RecentVisitor";
import VisitorWaiting from "@/modules/dash-component/VisitorWaiting";
import NewVisitors from "@/modules/dash-component/NewVisitors";
import PercentageSection from "@/modules/dash-component/PercentageSection";
import LineGraphSection from "@/modules/dash-component/LineGraphSection";
import BranchSection from "@/modules/dash-component/BranchSection";
import AdsComponent from "@/modules/dash-component/AdsComponent";
import QrComponent from "@/modules/dash-component/QrComponent";

export default function Dash() {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useUserData();

  const features = useMemo(
    () => [
      {
        id: 1,
        name: "Visitor Check-in",
        icon: LiaIdCardSolid,
        endpoint: "/manual-entry",
      },
      {
        id: 2,
        name: "Hotel Guest Check In",
        icon: MdOutlineCalendarToday,
        endpoint: "/guest",
      },
      {
        id: 3,
        name: "Customer Register",
        icon: BsPersonCheck,
        endpoint: "/customer-registration",
      },
      {
        id: 4,
        name: "Meeting Appointment",
        icon: MdPeopleOutline,
        endpoint: "/meeting",
      },
    ],
    []
  );

  const handleFeatureClick = (endpoint) => {
    router.push(endpoint);
  };

  return (
    <div>
      {!isUserLoading ? (
        <>
          <div className="flex items-start justify-between gap-5">
            <section className="lg:w-[70%] w-[948px]">
              <div className="flex justify-between gap-2 mt-2 w-full">
                {features.map((item) => (
                  <div
                    key={item.id}
                    className="w-[213px] h-[150px] cursor-pointer font-inter rounded-lg bg-white shadow-3xl p-6"
                    onClick={() => handleFeatureClick(item.endpoint)}
                  >
                    <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center h-[56px] w-[56px]">
                      <item.icon className="text-primaryblue text-4xl" />
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                      <p
                        className={`text-sm font-inter font-medium ${
                          item.id === 1 ? "w-[55%]" : "w-[70%]"
                        }`}
                      >
                        {item.name}
                      </p>
                      <MdArrowRightAlt className="text-xl text-primaryblue" />
                    </div>
                  </div>
                ))}
              </div>
              {!user.is_kyc_verified && <KycSection />}
              <MannualEntry />
              <div className="mt-10 flex justify-between w-full">
                <RecentVisitor />
                <VisitorWaiting />
              </div>
              <NewVisitors />
              <PercentageSection />
              <LineGraphSection />
            </section>
            <section className="flex m-2 flex-col lg:w-[25%] w-[388px]">
              <QrComponent />
              <BranchSection />
              <AdsComponent />
            </section>
          </div>
          <div className="mt-20 bg-primaryblue h-[46px] w-full -mb-4 flex justify-center items-center">
            <p className="font-inter text-base font-medium text-white">
              © 2024 ePass. All Rights Reserved.
            </p>
          </div>
        </>
      ) : (
        <LoadingComponent isLoading={isUserLoading} />
      )}
    </div>
  );
}
