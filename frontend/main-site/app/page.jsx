import Benefits from "@/modules/main-page-ui/Benefits";
import HowWeWork from "@/modules/main-page-ui/HowWeWork";
import Patners from "@/modules/main-page-ui/Patners";
import Process from "@/modules/main-page-ui/Process";
import TopSection from "@/modules/main-page-ui/TopSection";
import WhyUs from "@/modules/main-page-ui/WhyUs";
import WorkPlace from "@/modules/main-page-ui/WorkPlace";
import React from "react";

const Homepage = () => {
  return (
    <main className=" h-full bg-bgcolor lg:w-full w-[1200px]">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
       
        <h1 className="mb-8 text-5xl font-bold text-white animate-pulse">
          Coming Soon
        </h1>
       
      </div>

      {/* <div className="flex flex-col items-center  min-h-screen ">
       <TopSection/>
       <Patners/>
       <WorkPlace/>
       <HowWeWork/>
       <WhyUs/>
       <Process/>
       <Benefits/>
      </div> */}
    </main>
  );
};

export default Homepage;
