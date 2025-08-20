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
    queryKey: [walletAddress, "socialTasksUsers"],
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

export const useDailyTasksUsers = (walletAddress) => {
  return useQuery({
    queryKey: [walletAddress, "dailyTasksUsers"],
    queryFn: () => dailyTasksUsers({ walletAddress }),
    select: (data) => {
      if (data?.data?.responseCode == 200) {
        return data?.data?.result?.tasks;
      }
      return [];
    },
    enabled: !!walletAddress,
  });
};

export const dailyTasksUsers = async () => {
  try {
    const result = await api({
      url: `/user/dailyTasksUsers`,
      method: "GET",
    });

    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

export const completeDailyTask = async ({ taskId }) => {
  try {
    const result = await api({
      url: "/user/completeDailyTask",
      method: "POST",
      data: {
        taskId: taskId || undefined,
        isCompleted: true,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

export const useReferredUsers = (walletAddress) => {
  return useQuery({
    queryKey: [walletAddress, "referredUsers"],
    queryFn: () => referredUsers({ walletAddress }),
    select: (data) => {
      if (data?.data?.responseCode == 200) {
        return data?.data?.result;
      }
      return {};
    },
    enabled: !!walletAddress,
  });
};

export const referredUsers = async () => {
  try {
    const result = await api({
      url: `/user/referredUsers`,
      method: "GET",
    });
    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};
