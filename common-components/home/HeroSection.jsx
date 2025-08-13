"use client";
import React, { useMemo, useState } from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import {
  useAccount,
  useConfig,
  useReadContract,
  useWriteContract,
} from "wagmi";
import {
  abi,
  AIRDROP_CONTRACT_ADDRESS,
  formatCurrency,
  STAKING_CONTRACT_ADDRESS,
} from "@/const";
import { formatUnits } from "ethers";
import { useTimer } from "react-timer-hook";
import moment from "moment";
import { waitForTransactionReceipt } from "@wagmi/core";
import { toast } from "sonner";
import { useAppKit } from "@reown/appkit/react";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const HeroSection = () => {
  const { address, isConnected } = useAccount();
  const [claimTime, setClaimTime] = useState(null);
  const [isClaimable, setIsClaimable] = useState(false);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const config = useConfig();
  const { open } = useAppKit();
  const { writeContractAsync, isPending: writeContractPending } =
    useWriteContract();
  const { data: totalAirdropped, refetch: totalAirdroppedRefetch } =
    useReadContract({
      abi: abi.AIRDROP_ABI,
      address: AIRDROP_CONTRACT_ADDRESS,
      functionName: "totalAirdropped",
    });
  const { data: totalClaimAirdrop, refetch: totalClaimAirdropRefetch } =
    useReadContract({
      abi: abi.AIRDROP_ABI,
      address: AIRDROP_CONTRACT_ADDRESS,
      functionName: "totalClaimAirdrop",
    });
  const { data: apyData, refetch: apyDataRefetch } = useReadContract({
    abi: abi.STAKING_ABI,
    account: address,
    address: STAKING_CONTRACT_ADDRESS,
    functionName: "apy",
  });
  const { data: totalStakeAmountData, refetch: totalStakeAmountDataRefetch } =
    useReadContract({
      abi: abi.STAKING_ABI,
      account: address,
      address: STAKING_CONTRACT_ADDRESS,
      functionName: "totalStakeAmount",
    });
  const { data: pendingRewardData, refetch: pendingRewardDataRefetch } =
    useReadContract({
      abi: abi.STAKING_ABI,
      account: address,
      address: STAKING_CONTRACT_ADDRESS,
      args: [address],
      functionName: "pendingReward",
    });

  const {
    data: totalUniqueAddressData,
    refetch: totalUniqueAddressDataRefetch,
  } = useReadContract({
    abi: abi.STAKING_ABI,
    account: address,
    address: STAKING_CONTRACT_ADDRESS,
    functionName: "totalUniqueAddress",
  });
  const { data: userInfo, refetch: userInfoRefetch } = useReadContract({
    abi: abi.STAKING_ABI,
    account: address,
    address: STAKING_CONTRACT_ADDRESS,
    args: [address],
    functionName: "userInfo",
  });

  const { data: minStakeAmountData, refetch: minStakeAmountDataRefetch } =
    useReadContract({
      abi: abi.STAKING_ABI,
      account: address,
      address: STAKING_CONTRACT_ADDRESS,
      functionName: "minStakeAmount",
    });

  const { data: airdropInfoData, refetch: refetchAirDropInfo } =
    useReadContract({
      abi: abi.AIRDROP_ABI,
      account: address,
      address: AIRDROP_CONTRACT_ADDRESS,
      args: [address],
      functionName: "airdropInfo",
    });
  const { data: claimCooldownData, refetch: claimCooldownDataRefetch } =
    useReadContract({
      abi: abi.AIRDROP_ABI,
      account: address,
      address: AIRDROP_CONTRACT_ADDRESS,
      functionName: "claimCooldown",
    });
  const { data: claimAmountData, refetch: claimAmountDataRefetch } =
    useReadContract({
      abi: abi.AIRDROP_ABI,
      account: address,
      address: AIRDROP_CONTRACT_ADDRESS,
      functionName: "claimAmount",
    });

  const { data: claimFeeData, refetch: claimFeeDataRefetch } = useReadContract({
    abi: abi.AIRDROP_ABI,
    account: address,
    address: AIRDROP_CONTRACT_ADDRESS,
    functionName: "claimFee",
  });

  const airdropInfo = useMemo(() => {
    const totalAirDrop = totalAirdropped ? formatUnits(totalAirdropped) : 0;
    const totalClaimedDrops = totalClaimAirdrop
      ? formatUnits(totalClaimAirdrop)
      : 0;

    const leftToClaimDrop = Number(totalAirDrop) - Number(totalClaimedDrops);

    const percentage =
      Number((Number(totalClaimedDrops) / Number(leftToClaimDrop)) * 100) || 0;

    return {
      totalAirDrop,
      totalClaimedDrops,
      leftToClaimDrop,
      percentage,
    };
  }, [totalAirdropped, totalClaimAirdrop]);

  const formattedDetail = useMemo(() => {
    const apy = Number(apyData) / 100;
    const claimedAmount = totalStakeAmountData
      ? formatUnits(totalStakeAmountData)
      : 0;
    const totalEarning = pendingRewardData ? formatUnits(pendingRewardData) : 0;
    const myStaked = userInfo?.[0] ? formatUnits(userInfo?.[0]) : 0;
    return {
      apy: apy,
      totalClaimedAmount: isConnected ? claimedAmount : 0,
      totalEarning: isConnected ? totalEarning : 0,
      totalUniqueAddress: totalUniqueAddressData
        ? Number(totalUniqueAddressData)
        : 0,
      myStaked: myStaked,
    };
  }, [
    apyData,
    totalStakeAmountData,
    pendingRewardData,
    totalUniqueAddressData,
    isConnected,
    userInfo,
  ]);

  const { seconds, minutes, hours, restart, start } = useTimer({
    expiryTimestamp: claimTime,
    onExpire: () => {
      setIsClaimable(true);
      refetchHandler();
    },
    autoStart: false,
  });

  const formattedDetails = useMemo(() => {
    const minStakeAmount = minStakeAmountData
      ? formatUnits(minStakeAmountData)
      : 0;
    const lastClaimTimeStamp = moment
      .unix(Number(airdropInfoData?.[2]))
      .add(Number(claimCooldownData), "seconds")
      ?.toDate();
    setIsClaimable(moment()?.isSameOrAfter(moment(lastClaimTimeStamp)));
    setClaimTime(lastClaimTimeStamp);
    restart(lastClaimTimeStamp);
    return {
      minAmount: minStakeAmount,
      claimRemainTime: lastClaimTimeStamp,

      singleClaimableAmount: claimAmountData ? formatUnits(claimAmountData) : 0,
    };
  }, [minStakeAmountData, claimCooldownData, airdropInfoData, claimAmountData]);

  const claimHandler = async () => {
    try {
      setIsTransactionPending(true);
      const tx = await writeContractAsync({
        abi: abi.AIRDROP_ABI,
        address: AIRDROP_CONTRACT_ADDRESS,
        account: address,
        functionName: "claim",
        value: claimFeeData,
      });

      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: tx,
      });
      toast.success("Claimed successfully");
      refetchHandler();
    } catch (error) {
      toast.error(error?.shortMessage || "Something went wrong");
      console.log(error);
    } finally {
      refetchHandler();
      setIsTransactionPending(false);
    }
  };

  const refetchHandler = async () => {
    try {
      await totalAirdroppedRefetch();
      await totalClaimAirdropRefetch();
      await apyDataRefetch();
      await pendingRewardDataRefetch();
      await totalUniqueAddressDataRefetch();
      await userInfoRefetch();
      await minStakeAmountDataRefetch();
      await refetchAirDropInfo();
      await claimCooldownDataRefetch();
      await claimFeeDataRefetch();
      await claimAmountDataRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" lg:h-[800px] relative w-full overflow-hidden bg-brand-background flex flex-col items-center justify-center rounded-lg pt-40">
      <div className="absolute inset-0 w-full h-full bg-brand-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className=" lg:h-[600px] container mx-auto grid grid-cols-12 mt-2 relative z-20 w-full ">
        <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-10 relative  ">
          <p className="text-6xl">Welcome to Nowa — Built with AI</p>
          <p className="relative z-10">
            The Future of Crypto Prediction is AI-Driven – Join NOWA.
          </p>
          <button className="bg-brand  py-2 flex flex-row px-3 gap-3 justify-center items-center rounded-3xl group cursor-pointer">
            <p className="text-black"> Get Started Now</p>
            <div className="bg-white rounded-full h-8 w-8 flex justify-center items-center group-hover:-rotate-45 group-hover:shadow-2xl group-hover:shadow-card-bg transition-all duration-150 delay-150 ease-linear">
              <ArrowRight color="#000" />
            </div>
          </button>
          {/* <img
            src="/assets/home/hero.png"
            alt=""
            className="object-contain h-[400px]"
          /> */}
        </div>
        <div className="col-span-12 lg:col-span-6  relative mt-8 lg:mt-0 ">
          <BackgroundGradient className="grid grid-cols-12 md:grid-rows-12 h-full w-full bg-[#121313] gap-4 p-6 shadow-[0px_0px_7.6px_7px_rgba(100,231,158,0.25)] rounded-2xl">
            <div className="col-span-12 md:col-span-5 row-span-6 bg-card-bg flex justify-between items-center flex-col p-4 rounded-2xl min-h-72 md:min-h-auto">
              <h1 className="font-semibold">Airdrop Phase 1</h1>

              <div className="relative w-30 flex justify-center items-center h-20">
                <CircularProgressbarWithChildren
                  value={airdropInfo?.percentage}
                  className="fill-brand"
                  strokeWidth={8}
                  styles={buildStyles({
                    pathColor: "rgb(0, 255, 169)",
                    trailColor: "rgb(11, 14, 19)",
                  })}
                >
                  <img
                    src="/assets/brand/onlyLogo.png"
                    alt=""
                    className="object-contain h-16"
                  />
                </CircularProgressbarWithChildren>
              </div>
              <div className="w-full flex flex-col gap-4 ">
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="h-3 w-3 rounded-full bg-brand" />
                    <p>Total Claimed</p>
                  </div>
                  <p>
                    {formatCurrency({
                      value: airdropInfo?.totalClaimedDrops,
                      symbol: "NOWA",
                    })}
                  </p>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="h-3 w-3 rounded-full bg-card" />
                    <p>Left to Claim</p>
                  </div>
                  <p>
                    {" "}
                    {formatCurrency({
                      value: airdropInfo?.leftToClaimDrop,
                      symbol: "NOWA",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 row-span-3 bg-card-bg p-6 flex flex-col gap-4 rounded-2xl">
              <p>Annual Percentage Yield</p>
              <p className="text-3xl font-semibold">{formattedDetail?.apy}%</p>
            </div>
            <div className="col-span-12 md:col-span-7 row-span-3 bg-card-bg p-6 flex flex-col gap-4 rounded-2xl">
              <p>My Staked Amount</p>
              <p className="text-3xl font-semibold">
                {formatCurrency({
                  value: formattedDetail?.myStaked,
                  symbol: "NOWA",
                })}
              </p>
            </div>
            <div className="col-span-12 md:col-span-12 row-span-3 bg-card-bg flex items-center justify-center flex-col px-6 md:px-10 gap-4 rounded-2xl min-h-40 md:min-h-auto">
              <p>Claim & Stake</p>
              <div className="flex items-center justify-between w-full flex-col md:flex-row">
                <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-4xl">
                  <img
                    src="/assets/brand/onlyLogo.png"
                    alt=""
                    className="object-contain h-6"
                  />
                  <p className="text-xl">
                    {formatCurrency({
                      value: formattedDetails?.singleClaimableAmount,
                      symbol: "NOWA",
                    })}
                  </p>
                </div>
                <button
                  className="bg-brand w-full lg:w-52 text-black py-2 rounded-2xl mt-4 md:mt-0 cursor-pointer"
                  onClick={() => {
                    if (!isConnected) {
                      open();
                      return;
                    }
                    if (isConnected && isClaimable) {
                      claimHandler();
                    }
                  }}
                >
                  {isConnected ? (
                    <>
                      {isClaimable ? (
                        <p>{isTransactionPending ? `Claiming...` : `Claim`}</p>
                      ) : (
                        <div className="flex items-center justify-between px-6">
                          <p className="bg-black/30 w-12 h-8 text-center rounded-lg flex items-center justify-center">
                            {String(hours)?.padStart(2, 0)}
                          </p>
                          <p className="text-black">:</p>
                          <p className="bg-black/30 w-12 h-8 text-center rounded-lg flex items-center justify-center">
                            {String(minutes)?.padStart(2, 0)}
                          </p>
                          <p className="text-black">:</p>
                          <p className="bg-black/30 w-12 h-8 text-center rounded-lg flex items-center justify-center">
                            {String(seconds)?.padStart(2, 0)}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p>Connect Wallet</p>
                  )}
                </button>
              </div>
            </div>
            <div className="col-span-12 row-span-3 bg-card-bg flex flex-col md:flex-row justify-between items-center p-6 md:px-10 rounded-2xl gap-12 md:gap-0">
              <div className="flex flex-col justify-between w-full">
                <p>My Earning</p>
                <p className="text-2xl font-semibold ">
                  {formatCurrency({
                    value: formattedDetail?.totalEarning,
                    symbol: "NOWA",
                  })}
                </p>
              </div>
              <div>
                <button className="bg-brand/50 w-52 text-black py-2 rounded-2xl">
                  Claim Reward
                </button>
                <p className="text-xs mt-4">
                  Note:- Claiming of rewards start soon
                </p>
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
