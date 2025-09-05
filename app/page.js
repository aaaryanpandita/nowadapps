"use client";

import Footer from "@/common-components/globals/Footer";
import AboutSection from "@/common-components/home/AboutSection";
import ChartSection from "@/common-components/home/ChartSection";
import HeroSection from "@/common-components/home/HeroSection";
import { MacBookScrollSection } from "@/common-components/home/MacBookScrollSection";
import MarqueeSection from "@/common-components/home/MarqueeSection";
import  AirdropTime  from "@/common-components/home/AirdropTime";
import NextGenSection from "@/common-components/home/NextGenSection";
import { TimeLineSection } from "@/common-components/home/TimeLineSection";
import FAQSection from "@/common-components/home/FAQSection";
export default function Home() {
  return (
    <div>
      <div className="flex flex-col gap-32 mx-2 ">
        <HeroSection />
      </div>
      <NextGenSection />
      <div className="flex flex-col gap-32 mx-2 mb-28">
        <AboutSection />
        <MacBookScrollSection/>
        <ChartSection />
        <AirdropTime/>
        <TimeLineSection />
        <FAQSection/>
        {/* <MarqueeSection /> */}
      </div>
    </div>
  );
}
