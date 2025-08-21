"use client";
import React, { useEffect, useState } from "react";
import ParentRefModal from "./parent-modal";
import ReferralModal from "./referral-modal";
import DailyTaskModal from "./daily-task-modal";
import { useAccount } from "wagmi";
import { connectWallet, taskCompleted, useGetUserByWallet } from "@/queries";
import Loader from "../globals/loader";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ShareModal from "./share-modal";
import SocialShareModal from "./social-share-modal";

const Tasker = () => {
  const { address, isConnected } = useAccount();
  const {
    data: isUserExist,
    isPending: isUserExistPending,
    refetch: isUserExistRefetch,
  } = useGetUserByWallet(address);
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
    mutateAsync: completeReferralTaskMutate,
    isPending: completeReferralTaskMutatePending,
  } = useMutation({
    mutationFn: () => {
      return taskCompleted({
        taskType: "referral",
        referralTasksCompleted: true,
      });
    },
    onSuccess: () => {
      setModalState((p) => {
        return {
          parentRefModal: false,
          referralModal: false,
          shareModal: false,
          dailyTaskModal: false,
          socialShareModal: false,
        };
      });
    },
  });

  const [modalState, setModalState] = useState({
    parentRefModal: false,
    referralModal: false,
    shareModal: false,
    dailyTaskModal: false,
    socialShareModal: false,
  });

  useEffect(() => {
    initalModalHandler();
  }, [isUserExist, isConnected]);

  const initalModalHandler = () => {
    try {
      if (!isConnected || connectWalletMutatePending || isUserExistPending) {
        return;
      }
      const isUserExistData = isUserExist?.result?.isUserExist;
      const socialTasksCompleted =
        isUserExist?.result?.user?.socialTasksCompleted;
      const referralTasksCompleted =
        isUserExist?.result?.user?.referralTasksCompleted;
      const isUserNew = isUserExist?.result?.isUserNew;

      if (isUserExistData) {
        connectWalletMutate();
      }

      if (!isUserExistData) {
        setModalState({
          ...modalState,
          parentRefModal: true,
        });
        return;
      }

      if (!socialTasksCompleted) {
        setModalState({
          ...modalState,
          referralModal: true,
        });
        return;
      }
      if (!referralTasksCompleted) {
        setModalState({
          ...modalState,
          shareModal: true,
        });
        return;
      }

      setModalState({
        parentRefModal: false,
        referralModal: false,
        shareModal: false,
        dailyTaskModal: false,
        socialShareModal: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const parentRefCloseHandler = async () => {
    try {
      await connectWalletMutate();
      setModalState({
        ...modalState,
        parentRefModal: false,
        referralModal: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (
    isConnected &&
    (isUserExistPending ||
      connectWalletMutatePending ||
      completeReferralTaskMutatePending)
  ) {
    return <Loader open={isUserExistPending} />;
  }

  return (
    <div>
      {modalState?.parentRefModal && (
        <ParentRefModal
          setModalState={setModalState}
          open={modalState.parentRefModal}
          close={parentRefCloseHandler}
        />
      )}
      {modalState?.referralModal && (
        <ReferralModal
          open={modalState.referralModal}
          setModalState={setModalState}
        />
      )}
      {modalState?.shareModal && (
        <ShareModal
          open={modalState.shareModal}
          setModalState={setModalState}
        />
      )}
      {modalState?.socialShareModal && (
        <SocialShareModal
          open={modalState.socialShareModal}
          close={() => {
            setModalState((p) => {
              return { ...p, socialShareModal: false };
            });
          }}
          clickHandler={completeReferralTaskMutate}
        />
      )}
    </div>
  );
};

export default Tasker;
