"use client";

import AboutSection from "@/common-components/home/AboutSection";
import HeroSection from "@/common-components/home/HeroSection";
import { MacBookScrollSection } from "@/common-components/home/MacBookScrollSection";
import NextGenSection from "@/common-components/home/NextGenSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 mx-2">
      <HeroSection />
      <MacBookScrollSection />
      <AboutSection />
      <NextGenSection />
    </div>
  );
}
