"use client";
import React, { Fragment } from "react";
import { createAppKit } from "@reown/appkit/react";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import { cookieStorage, createStorage } from "@wagmi/core";
import { bsc, bscTestnet } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { ChainConfig } from "@/const";

export const queryClient = new QueryClient();
const projectId = "9423e7846505f308df758d42e7c92ff7";
const metadata = {
  name: "NOWA",
  description: "NOWA DAPP",
  url: "https://nowadapps.vercel.app/",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};
// export const networks = [...ChainConfig]; /////Testnet
export const networks = [bscTestnet, bsc]; /////Testnet
// export const networks = [bsc]; /////Mainnet

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: networks,
  metadata: metadata,
  defaultNetwork: bscTestnet,
  features: {
    analytics: true,
    email: false,
    socials: [],
    swaps: false,
    pay: false,
    send: false,
    walletFeaturesOrder: ["receive" | "onramp" | "swaps" | "send"],
  },
});

const BlockchainProvider = ({ children, cookies }) => {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);
  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default BlockchainProvider;
