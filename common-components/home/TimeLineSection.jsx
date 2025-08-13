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
          <li>1. Token Launch on BSC</li>
          <li>2. Airdrop & Staking Program Live</li>
          <li>3. AI Prediction Engine (Beta)</li>
        </ol>
      </div>
    ),
  },
  {
    title: "02",
    content: (
      <div>
        <p className="mb-8 text-4xl font-semibold dark:text-neutral-200">
          Phase 2 – Gamification
        </p>
        <ol className="text-2xl">
          <li>1. Launch of "Beat the AI" Mode</li>
          <li>2. Global Leaderboards & Competitions</li>
          <li>3. Mobile App Beta Testing</li>
        </ol>
      </div>
    ),
  },
  {
    title: "03",
    content: (
      <div>
        <p className="mb-8 text-4xl font-semibold dark:text-neutral-200">
          Phase 3 – Growth & Expansion
        </p>
        <ol className="text-2xl">
          <li>1. Multi-Chain Integration</li>
          <li>2. AI Model 2.0 with Self-Learning</li>
          <li>3. Strategic Exchange Listings</li>
          <li>3. Global Marketing Campaigns</li>
        </ol>
      </div>
    ),
  },
  {
    title: "04",
    content: (
      <div>
        <p className="mb-8 text-4xl font-semibold dark:text-neutral-200">
          Phase 4 – Ecosystem Development
        </p>
        <ol className="text-2xl">
          <li>1. Multi-Chain Integration</li>
          <li>2. AI Model 2.0 with Self-Learning</li>
          <li>3. Strategic Exchange Listings</li>
          <li>3. Global Marketing Campaigns</li>
        </ol>
      </div>
    ),
  },
];
