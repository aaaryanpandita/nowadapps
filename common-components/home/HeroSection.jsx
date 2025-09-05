"use client";
import React, { useMemo, useState } from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { ArrowRight, Loader } from "lucide-react";

import Link from "next/link";
import { IconShare } from "@tabler/icons-react";
import CopyToClipboard from "react-copy-to-clipboard";
import SocialShareModal from "../task/social-share-modal";
import StakeClaim from "../task/stake-claim";
import { useAccount } from "wagmi";
import SocialTask from "../task/social-task";
import {
  useConnectWallet,
  useDailyTasksUsers,
  useReferredUsers,
} from "@/queries";
import DailyTask from "../task/daily-task";
import { toast } from "sonner";

const HeroSection = () => {
  const { isConnected, address } = useAccount();
  const [shareModal, setShareModal] = useState(false);
  const {
    data: userData,
    isLoading: userDataLoading,
    refetch: userDataRefetch,
  } = useConnectWallet({
    walletAddress: address,
  });

  const {
    data: dailyTask,
    isPending: dailyTaskPending,
    refetch: dailyTaskRefetch,
  } = useDailyTasksUsers({
    walletAddress: address,
  });
  const { data: referredData, isPending: referredDataPending } =
    useReferredUsers(address, 1);

  const cardToShow = useMemo(() => {
    if (!userData?.referralTasksCompleted && !userData?.socialTasksCompleted) {
      return "social";
    }
    const enableClaim =
      (dailyTask?.tasks?.length == 0 ||
        !dailyTask?.tasks ||
        dailyTask?.tasks?.every((i) => i?.isCompleted)) &&
      userData?.referralTasksCompleted &&
      userData?.socialTasksCompleted;

    const enableDailyTask =
      (dailyTask?.tasks?.length > 0 ||
        dailyTask?.tasks?.every((i) => !i?.isCompleted)) &&
      userData?.referralTasksCompleted &&
      userData?.socialTasksCompleted;

    if (enableClaim) {
      return "claim";
    }
    if (enableDailyTask) {
      return "dailyTask";
    }
  }, [userData, dailyTask]);

  return (
    <div className="relative w-full overflow-hidden bg-brand-background flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-brand-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className=" container mx-auto grid grid-cols-12 mt-2 relative z-20 w-full pt-32  sm:py-36">
        <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-10 relative mt-25 ">
          <p className="text-6xl">
            90% of Crypto Traders Lose Money. Here's Why
          </p>
          <p className="relative z-10">
            While you guess market moves, institutions use AI to predict them
            with 70%+ accuracy. <br />
            <span>
              NOWA changes that. Get the same predictive tools through simple
              token staking.
            </span>
          </p>

          <Link href={"/docs/lite-paper.pdf"} target="_blank">
            <button className="bg-brand  py-2 flex flex-row px-3 gap-3 justify-center items-center rounded-3xl group cursor-pointer">
              <p className="text-black"> Read Litepaper</p>
              <div className="bg-white rounded-full h-8 w-8 flex justify-center items-center group-hover:-rotate-45 group-hover:shadow-2xl group-hover:shadow-card-bg transition-all duration-150 delay-150 ease-linear">
                <ArrowRight color="#000" />
              </div>
            </button>
          </Link>
          {isConnected && (
            <div className="flex flex-col gap-3">
              <p>Your Referral Code</p>
              <div className="flex flex-row gap-4">
                <div className="w-full flex flex-row border border-brand border-dotted p-1 pl-4 rounded-4xl">
                  <input
                    type="text"
                    value={userData?.referralCode}
                    className="w-full outline-0 h-10 "
                  />

                  <CopyToClipboard
                    text={userData?.referralCode}
                    onCopy={() => {
                      toast.success("Copied successfully.");
                    }}
                  >
                    <button className="bg-brand w-28 rounded-4xl text-black cursor-pointer">
                      Copy
                    </button>
                  </CopyToClipboard>
                </div>
                <button
                  className="flex bg-brand flex-row items-center justify-center gap-4 px-4 rounded-4xl text-black cursor-pointer"
                  onClick={() => {
                    setShareModal(true);
                  }}
                >
                  <p>Share</p>
                  <IconShare />
                </button>
              </div>
              <p>
                <span> Get {referredData?.referralReward || 0}</span>{" "}
                <img
                  src="/assets/brand/onlyLogo.png"
                  alt=""
                  className="object-contain h-4 inline"
                />{" "}
                <span> for each invited user</span>
              </p>
            </div>
          )}
        </div>

        {!isConnected && <StakeClaim />}
        {isConnected && (userDataLoading || dailyTaskPending) && (
          <div className="col-span-12 lg:col-span-6 min-h-96 flex flex-col justify-center items-center">
            <Loader />
            <p className="text-3xl font-semibold">Getting Data...</p>
          </div>
        )}
        {isConnected && !userDataLoading && (
          <>
            {cardToShow == "claim" && <StakeClaim />}
            {cardToShow == "social" && (
              <SocialTask userDataRefetch={userDataRefetch} />
            )}
            {cardToShow == "dailyTask" && (
              <DailyTask dailyTaskRefetch={dailyTaskRefetch} />
            )}
          </>
        )}
      </div>
      <SocialShareModal
        open={shareModal}
        close={() => {
          setShareModal(false);
        }}
      />
    </div>
  );
};

export default HeroSection;
