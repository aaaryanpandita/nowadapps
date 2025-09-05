import { formatNice } from "coin-format";
import airDropAbi from "@/abi/air-drop.json";
import stakingAbi from "@/abi/staking.json";

export const social = {
  TWITTER: "https://x.com/Nowatoken",
  INSTAGRAM: "https://www.instagram.com/nowatoken",
  TELEGRAM: "https://t.me/nowatoken",
};

export const STAKING_CONTRACT_ADDRESS =
  "0x487BD24bb2FfdB5C89fbb0401dCC6dA90665DFC5";
export const AIRDROP_CONTRACT_ADDRESS =
  "0x96175709B0AF4fB9e4F204c8dd7D92Fdb86Dd02D";
export const NOWA_TOKEN = {
  address: "0xF3e21B3D39E55fd5515F0a26a664fEE2F4d62eE2",
};

export const abi = {
  AIRDROP_ABI: airDropAbi,
  STAKING_ABI: stakingAbi,
};

export const formatCurrency = ({ value, symbol }) => {
  return `${formatNice(value || "0")} ${symbol ? symbol : ""}`;
};

export const appConfigurationsMainNet = [
  {
    rpc: "https://data-seed-prebsc-1-s1.bnbchain.org:8545/",
    explorerName: "BscScan",
    explorerUrl: "https://testnet.bscscan.com/",
    chainId: 97,
    chainName: "BNB Smart Chain Testnet",
    nativeCurrency: {
      decimals: 18,
      name: "BNB",
      symbol: "tBNB",
    },
    multicall3Address: "0xca11bde05977b3631167028862be2a173976ca11",
  },
];

export const ChainConfig = appConfigurationsMainNet.map((config) => ({
  id: config.chainId,
  name: config.chainName,
  network: config.chainName,
  iconUrl: config.iconUrl ? config.iconUrl : undefined,
  nativeCurrency: config.nativeCurrency,
  rpcUrls: {
    public: { http: [config.rpc] },
    default: { http: [config.rpc] },
  },
  blockExplorers: {
    etherscan: {
      name: config.explorerName,
      url: config.explorerUrl,
    },
    default: {
      name: config.explorerName,
      url: config.explorerUrl,
    },
  },
  contracts: {
    multicall3: {
      address: config.multicall3Address,
      blockCreated: config.blockCreated,
    },
  },
}));

export const SECRET_KEY_STAGE = "6LdcDb0rAAAAAG-UEazZgPI5YkgvZfF_X0RLbrxs";
