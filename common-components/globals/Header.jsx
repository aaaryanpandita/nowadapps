"use client";
import { useAppKit } from "@reown/appkit/react";
import { IconWallet } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";

const NavbarStyled = () => {
  const { open } = useAppKit();
  const { isConnected } = useAccount();

  return (
    <div className="absolute top-6 bg-sub-card z-50 w-full ">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <img
            src="/assets/brand/Nowa logo horizonatal.svg"
            alt=""
            className="object-contain h-16 cursor-pointer"
          />
        </Link>
        {isConnected ? (
          <div className="flex flex-row gap-4 items-center">
            <Link href={"/dashboard"}>
              <p className="cursor-pointer hover:underline">
                Referral Dashboard
              </p>
            </Link>
            <appkit-button />
          </div>
        ) : (
          <button
            className="bg-brand text-black flex flex-row gap-2 h-12 items-center justify-center w-52 rounded-4xl cursor-pointer"
            onClick={open}
          >
            <IconWallet />
            <p> Connect Wallet</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default NavbarStyled;
