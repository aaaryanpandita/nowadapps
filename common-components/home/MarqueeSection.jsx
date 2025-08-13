import React from "react";
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
const secondRow = reviews.slice(reviews.length / 2);
const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border"
        // light styles
        // "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        // "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="object-contain h-6 w-full" alt="" src={img} />
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const MarqueeSection = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div> */}
    </div>
  );
};

export default MarqueeSection;
