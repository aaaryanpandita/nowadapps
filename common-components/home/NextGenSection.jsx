"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "../misc/container";
import { useInView } from "motion/react";
import clsx from "clsx";
import * as motion from "motion/react-client";

const NextGenSection = () => {
  const boxRef = useRef(null);
  const isInView = useInView(boxRef);

  return (
    <Container className={"bg-black pt-10"}>
      <div ref={boxRef}>
        <p className="text-4xl font-semibold">
          <span className="text-brand">NOWA</span> is a next-generation
          cryptocurrency platform built on the{" "}
          <span className="text-brand">Binance Smart Chain</span> that leverages{" "}
          <span className="text-brand">artificial intelligence</span> to deliver
          highly accurate price predictions for digital assets.
        </p>
        <div className="w-full grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 overflow-hidden ">
            <img
              src="/assets/next-gen/toplap.avif"
              alt=""
              className={clsx(
                `transition-all delay-0 duration-300 ease-linear relative ${
                  isInView ? "right-0" : "right-[600px]"
                } ${isInView ? "opacity-100" : "opacity-0"}`
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6 flex items-start flex-col justify-center">
            <p className="text-brand text-2xl font-medium">Why Choose NOWA?</p>
            <div className="flex flex-col gap-4 mt-8">
              <p className="text-xl">
                <span className="font-semibold">Accuracy</span> – AI models
                continuously improve with live market data.
              </p>
              <p className="text-xl">
                <span className="font-semibold"> Transparency</span> – All
                results and transactions are verifiable on-chain.
              </p>
              <p className="text-xl">
                <span className="font-semibold"> Global Reach</span> – Open to
                users worldwide, no borders or limitations.
              </p>
              <p className="text-xl">
                <span className="font-semibold">Community-Driven</span> –
                Continuous upgrades and governance powered by the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NextGenSection;
