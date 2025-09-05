import React from "react";
import Modal from "../misc/modal";
import { Loader2 } from "lucide-react";

const Loader = ({ open }) => {
  return (
    <Modal open={open} close={() => {}}>
      <div className="relative min-w-lg flex items-center flex-col justify-center">
        <Loader2 />
      </div>
    </Modal>
  );
};

export default Loader;
