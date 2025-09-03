import React from "react";
import AboutCard from "../misc/about-card";
import FallingText from "@/components/FallingText/FallingText";

const AboutSection = () => {
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="max-w-7xl w-full grid grid-cols-12 md:grid-rows-12  md:h-[1200px] gap-4 ">
        <div className="col-span-12 md:col-span-8 md:row-span-2 text-4xl font-semibold">
          Harness the power of <span className="text-brand"> AI</span> to
          forecast the market. Challenge the{" "}
          <span className="text-brand">algorithm</span>, outperform it, and{" "}
          <span className="text-brand">earn rewards</span>.{" "}
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
              <p className="text-white/60 text-sm">
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
                Claim Your Airdrop
                <br />
              </p>
              <p className="text-white/60 text-sm">
                Get 20,000 NOW tokens (Phase 1)
              </p>
              <p className="text-white/60 text-sm">
                Tokens auto-stake at 10% APY
              </p>
              <p className="text-white/60 text-sm">
                Cost: 0.00065 BNB (cheaper than a candy bar)
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
                Start Winning
              </p>
              <p className="text-white/60 text-sm">
               Make informed trading decisions
              </p>
              <p className="text-white/60 text-sm">
               Participate in prediction contests
              </p>
              <p className="text-white/60 text-sm">
               Earn rewards for accuracy
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
              <p> Access Beta Platform</p>

              <p className="text-white/60 text-sm">
                Real-time market intelligence - User-friendly dashboard
              </p>
              <p className="text-white/60 text-sm">
                Real-time market intelligence
              </p>
              <p className="text-white/60 text-sm">User-friendly dashboard</p>
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
              <p className="text-white/60 text-sm">
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
