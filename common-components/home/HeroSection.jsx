"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className=" lg:h-[800px] relative w-full overflow-hidden bg-brand-background flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-brand-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className=" h-[600px] max-w-7xl grid grid-cols-12 mt-2 relative z-20 w-full">
        <div className="col-span-6 flex flex-col items-start gap-10 relative  ">
          <p className="text-6xl">Welcome to Nowa — Built with AI</p>
          <p className="relative z-10">
            The Future of Crypto Prediction is AI-Driven – Join NOWA.
          </p>
          <button className="bg-brand  py-2 flex flex-row px-3 gap-3 justify-center items-center rounded-3xl ">
            <p> Get Started Now</p>
            <div className="bg-white rounded-full h-8 w-8 flex justify-center items-center">
              <ArrowRight color="#000" />
            </div>
          </button>
          {/* <img
            src="/assets/home/hero.png"
            alt=""
            className="absolute object-contain w-96 -right-20 -bottom-20"
          /> */}
        </div>
        <div className="col-span-6 bg-orange-300"> asfd</div>
      </div>
    </div>
  );
};

export default HeroSection;
