import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Cross } from "lucide-react";
import { IconX } from "@tabler/icons-react";

const Modal = ({ open, close, children }) => {
  return (
    <Dialog
      open={open}
      //   onClose={() => setOpen(false)}
      onClose={() => {}}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-300 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="space-y-4 bg-modal-bg p-12   duration-300 ease-out data-closed:scale-95 data-closed:opacity-0 relative border border-[#161D26] rounded-2xl"
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
