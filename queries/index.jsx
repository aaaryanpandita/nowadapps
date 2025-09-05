import api from "@/services/api-service";
import { useQuery } from "@tanstack/react-query";

export const useConnectWallet = ({ walletAddress }) => {
  return useQuery({
    queryKey: [walletAddress, "connectWallet"],
    queryFn: () => connectWallet({ walletAddress }),
    select: (data) => {
      if (data?.data?.responseCode == 200) {
        return data?.data?.result?.user;
      }

      return {};
    },
    enabled: !!walletAddress,
  });
};

export const connectWallet = async ({ walletAddress }) => {
  try {
    const result = await api({
      url: "/user/connectWallet",
      method: "POST",
      data: {
        walletAddress: walletAddress || undefined,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

export const updateUserDetails = async ({
  xUsername,
  instagramUsername,
  telegramUsername,
  socialTasksCompleted,
  referralTasksCompleted,
  captchaValue,
  walletAddress,
  parentReferralCode,
}) => {
  try {
    const result = await api({
      url: "/user/updateUserDetails",
      method: "POST",
      data: {
        xUsername,
        instagramUsername,
        telegramUsername,
        socialTasksCompleted,
        referralTasksCompleted,
        captchaValue,
        walletAddress,
        parentReferralCode,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

export const useDailyTasksUsers = ({ walletAddress }) => {
  return useQuery({
    queryKey: [walletAddress, "dailyTasksUsers"],
    queryFn: () => dailyTasksUsers({ walletAddress }),
    select: (data) => {
      if (data?.data?.responseCode == 200) {
        return data?.data?.result;
      }

      return {};
    },
    enabled: !!walletAddress,
  });
};

export const dailyTasksUsers = async ({ walletAddress }) => {
  try {
    const result = await api({
      url: `/user/dailyTasksUsers`,
      method: "GET",
      params: {
        walletAddress,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

export const useReferredUsers = (walletAddress, currentPage) => {
  return useQuery({
    queryKey: [walletAddress, "getReferredUsers", currentPage],
    queryFn: () =>
      getReferredUsers({
        currentPage: currentPage,
        walletAddress: walletAddress,
      }),
    select: (data) => {
      if (data?.data?.responseCode == 200) {
        return data?.data?.result;
      }
      return {};
    },
    enabled: !!walletAddress,
  });
};

export const getReferredUsers = async ({ currentPage, walletAddress }) => {
  try {
    const result = await api({
      url: `/user/getReferredUsers`,
      method: "GET",
      params: {
        walletAddress: walletAddress,
        page: currentPage,
        limit: 10,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

export const completeDailyTask = async ({
  taskId,
  isCompleted,
  walletAddress,
}) => {
  try {
    const result = await api({
      url: `/user/completeDailyTask`,
      method: "POST",
      data: {
        taskId,
        isCompleted,
        walletAddress,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};
