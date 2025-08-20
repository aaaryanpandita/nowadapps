import React, { useEffect, useMemo, useState } from "react";
import Modal from "../misc/modal";
import { DialogTitle } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import { ArrowRight, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import {
  completeDailyTask,
  useDailyTasksUsers,
  useGetUserByWallet,
} from "@/queries";
import Loader from "../globals/loader";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

const DailyTaskModal = ({ open, close }) => {
  const { address, isConnected } = useAccount();
  const { data: userData, isPending: userDataPending } =
    useGetUserByWallet(address);
  const [currentId, setCurrentId] = useState("");
  const {
    data: dailyTaskData,
    isPending: dailyTaskDataPending,
    refetch: dailyTaskDataRefetch,
  } = useDailyTasksUsers(address);

  const {
    mutateAsync: completeDailyTaskMutate,
    isPending: completeDailyTaskMutatePending,
  } = useMutation({
    mutationFn: ({ taskId }) => {
      return completeDailyTask({ taskId });
    },
    onSuccess: (data) => {
      if (data?.data?.responseCode == 200) {
        dailyTaskDataRefetch();
      }
    },
  });

  const shouldShowCross = useMemo(() => {
    return dailyTaskData?.every((item) => item?.isCompleted);
  }, [dailyTaskData]);

  if (shouldShowCross) {
    return <></>;
  }

  if (userData?.result?.isUserNew) {
    return <></>;
  }

  if (!isConnected) {
    return <></>;
  }

  if (dailyTaskDataPending || userDataPending) {
    return <Loader open={true} />;
  }

  return (
    <Modal open={open} close={() => {}}>
      <div className="  relative min-w-lg flex items-center flex-col gap-14">
        {shouldShowCross && (
          <div className="absolute -right-10 -top-10 cursor-pointer">
            <IconX
              onClick={() => {
                if (close) {
                  close();
                }
              }}
            />
          </div>
        )}
        <p className="font-medium text-2xl">Daily Task</p>

        <div className="flex flex-col gap-4 w-full">
          {dailyTaskData?.map((item, idx) => {
            return (
              <Link
                href={item?.isCompleted ? "#" : item?.link}
                target={item?.isCompleted ? "_self" : "_blank"}
                onClick={() => {
                  if (!item?.isCompleted) {
                    setCurrentId(item?.id);
                    completeDailyTaskMutate({ taskId: item?.id });
                  }
                }}
              >
                <button
                  key={idx}
                  className="bg-brand flex flex-row w-full rounded-3xl justify-between items-center px-7  text-black py-2"
                >
                  <div className="flex item-start text-start flex-col w-full ">
                    <p>{item?.title}</p>
                    <p className="text-sm">{item?.description}</p>
                  </div>
                  <div className="bg-black/20 rounded text-black/50 p-1">
                    {item?.isCompleted ? (
                      <Check />
                    ) : (
                      <>
                        {currentId == item?.id &&
                        completeDailyTaskMutatePending ? (
                          <Loader />
                        ) : (
                          <ArrowRight />
                        )}
                      </>
                    )}
                  </div>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default DailyTaskModal;

const task = [
  {
    title: "Like Our Latest Post on X",
    subTitle: "Show your support by liking our latest tweet on X.",
    status: false,
  },
  {
    title: "Like Our Latest Post on X",
    subTitle: "Show your support by liking our latest tweet on X.",
    status: false,
  },
  {
    title: "Like Our Latest Post on X",
    subTitle: "Show your support by liking our latest tweet on X.",
    status: false,
  },
];
