"use client";
import { IconShare, IconX } from "@tabler/icons-react";
import React from "react";
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

const share_url = "http://github.com";

const SocialShareModal = ({ open, close, clickHandler }) => {
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
            value={"nowa_18fd2f13dcc"}
            className="w-full outline-0 h-10 text-brand"
          />
          <CopyToClipboard text={"nowa_18fd2f13dcc"}>
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
