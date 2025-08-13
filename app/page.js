"use client";

import Footer from "@/common-components/globals/Footer";
import AboutSection from "@/common-components/home/AboutSection";
import ChartSection from "@/common-components/home/ChartSection";
import HeroSection from "@/common-components/home/HeroSection";
import { MacBookScrollSection } from "@/common-components/home/MacBookScrollSection";
import MarqueeSection from "@/common-components/home/MarqueeSection";
import NextGenSection from "@/common-components/home/NextGenSection";
import { TimeLineSection } from "@/common-components/home/TimeLineSection";
export default function Home() {
  return (
    <div className="flex flex-col gap-44 mx-2 mb-28">
      <HeroSection />
      <MacBookScrollSection />
      <AboutSection />
      <NextGenSection />
      <ChartSection />
      <TimeLineSection />
      <MarqueeSection />
    </div>
  );
}
