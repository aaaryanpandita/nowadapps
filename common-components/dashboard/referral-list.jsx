import { BackgroundGradient } from "@/components/ui/background-gradient";
import React from "react";

const ReferralList = () => {
  return (
    <div className="container mx-auto relative z-20 w-full ">
      <BackgroundGradient className=" grid grid-cols-12 h-full w-full bg-[#121313] gap-4 p-6 shadow-[0px_0px_7.6px_7px_rgba(100,231,158,0.25)] rounded-2xl">
        <p>My Referrals</p>
      </BackgroundGradient>
    </div>
  );
};

export default ReferralList;
