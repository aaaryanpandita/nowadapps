"use client";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { IconWallet, IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAccount } from "wagmi";

const NavbarStyled = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="absolute top-6 bg-sub-card z-50 w-full">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link href={"/"}>
          <img
            src="/assets/brand/Nowa logo horizonatal.svg"
            alt="Nowa Logo"
            className="object-contain h-16 cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {isConnected ? (
            <>
              <Link href={"/dashboard"}>
                <p className="cursor-pointer hover:underline">
                  Referral Dashboard
                </p>
              </Link>
              <ConnectButton />
            </>
          ) : (
            <button
              className="bg-brand text-black flex gap-2 h-12 items-center justify-center px-4 rounded-4xl cursor-pointer"
              onClick={openConnectModal}
            >
              <IconWallet />
              <p>Connect Wallet</p>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md focus:outline-none"
          >
            {menuOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-sub-card border-t border-gray-700 bg-black">
          <div className="flex flex-col p-4 gap-4">
            {isConnected ? (
              <>
                <Link
                  href={"/dashboard"}
                  onClick={() => setMenuOpen(false)}
                  className="hover:underline"
                >
                  Referral Dashboard
                </Link>
                <ConnectButton />
              </>
            ) : (
              <button
                className="bg-brand text-black flex gap-2 h-12 items-center justify-center px-4 rounded-4xl cursor-pointer"
                onClick={() => {
                  openConnectModal();
                  setMenuOpen(false);
                }}
              >
                <IconWallet />
                <p>Connect Wallet</p>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarStyled;
