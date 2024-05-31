import React from "react";
import { useRouter } from "next/navigation";
import { useUserData } from "../hooks/useUserData";

export default function KycSection() {
  const router = useRouter();
  const { data: user } = useUserData();

  return (
    <div className="flex relative justify-between shadow-3xl lg:w-full w-[958px] h-[185px] rounded-xl  mt-10 font-inter text-white bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC]">
      <div className="p-7">
        <p className="text-2xl font-bold">KYC </p>
        <p className="leading-6 font-normal text-base w-[540px]">
          Fill your kyc as per required information. Your kyc will be verified
          within 24 hours.
        </p>
        <div
          className="w-[124px] h-[36px] cursor-pointer rounded-xl bg-white text-primaryblue flex items-center justify-center mt-5"
          onClick={() => {
            if (user.organization_status === null) {
              router.push("/verify-kyc");
            }
          }}
        >
          {user.organization_status === null ? " Fill KYC" : "Pending"}
        </div>
      </div>

      <div
        className="w-[281px] absolute -right-0 h-[207px] -top-2 p-2  rounded-l-[90px] rounded-r-xl bg-cover bg-center"
        style={{ backgroundImage: 'url("/kyc.png")' }}
      ></div>
    </div>
  );
}
