"use client";

import React, { useEffect, useState } from "react";
import Modal from "../misc/modal";
import { DialogTitle } from "@headlessui/react";
import {
  IconBrandInstagram,
  IconBrandTelegram,
  IconX,
} from "@tabler/icons-react";
import { ArrowRight, Check, XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { connectWallet, taskCompleted } from "@/queries";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../globals/loader";

const ReferralModal = ({ open, close, setModalState }) => {
  const [socialStates, setSocialStates] = useState(social);
  const {
    mutateAsync: taskCompletedMutate,
    isPending: taskCompletedMutatePending,
  } = useMutation({
    mutationFn: () => {
      return taskCompleted({
        taskType: "social",
        socialTasksCompleted: true,
      });
    },
    onSuccess: (data) => {
      if (data?.data?.responseCode == 200) {
        setModalState((p) => {
          return {
            parentRefModal: false,
            referralModal: false,
            shareModal: true,
            dailyTaskModal: false,
            socialShareModal: false,
          };
        });
      }
    },
  });

  useEffect(() => {
    if (!taskCompletedMutatePending) {
      if (socialStates?.every((i) => i?.status)) {
        taskCompletedMutate();
      }
    }
  }, [socialStates]);

  if (taskCompletedMutatePending) {
    return <Loader open={taskCompletedMutatePending} />;
  }

  return (
    <Modal open={open} close={close}>
      <div className="  relative md:w-2xl flex items-center flex-col md:gap-6">
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
        <p className="font-medium text-2xl">Activate</p>
        <p>
          To activate your NOWA account and start earning, simply follow us on X
          (Twitter), join our Telegram community, follow us on Instagram. Once
          all these tasks are completed, a unique referral link will be
          automatically generated for you. Share this referral link with your
          friends and community — every time someone joins using your link and
          activates their account, you’ll earn NOWA tokens as a reward.
        </p>
        <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-0 mt-4 md:mt-0 ">
          {socialStates?.map((item, idx) => {
            return (
              <Link
                href={item?.href}
                target="_blank"
                onClick={() => {
                  const newState = socialStates?.map((it) => {
                    if (it?.text == item?.text) {
                      return { ...it, status: true };
                    }
                    return it;
                  });
                  setSocialStates(newState);
                }}
                key={idx}
              >
                <button className="bg-brand flex flex-row h-12 rounded-3xl justify-between items-center px-7  text-black gap-2 cursor-pointer">
                  <p className="text-xs font-medium">{item?.text}</p>
                  <div className="bg-black/20 rounded text-black/50 p-0.5">
                    {item?.status ? <Check /> : <item.icon />}
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

export default ReferralModal;

const social = [
  {
    text: "JOIN TELEGRAM",
    icon: IconBrandTelegram,
    href: "https://t.me/nowatoken",
    status: false,
  },
  {
    text: "FOLLOW ON X",
    icon: XIcon,
    href: "https://www.instagram.com/nowatoken",
    status: false,
  },
  {
    text: "FOLLOW ON INSTAGRAM",
    icon: IconBrandInstagram,
    href: "https://www.instagram.com/nowatoken",
    status: false,
  },
];
