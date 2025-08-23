"use client";
import { IconShare, IconX } from "@tabler/icons-react";
import React, { useMemo } from "react";
import Modal from "../misc/modal";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAccount } from "wagmi";
import Loader from "../globals/loader";
import { useConnectWallet } from "@/queries";

const SocialShareModal = ({ open, close, clickHandler }) => {
  const { address } = useAccount();
  const { data: userData, isLoading: userDataLoading } = useConnectWallet({
    walletAddress: address,
  });

  const share_url = useMemo(() => {
    let hostname = "";
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      hostname = `${url.protocol}//${url.host}`;
    }

    return `${hostname}?parent_ref_code=${userData?.referralCode}`;
  }, [userData]);

  return (
    <Modal open={open} close={() => {}}>
      <div className="  relative min-w-md flex items-start flex-col gap-6">
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
        <p className="font-medium text-2xl">Share on socials</p>
        <div className="w-full h-[1px] bg-gray-400" />
        <div className="flex flex-row gap-6">
          <WhatsappShareButton
            url={share_url}
            className="flex items-center flex-col"
            onClick={() => {
              if (clickHandler) {
                clickHandler();
              }
            }}
          >
            <WhatsappIcon size={42} round={true} />
            <p>Whatsapp</p>
          </WhatsappShareButton>
          <TelegramShareButton
            url={share_url}
            className="flex items-center flex-col"
            onClick={() => {
              if (clickHandler) {
                clickHandler();
              }
            }}
          >
            <TelegramIcon size={42} round={true} />
            <p>Telegram</p>
          </TelegramShareButton>
          <TwitterShareButton
            url={share_url}
            className="flex items-center flex-col"
            onClick={() => {
              if (clickHandler) {
                clickHandler();
              }
            }}
          >
            <TwitterIcon size={42} round={true} />
            <p>Twitter</p>
          </TwitterShareButton>
          <FacebookShareButton
            url={share_url}
            className="flex items-center flex-col"
            onClick={() => {
              if (clickHandler) {
                clickHandler();
              }
            }}
          >
            <FacebookIcon size={42} round={true} />
            <p>Facebook</p>
          </FacebookShareButton>
        </div>
        <div className="w-full flex flex-row border border-brand border-dotted p-1 pl-4 rounded-4xl">
          <input
            type="text"
            value={share_url}
            className="w-full outline-0 h-10 text-brand"
          />
          <CopyToClipboard text={share_url}>
            <button className="bg-brand w-28 rounded-4xl text-black cursor-pointer">
              Copy
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </Modal>
  );
};

export default SocialShareModal;
