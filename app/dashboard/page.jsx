"use client";
import ReferralList from "@/common-components/dashboard/referral-list";
import SocialShareModal from "@/common-components/task/social-share-modal";
import { Boxes } from "@/components/ui/background-boxes";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { formatCurrency } from "@/const";
import { useGetUserByWallet, useReferredUsers } from "@/queries";
import { IconShare } from "@tabler/icons-react";
import { Share } from "lucide-react";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAccount } from "wagmi";

const ReferralDashBoard = () => {
  const { address } = useAccount();
  const [shareDataModalState, setShareDataModalState] = useState(false);
  const { data: referredData, isPending: referredDataPending } =
    useReferredUsers(address);
  const { data: userData, isPending: userDataPending } =
    useGetUserByWallet(address);

  return (
    <div className="relative w-full overflow-hidden bg-brand-background flex flex-col items-center justify-center rounded-lg ">
      <div className="absolute inset-0 w-full h-full bg-brand-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="container mx-auto mt-2 relative z-20 w-full pt-32  sm:py-10">
        <div className="mt-20 mb-10 flex w-full items-center justify-center">
          <p className="text-4xl font-semibold">Referral Dashboard</p>
        </div>
        <BackgroundGradient className=" grid grid-cols-12 h-full w-full bg-[#121313] gap-4 p-6 shadow-[0px_0px_7.6px_7px_rgba(100,231,158,0.25)] rounded-2xl">
          <div className="col-span-4 flex justify-center items-center">
            <img
              src="/assets/brand/onlyLogo.png"
              alt=""
              className="object-contain h-96 w-60"
            />
          </div>
          <div className="col-span-8">
            <div className="w-full flex flex-col gap-4 h-[50%]">
              <p>Your Referral Link</p>
              <div className="flex flex-row gap-4">
                <div className="w-full flex flex-row border border-brand border-dotted p-1 pl-4 rounded-4xl">
                  <input
                    type="text"
                    value={userData?.result?.user?.referralCode || ""}
                    className="w-full outline-0 h-10 "
                  />

                  <CopyToClipboard text={userData?.result?.user?.referralCode}>
                    <button className="bg-brand w-28 rounded-4xl text-black cursor-pointer">
                      Copy
                    </button>
                  </CopyToClipboard>
                </div>
                <button
                  className="flex bg-brand flex-row items-center justify-center gap-4 px-4 rounded-4xl text-black cursor-pointer"
                  onClick={() => {
                    setShareDataModalState(true);
                  }}
                >
                  <p>Share</p>
                  <IconShare />
                </button>
              </div>

              <p>
                <span> Get 50</span>{" "}
                <img
                  src="/assets/brand/onlyLogo.png"
                  alt=""
                  className="object-contain h-4 inline"
                />{" "}
                <span> for each invite user</span>
              </p>
            </div>
            <div className="w-full grid grid-cols-12  h-[50%] gap-4">
              <div className="col-span-4 bg-card-bg p-8 flex flex-col gap-4 rounded-4xl justify-center">
                <p>Total Referral</p>
                <p className="text-4xl font-semibold">5</p>
              </div>
              <div className="col-span-8 bg-card-bg p-8 flex  gap-4 rounded-4xl items-center justify-between flex-row">
                <div className="flex gap-4 flex-col">
                  <p>My Earning</p>
                  <p className="text-4xl font-semibold">
                    {formatCurrency({
                      value: 5750,
                      symbol: "NOWA",
                    })}
                  </p>
                </div>
                <div className=" flex flex-col items-center justify-center gap-4">
                  <button className="bg-brand text-black w-56 h-10 rounded-4xl cursor-pointer">
                    Claim Reward
                  </button>
                  <p className="text-xs">
                    Note:- Claiming of rewards start soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BackgroundGradient>
      </div>
      {shareDataModalState && (
        <SocialShareModal
          open={shareDataModalState}
          close={() => {
            setShareDataModalState(false);
          }}
        />
      )}
      <ReferralList />
    </div>
  );
};

export default ReferralDashBoard;
