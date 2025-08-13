import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export function MacBookScrollSection() {
  return (
    <div className="w-full overflow-hidden bg-brand-background">
      <MacbookScroll
        title={
          <span className="text-4xl font-semibold">
            The Tools You Need to <span className="text-brand">Outperform</span>{" "}
            the Market.
          </span>
        }
        // badge={
        //   <a href="https://peerlist.io/manuarora">
        //     <Badge className="h-10 w-10 -rotate-12 transform" />
        //   </a>
        // }
        src={`assets/mac/linear.png`}
        showGradient={false}
      />
    </div>
  );
}
