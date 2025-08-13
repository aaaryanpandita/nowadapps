import React from "react";
import Container from "../misc/container";
import NightingaleChart from "../misc/nightingale-chart";
import { formatNice } from "coin-format";
import { cn } from "@/lib/utils";

const ChartSection = () => {
  return (
    <Container>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-4xl font-semibold mb-4 text-black dark:text-white ">
          Powering the <span className="text-brand">Future</span> of Our
          Ecosystem
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-2xl max-w-sm">
          How our token fuels innovation, rewards holders, and sustains
          long-term value.
        </p>
      </div>
      <div className="w-full h-full grid grid-cols-12">
        <div className="col-span-12 lg:col-span-6 min-h-96 lg:min-h-auto ">
          <NightingaleChart cardData={cardData} />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          {cardData?.map((item, idx) => {
            return (
              <div
                key={idx}
                className={cn(
                  "backdrop-blur-3xl bg-white/10 p-3 px-4  border-l-4 rounded-l-sm hover:scale-105 transition-all delay-150 duration-150 ease-linear cursor-pointer",
                  item?.border
                )}
              >
                <div className="w-full flex flex-row justify-between ">
                  <p>{item?.label}</p>
                  <p>Total Tokens</p>
                </div>
                <div className="w-full flex flex-row justify-between ">
                  <p>{item?.subLabel}</p>
                  <p>{item?.amount}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default ChartSection;

const total_supply = 10000000000;

const cardData = [
  {
    label: "Airdrop",
    subLabel: "50%",
    amount: total_supply * (50 / 100),
    color: "#B8FFE7",
    border: "border-l-[#B8FFE7]",
  },
  {
    label: "Community Rewards",
    subLabel: "7.5%",
    amount: total_supply * (7.5 / 100),
    color: "#8AFFD8",
    border: "border-l-[#8AFFD8]",
  },
  {
    label: "Liquidity",
    subLabel: "5%",
    amount: total_supply * (5 / 100),
    color: "#5CFFC9",
    border: "border-l-[#5CFFC9]",
  },
  {
    label: "Team",
    subLabel: "5%",
    amount: total_supply * (5 / 100),
    color: "#2EFFB9",
    border: "border-l-[#2EFFB9]",
  },
  {
    label: "Flash Sale",
    subLabel: "2.5%",
    amount: total_supply * (2.5 / 100),
    color: "#00FFA9",
    border: "border-l-[#00FFA9]",
  },
  {
    label: "Staking Rewards",
    subLabel: "15%",
    amount: total_supply * (15 / 100),
    color: "#00D18B",
    border: "border-l-[#00D18B]",
  },
  {
    label: "Ecosystem Funds",
    subLabel: "15%",
    amount: total_supply * (15 / 100),
    color: "#00A36D",
    border: "border-l-[#00A36D]",
  },
];
