"use client";

import AboutSection from "@/common-components/home/AboutSection";
import HeroSection from "@/common-components/home/HeroSection";
import NextGenSection from "@/common-components/home/NextGenSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <HeroSection />
      <AboutSection />
      <NextGenSection />
    </div>
  );
}
