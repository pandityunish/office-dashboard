import React from "react";
import { useUserData } from "../hooks/useUserData";
import { GoDownload } from "react-icons/go";
import { saveAs } from "file-saver";
import { baseurl } from "../apiurl";

export default function QrComponent() {
  const { data: user, isLoading, isError } = useUserData();

  const handleDownload = () => {
    if (user?.qr) {
      saveAs(`${baseurl}${user.qr}`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="w-full shadow-3xl bg-white rounded-lg h-[599px] flex items-center justify-center flex-col p-4">
      <img src={`${baseurl}/media/logo/epass.png`} alt="Epass logo" className="h-14" />
      <div className="text-center border-[#197abe] w-[240px] mt-9 h-[302px] border-[8px] rounded-2xl p-4">
        <p className="font-bold text-black text-2xl font-inter">Scan the QR</p>
        <div className="flex items-center justify-center">
          <img
            src={user.qr ? `${baseurl}${user.qr}` : "/user-avatar.png"}
            alt="User QR Code"
            height={180}
            width={180}
          />
        </div>
        <div className="terminal-no text-center mt-8 text-black">
          <p className="text-black text-base font-inter">Terminal No.</p>
          <p className="terminal-number font-bold text-black mt-3 text-base font-inter">
            {user.id}
          </p>
        </div>
      </div>
      <p className="font-bold text-3xl font-inter mt-4">{user.full_name}</p>
      <p className="font-normal text-base font-inter mt-2 text-center">
        {user.address || ""}
      </p>
      <button
        className="bg-white gap-3 border flex items-center justify-center border-primaryblue rounded-xl mt-4 w-[182px] h-[48px] text-primaryblue"
        onClick={handleDownload}
      >
        Download QR <GoDownload className="text-2xl" />
      </button>
    </div>
  );
}
