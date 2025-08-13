import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
const reviews = [
  {
    img: "https://avatar.vercel.sh/jack",
  },
  {
    img: "https://avatar.vercel.sh/jill",
  },
  {
    img: "https://avatar.vercel.sh/john",
  },
  {
    img: "https://avatar.vercel.sh/jane",
  },
  {
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    img: "https://avatar.vercel.sh/james",
  },
];
const secondRow = reviews;
const ReviewCard = ({ img }) => {
  return (
    <div className="flex flex-row items-center gap-2 w-64">
      <img className="object-contain h-6 w-full" alt="" src={img} />
    </div>
  );
};

const MarqueeSection = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden ">
      <Marquee pauseOnHover className="[--duration:10s]  w-full">
        {secondRow.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </Marquee>
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div> */}
    </div>
  );
};

export default MarqueeSection;
