import { BackgroundGradient } from "@/components/ui/background-gradient";
import { completeDailyTask, useDailyTasksUsers } from "@/queries";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, Loader } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const DailyTask = ({ dailyTaskRefetch: dailyTaskRefetchExternal }) => {
  const { address } = useAccount();
  const [currentTaskID, setCurrentTaskID] = useState("");
  const {
    data: dailyTask,
    isPending: dailyTaskPending,
    refetch: dailyTaskRefetch,
  } = useDailyTasksUsers({
    walletAddress: address,
  });

  const { mutateAsync: completeTask, isPending: completeTaskPending } =
    useMutation({
      mutationFn: ({ id }) => {
        return completeDailyTask({
          isCompleted: true,
          taskId: id,
          walletAddress: address,
        });
      },
      onSuccess: async (data) => {
        await dailyTaskRefetch();
        await dailyTaskRefetchExternal();
        if (data?.data?.responseCode == 200) {
          toast.success(data?.data?.responseMessage);
        } else {
          toast.error(data?.data?.responseMessage);
        }
      },
    });

  return (
    <div className="col-span-12 lg:col-span-6  relative mt-8 lg:mt-0 ">
      <BackgroundGradient className="grid grid-cols-12  w-full bg-[#161D26]  gap-4 p-6 shadow-[0px_0px_7.6px_7px_rgba(100,231,158,0.25)] rounded-2xl">
        {dailyTaskPending && (
          <div className="col-span-12 flex justify-center items-center flex-col h-96 gap-2">
            <Loader size={30} />
            <p className="text-2xl ">Getting Data</p>
          </div>
        )}
        {!dailyTaskPending && (
          <div className="col-span-12 flex justify-center items-center flex-col ">
            <p className="text-4xl font-semibold">Daily Task</p>
            <div className="w-full mt-8  py-10 flex flex-col justify-between gap-20">
              <div className="w-full flex flex-col gap-4 max-h-96 overflow-auto">
                {dailyTask?.tasks?.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="bg-[#030705] flex flex-row justify-between items-center p-4 px-4 rounded-xl"
                      onClick={() => {
                        setCurrentTaskID(item?.id);
                        completeTask({ id: item?.id });
                      }}
                    >
                      <div>
                        <p className="font-semibold"> {item?.title}</p>
                        <p className="text-sm"> {item?.description}</p>
                      </div>
                      <Link href={item?.link || "#"} target="_blank">
                        <div className="bg-[#00FFA933] p-0.5 rounded-sm">
                          {currentTaskID == item?.id && completeTaskPending ? (
                            <Loader />
                          ) : (
                            <>
                              {item?.isCompleted ? (
                                <Check color="#00FFA9" />
                              ) : (
                                <ArrowRight color="#00FFA9" />
                              )}
                            </>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </BackgroundGradient>
    </div>
  );
};

export default DailyTask;
