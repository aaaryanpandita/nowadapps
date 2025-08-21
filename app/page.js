"use client";

import Footer from "@/common-components/globals/Footer";
import AboutSection from "@/common-components/home/AboutSection";
import ChartSection from "@/common-components/home/ChartSection";
import HeroSection from "@/common-components/home/HeroSection";
import { MacBookScrollSection } from "@/common-components/home/MacBookScrollSection";
import MarqueeSection from "@/common-components/home/MarqueeSection";
import NextGenSection from "@/common-components/home/NextGenSection";
import { TimeLineSection } from "@/common-components/home/TimeLineSection";
import Tasker from "@/common-components/task";
import DailyTaskModal from "@/common-components/task/daily-task-modal";
import { useGetUserByWallet } from "@/queries";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
export default function Home() {
  const { address } = useAccount();
  const searchParams = useSearchParams();

  const {
    mutateAsync: connectWalletMutate,
    isPending: connectWalletMutatePending,
  } = useMutation({
    mutationFn: () => {
      const params = new URLSearchParams(searchParams);
      const parentRefCode = params.get("parent_ref_code");
      return connectWallet({
        walletAddress: address,
        parentReferralCode: parentRefCode,
      });
    },
    onSuccess: (data) => {
      const token = data?.data?.result?.token;
      sessionStorage.setItem("token", token);
    },
  });
  const {
    data: isUserExist,
    isPending: isUserExistPending,
    refetch: isUserExistRefetch,
  } = useGetUserByWallet(address);

  useEffect(() => {
    if (isUserExist?.result?.isUserExist) {
      connectWalletMutate();
    }
  }, [address, isUserExist]);

  return (
    <div>
      <div className="flex flex-col gap-44 mx-2 ">
        <HeroSection />
      </div>
      <MacBookScrollSection />
      <div className="flex flex-col gap-44 mx-2 mb-28">
        <AboutSection />
        <NextGenSection />
        <ChartSection />
        <TimeLineSection />
        {/* <MarqueeSection /> */}
      </div>
      <Tasker />
      <DailyTaskModal open={true} />
    </div>
  );
}
