"use client";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { arbitrum, mainnet, bsc, bscTestnet } from "viem/chains";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  cookieStorage,
  cookieToInitialState,
  createStorage,
  WagmiProvider,
} from "wagmi";

export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "38f6cbdcf2b580899317454c1ff8a4d4";
export const networks = [bsc, bscTestnet];
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

const metadata = {
  name: "next-reown-appkit",
  description: "next-reown-appkit",
  // url: "https://github.com/0xonerb/next-reown-appkit-ssr", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  themeMode: "dark",

  features: {
    analytics: true,
    email: false,
    socials: [],
    swaps: false,
    pay: false,
    send: false,
    walletFeaturesOrder: ["receive" | "onramp" | "swaps" | "send"],
  },
  themeVariables: {
    "--w3m-accent": "#000000",
  },
});

const BlockChainWrapper = ({ children, cookies }) => {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      {children}
    </WagmiProvider>
  );
};

export default BlockChainWrapper;
