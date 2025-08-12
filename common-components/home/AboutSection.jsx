import React from "react";
import AboutCard from "../misc/about-card";
import FallingText from "@/components/FallingText/FallingText";

const AboutSection = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-12 md:grid-rows-12  md:h-[1200px] gap-4 ">
        <div className="col-span-12 md:col-span-8 md:row-span-2 text-4xl font-semibold">
          Harness the power of AI to forecast the market. Challenge the
          algorithm, outperform it, and earn rewards.{" "}
        </div>
        <div className="col-span-12 md:col-span-4 md:row-span-7 text-2xl ">
          <AboutCard>
            <div className="flex p-6 flex-col gap-2 justify-between items-start h-full">
              <img
                src="/assets/about/h3.avif"
                alt=""
                className="object-contain w-full h-[100%]"
              />
              <p>Gamified Competitions</p>
              <p className="text-white/60 text-xl">
                Participate in daily, weekly, and monthly contests with
                leaderboard rankings.
              </p>
            </div>
          </AboutCard>
        </div>
        <div className="md:row-start-3 col-span-12 md:col-span-4 row-span-4 text-2xl">
          <AboutCard>
            <div className="flex p-6 flex-col gap-2">
              <img
                src="/assets/about/h1.avif"
                alt=""
                className="object-contain w-full"
              />
              <p>
                Airdrop + Staking <br /> Rewards
              </p>
              <p className="text-white/60 text-xl">
                Earn passive income while holding NOW tokens.
              </p>
            </div>
          </AboutCard>
        </div>
        <div className="md:row-start-5 col-span-12 md:col-span-4 md:row-span-4 text-2xl">
          <AboutCard>
            <div className="flex p-6 flex-col gap-2">
              <img
                src="/assets/about/h2.avif"
                alt=""
                className="object-contain w-full"
              />
              <p>
                AI-Driven Price <br /> Predictions
              </p>
              <p className="text-white/60 text-xl">
                Generate high-quality visuals matched to your style.
              </p>
            </div>
          </AboutCard>
        </div>
        <div className="col-span-12 md:col-span-4 md:row-span-2 text-2xl hidden md:flex"></div>
        <div className="md:col-start-2 col-span-12 md:col-span-3 md:row-span-4 bg-brand/40 text-2xl p-4 rounded-2xl">
          <p>We are suitable for</p>
          <FallingText
            text={`Transparency Accuracy Community-Driven Global-React Decentralized Governance`}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="1.4rem"
            mouseConstraintStiffness={0.9}
          />
        </div>
        <div className="col-span-12 md:col-span-4 md:row-span-3  text-2xl">
          <AboutCard>
            <div className="flex p-6 flex-col gap-2">
              <img
                src="/assets/about/h4.avif"
                alt=""
                className="object-contain w-full"
              />
              <p>Beat the AI Challenge</p>
              <p className="text-white/60 text-xl">
                Test your skills against our AI in real-time and earn rewards
                when you outperform it.
              </p>
            </div>
          </AboutCard>
        </div>
        <div className="col-span-12 md:col-span-4 md:row-span-4  text-2xl">
          <AboutCard>
            <div className="flex p-6 flex-col gap-2">
              <img
                src="/assets/about/h5.avif"
                alt=""
                className="object-contain w-full"
              />
              <p>BSC-Powered Efficiency</p>
              <p className="text-white/60 text-xl">
                Enjoy low fees, high speed, and secure transactions.
              </p>
            </div>
          </AboutCard>
        </div>
        <div className="col-span-12 md:col-span-4 md:row-span-2 text-2xl hidden md:flex"></div>
        <div className="col-span-12 md:col-span-4 md:row-span-2 text-2xl">
          Nowa is the most intelligent and interactive crypto prediction
          ecosystem, empowering traders to make better decisions and earn
          rewards in the process.
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
