import React from "react";
import Container from "../misc/container";
import NightingaleChart from "../misc/nightingale-chart";

const ChartSection = () => {
  return (
    <Container>
      <div className="w-full h-full grid grid-cols-12">
        <div className="col-span-12 lg:col-span-6 ">
          <NightingaleChart />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          {cardData?.map((item, idx) => {
            return (
              <div
                className="backdrop-blur-3xl bg-white/10 p-3 px-4 border-l-brand border-l-4 rounded-l-sm"
                key={idx}
              >
                <div className="w-full flex flex-row justify-between ">
                  <p>{item?.label}</p>
                  <p>Amount</p>
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

const cardData = [
  {
    label: "11% Team",
    subLabel: "12 months cliff, 28 months vesting",
    amount: "5 500 000",
  },
  {
    label: "11% Team",
    subLabel: "12 months cliff, 28 months vesting",
    amount: "5 500 000",
  },
  {
    label: "11% Team",
    subLabel: "12 months cliff, 28 months vesting",
    amount: "5 500 000",
  },
  {
    label: "11% Team",
    subLabel: "12 months cliff, 28 months vesting",
    amount: "5 500 000",
  },
  {
    label: "11% Team",
    subLabel: "12 months cliff, 28 months vesting",
    amount: "5 500 000",
  },
  {
    label: "11% Team",
    subLabel: "12 months cliff, 28 months vesting",
    amount: "5 500 000",
  },
];
