"use client";

import Image from "next/image";
import * as React from "react";

export default function LoadingComponent({ isLoading }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 1) % 101);
    }, 50);

    const loaderTime = isLoading ? 5000 : 0;

    setTimeout(() => {
      clearInterval(interval);
    }, loaderTime);

    return () => clearInterval(interval);
  }, [isLoading]);

  const gradientColor = `linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 69, 223, ${
    progress / 100
  }))`;

  return (
    <div className="flex items-center flex-col justify-center mt-10 h-[100vh] w-[100%]">
      <Image
        src={require("../../../organization-site/app/assets/epass.png")}
        alt=""
        className="h-14 "
        width={100}
        height={44}
        loading="lazy"
      />

      <div className="w-[287px] bg-black h-[3px] mt-10 rounded overflow-hidden shadow-2xl">
        <div
          className="h-full bg-blue-500 transition-all duration-500 "
          style={{ width: `${progress}%`, backgroundImage: gradientColor }}
        ></div>
      </div>
    </div>
  );
}
