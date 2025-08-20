import React, { useEffect, useState } from "react";
import Modal from "../misc/modal";
import { DialogTitle } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import { ArrowRight, Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { connectWallet } from "@/queries";
import { useAccount } from "wagmi";

const ParentRefModal = ({ open, close }) => {
  const [refCode, setRefCode] = useState("");
  const searchParams = useSearchParams();
  const { address, isConnected } = useAccount();
  const {
    mutateAsync: mutateConnectWallet,
    isPending: mutateConnectWalletPending,
  } = useMutation({
    mutationFn: () => {
      return connectWallet({
        walletAddress: address,
        parentReferralCode: refCode,
      });
    },
    onSuccess: (data) => {
      if (data?.data?.responseCode == 200) {
        const token = data?.data?.result?.token;
      }
    },
    onError: (err) => {
      console.log(err, "Error connect wallet");
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const parentRefCode = params.get("parent_ref_code");
    if (parentRefCode) {
      setRefCode(parentRefCode);
    }
  }, [searchParams]);

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
        <p className="font-medium text-2xl">Enter Referral Code</p>
        <input
          type="text"
          value={refCode}
          className="border-2 border-brand border-dotted outline-0 rounded-3xl h-12 w-96 text-brand px-4"
          onChange={(e) => {
            const { value } = e?.target || {};
            setRefCode(value);
          }}
        />
        <button
          className="bg-brand flex flex-row  w-40 h-12 rounded-3xl justify-between items-center px-7  text-black "
          onClick={() => {
            if (mutateConnectWalletPending || !refCode) {
              return;
            }
            mutateConnectWallet();
          }}
        >
          <p>Submit</p>
          <div className="bg-black/20 rounded text-black/50">
            {mutateConnectWalletPending ? <Loader /> : <ArrowRight />}
          </div>
        </button>
      </div>
    </Modal>
  );
};

export default ParentRefModal;
