import { IconShare, IconX } from "@tabler/icons-react";
import React from "react";
import Modal from "../misc/modal";

const ShareModal = ({ open, close, setModalState }) => {
  return (
    <Modal open={open} close={() => {}}>
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
        <p className="font-medium text-2xl">Share with Friends</p>

        <div className="flex flex-row gap-4">
          <div className="w-full flex flex-row border border-brand border-dotted p-1 pl-4 rounded-4xl">
            <input
              type="text"
              value={"nowa_18fd2f13dcc"}
              className="w-full outline-0 h-10 text-brand"
            />
            <button className="bg-brand w-28 rounded-4xl text-black cursor-pointer">
              Copy
            </button>
          </div>
          <button
            className="flex bg-brand flex-row items-center justify-center gap-4 px-4 rounded-4xl text-black cursor-pointer"
            onClick={() => {
              setModalState((p) => {
                return {
                  ...p,
                  socialShareModal: true,
                };
              });
            }}
          >
            <p>Share</p>
            <IconShare />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
