import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import "react-circular-progressbar/dist/styles.css";
import { headers } from "next/headers";
import { Toaster } from "sonner";
import NavbarStyled from "@/common-components/globals/Header";
import { ReactLenis } from "lenis/react";
import Footer from "@/common-components/globals/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { BlockchainWrapper } from "@/provider/BlockChainWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title:
    "NOWA – AI-Powered Crypto Price Prediction Platform | Predict & Earn with $NOW Token",
  description:
    "Join NOWA, the leading AI-powered crypto prediction app on Binance Smart Chain. Beat AI forecasts, stake $NOW tokens, and earn crypto rewards. Participate in global competitions today!",
  keywords: [
    "blockchain",
    "security",
    "crypto",
    "decentralized",
    "web3",
    "finance",
    "exchange",
    "bitcoin",
    "binance",
  ],
  icons: {
    icon: [
      "/assets/brand/onlyLogo.png",
      {
        url: "/assets/brand/onlyLogo.png",
        type: "image/x-icon",
        sizes: "16x16",
      },
    ],
    apple: "/assets/brand/onlyLogo.png",
    shortcut: "/assets/brand/onlyLogo.png",
  },
  other: {
    rel: "mask-icon",
    url: "/assets/brand/onlyLogo.png",
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default async function RootLayout({ children }) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-brand-background dark relative`}
      >
        {/* <ReactLenis root /> */}
        <BlockchainWrapper>
          <GoogleAnalytics gaId="G-EYXKM29811" />
          <NavbarStyled />
          {children}
          <Footer />
          <Toaster theme="dark" />
        </BlockchainWrapper>
      </body>
    </html>
  );
}
