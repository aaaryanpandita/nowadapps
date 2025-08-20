import React, { useEffect, useState } from "react";
import Modal from "../misc/modal";
import { DialogTitle } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

const DailyTaskModal = ({ open, close }) => {
  return (
    <Modal open={open} close={close}>
      <div className="  relative min-w-lg flex items-center flex-col gap-14">
        {close && (
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
          {task?.map((item, idx) => {
            return (
              <button
                key={idx}
                className="bg-brand flex flex-row w-full rounded-3xl justify-between items-center px-7  text-black py-2"
              >
                <div className="flex item-start text-start flex-col w-full ">
                  <p>{item?.title}</p>
                  <p>{item?.subTitle}</p>
                </div>
                <div className="bg-black/20 rounded text-black/50 p-1">
                  <ArrowRight />
                </div>
              </button>
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
