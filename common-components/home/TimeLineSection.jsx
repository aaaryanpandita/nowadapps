import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimeLineSection() {
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
const data = [
  {
    title: "01",
    content: (
      <div>
        <p className="mb-8 text-4xl font-semibold dark:text-neutral-200">
          Phase 1 – Foundation
        </p>
        <ol className="text-2xl">
          <li> 4-phase airdrop campaign</li>
          <li> Beta dApp launch with 50 asset predictions</li>
          <li> Prediction mining protocol activation</li>
          <li> Community staking gateway</li>
          <li> ICO launch for broader participation</li>
        </ol>
      </div>
    ),
  },
  {
    title: "02",
    content: (
      <div>
        <p className="mb-8 text-4xl font-semibold dark:text-neutral-200">
          Phase 2 – Scale
        </p>
        <ol className="text-2xl">
          <li> Expansion to 500+ cryptocurrency predictions</li>
          <li> AI yield engine deployment</li>
          <li> Advanced analytics dashboard</li>
          <li> Major exchange listings</li>
          <li> Governance framework beta</li>
        </ol>
      </div>
    ),
  },
  {
    title: "03",
    content: (
      <div>
        <p className="mb-8 text-4xl font-semibold dark:text-neutral-200">
          Phase 3 – Growth 
        </p>
        <ol className="text-2xl">
          <li> Cross-chain protocol integration</li>
          <li> Mobile application launch</li>
          <li> Prediction tournament system</li>
          <li> Strategic DeFi partnerships</li>
          <li> Global marketing acceleration</li>
        </ol>
      </div>
    ),
  },
  {
    title: "04",
    content: (
      <div>
        <p className="mb-8 text-4xl font-semibold dark:text-neutral-200">
          Phase 4 – Expansion
        </p>
        <ol className="text-2xl">
          <li> Multi-asset predictions (stocks, forex, commodities)</li>
          <li> AI financial assistant features</li>
          <li> Enterprise API offerings</li>
          <li> International market penetration</li>
        </ol>
      </div>
    ),
  },

];
