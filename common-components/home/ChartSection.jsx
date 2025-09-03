import React from "react";
import Container from "../misc/container";
import NightingaleChart from "../misc/nightingale-chart";
import { formatNice } from "coin-format";
import { cn } from "@/lib/utils";

const ChartSection = () => {
  const contractAddress = "0xf3e21b3d39e55fd5515f0a26a664fee2f4d62ee2";
  const bscScanUrl = `https://bscscan.com/token/${contractAddress}`;

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 text-center mb-12">
        <h2 className="text-4xl font-semibold mb-4 text-black dark:text-white">
          Designed for Community <span className="text-brand">Success</span>
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-2xl mx-auto max-w-2xl">
          How our token fuels innovation, rewards holders, and sustains
          long-term value.
        </p>
      </div>
      <div className="w-full h-full grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 lg:col-span-6 min-h-96 lg:min-h-auto">
          <NightingaleChart cardData={cardData} />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4 justify-center">
          {/* Contract Address Box */}

          {/* Distribution Cards */}
          {cardData?.map((item, idx) => {
            return (
              <div
                key={idx}
                className={cn(
                  "backdrop-blur-3xl bg-white/10 p-4 px-5 border-l-4 rounded-l-sm hover:scale-105 transition-all delay-150 duration-150 ease-linear cursor-pointer",
                  item?.border
                )}
              >
                <div className="w-full">
                  <p className="font-medium text-white text-sm mb-1">
                    {item?.label}
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {item?.subLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contract Address Box - Bottom Section */}
      <div className="max-w-4xl mx-auto mt-12">
        <a
          href={bscScanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="bg-black border-2 border-green-600/60 rounded-lg p-6 hover:bg-gray-900 transition-all duration-200 cursor-pointer">
            <div className="text-center">
              <p className="text-white text-lg mb-3">
                NOWA <span className="text-brand">ADDRESS</span>
              </p>
              <p className="text-white font-mono text-sm break-all">
                {contractAddress}
              </p>
            </div>
          </div>
        </a>
      </div>
    </Container>
  );
};

export default ChartSection;

const total_supply = 10000000000;

// Fixed distribution - percentages now add up to exactly 100%
const cardData = [
  {
    label: "Community(Airdrops, staking, rewards)",
    subLabel: "77.5%",
    amount: total_supply * (77.5 / 100),
    color: "#FF00D4",
    border: "border-l-[#FF00D4]",
  },
  {
    label: "Development & Marketing",
    subLabel: "10%",
    amount: total_supply * (10 / 100),
    color: "#FF2A00",
    border: "border-l-[#FF2A00]",
  },
  {
    label: "Liquidity & Exchange Listings",
    subLabel: "7.5%",
    amount: total_supply * (7.5 / 100),
    color: "#AA00FF",
    border: "border-l-[#AA00FF]",
  },
  {
    label: "Ecosystem Reserve",
    subLabel: "5%",
    amount: total_supply * (5 / 100),
    color: "#D4FF00",
    border: "border-l-[#D4FF00]",
  },
];
