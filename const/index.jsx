import { formatNice } from "coin-format";
import airDropAbi from "@/abi/air-drop.json";
import stakingAbi from "@/abi/staking.json";

export const social = {
  TWITTER: "https://x.com/Nowatoken",
  INSTAGRAM: "https://www.instagram.com/nowatoken",
  TELEGRAM: "https://t.me/nowatoken",
};

export const STAKING_CONTRACT_ADDRESS =
  "0xD87a7c492597de7Fa36932250aC90331Da3Eb747";
export const AIRDROP_CONTRACT_ADDRESS =
  "0x3c62CA014f18d1Af2F01B68c65D178561148dc4a";
export const NOWA_TOKEN = {
  address: "0xe4D48923cf6DD9Cfd201848a88D1F673e4753dC2",
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

export const SECRET_KEY_STAGE = "6Lfvma8rAAAAAHNtNJ9JrBoBiqQhHGybXKX7Pf_E";
