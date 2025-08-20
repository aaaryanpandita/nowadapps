// /user/connectWallet

import api from "@/services/api-service";
import { useQuery } from "@tanstack/react-query";

export const connectWallet = async ({ walletAddress, parentReferralCode }) => {
  try {
    const result = await api({
      url: "/user/connectWallet",
      method: "POST",
      data: {
        walletAddress: walletAddress || undefined,
        parentReferralCode: parentReferralCode || undefined,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

export const useGetUserByWallet = (walletAddress) => {
  return useQuery({
    queryKey: [walletAddress, "walletAddress"],
    queryFn: () => getUserByWallet({ walletAddress }),
    select: (data) => {
      return data?.data;
    },
    enabled: !!walletAddress,
  });
};

export const getUserByWallet = async ({ walletAddress }) => {
  try {
    const result = await api({
      url: `/user/getUserByWallet/${walletAddress}`,
      method: "GET",
    });

    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

export const useSocialTasksUsers = (walletAddress) => {
  return useQuery({
    queryKey: [walletAddress, "walletAddress"],
    queryFn: () => getUserByWallet({ walletAddress }),
    select: (data) => {
      return data?.data;
    },
    enabled: !!walletAddress,
  });
};

export const socialTasksUsers = async () => {
  try {
    const result = await api({
      url: `/user/socialTasksUsers`,
      method: "GET",
    });

    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

export const taskCompleted = async ({
  taskType,
  socialTasksCompleted,
  referralTasksCompleted,
}) => {
  try {
    const result = await api({
      url: "/user/taskCompleted",
      method: "POST",
      data: {
        taskType: taskType,
        socialTasksCompleted: socialTasksCompleted,
        referralTasksCompleted: referralTasksCompleted,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};
