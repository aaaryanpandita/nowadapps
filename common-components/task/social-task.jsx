"use client";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandX,
  IconCopy,
  IconShare,
  IconUsers,
} from "@tabler/icons-react";
import { ArrowRight, Loader } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { SECRET_KEY_STAGE, social } from "@/const";
import { updateUserDetails, useConnectWallet } from "@/queries";
import { useAccount } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import SocialShareModal from "./social-share-modal";
import { useSearchParams } from "next/navigation";
import CopyToClipboard from "react-copy-to-clipboard";

const validationSchema = Yup.object({
  twitter: Yup.string().trim().required("X id is required."),
  telegram: Yup.string().trim().required("Telegram id is required."),
  instagram: Yup.string().trim().required("Instagram id is required."),
  // referralCode: Yup.string().optional(),
  token: Yup.string().trim().required("Captcha is required."),
});

const SocialTask = ({ userDataRefetch }) => {
  const [shareModalState, setShareModalState] = useState(false);
  const { address } = useAccount();
  const searchParams = useSearchParams();

  const [socialCheck, setSocialCheck] = useState({
    twitter: false,
    telegram: false,
    instagram: false,
    share_number: 0,
  });
  const formik = useFormik({
    initialValues: {
      twitter: "",
      telegram: "",
      instagram: "",
      referralCode: searchParams.get("parent_ref_code"),
      token: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (validateShares()) {
        updateUserMutate();
      } else {
        toast.error("All task should be completed.");
      }
    },
  });
  const { data: userData, isLoading: userDataLoading } = useConnectWallet({
    walletAddress: address,
  });

  const { mutateAsync: updateUserMutate, isPending: updateUserMutatePending } =
    useMutation({
      mutationFn: () => {
        return updateUserDetails({
          captchaValue: formik?.values?.token || undefined,
          instagramUsername: formik?.values?.instagram || undefined,
          telegramUsername: formik?.values?.telegram || undefined,
          xUsername: formik?.values?.twitter || undefined,
          referralTasksCompleted: true,
          socialTasksCompleted: true,
          walletAddress: address || undefined,
          parentReferralCode: formik?.values?.referralCode || undefined,
        });
      },
      onSuccess: (data) => {
        userDataRefetch();
        if (data?.data?.responseCode == 200) {
          toast.success(data?.data?.responseMessage);
        } else {
          toast.error(data?.data?.responseMessage);
        }
      },
    });

  const validateShares = () => {
    try {
      if (!socialCheck?.instagram) {
        return false;
      }
      if (!socialCheck?.telegram) {
        return false;
      }
      if (!socialCheck?.twitter) {
        return false;
      }
      if (Number(socialCheck?.share_number) < 3) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="col-span-12 lg:col-span-6  relative mt-8 lg:mt-0 ">
      <BackgroundGradient className="grid grid-cols-12  w-full bg-[#121313] gap-4 p-6 shadow-[0px_0px_7.6px_7px_rgba(100,231,158,0.25)] rounded-2xl">
        {userDataLoading && (
          <div className="col-span-12 flex justify-center items-center flex-col h-96 gap-2">
            <Loader size={30} />
            <p className="text-2xl ">Getting Data</p>
          </div>
        )}
        {!userDataLoading && (
          <div className="col-span-12 flex justify-center items-center flex-col ">
            <p className="text-4xl font-semibold">Social Task</p>
            <div className="w-full mt-8  py-10 flex flex-col gap-8">
              {/* //twitter/// */}
              <div>
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex flex-row w-full bg-[#030705] h-12 rounded-2xl items-center px-2">
                    <div className="bg-gray-800 rounded-lg h-8 w-8 flex items-center justify-center ">
                      <IconBrandX size={24} />
                    </div>
                    <input
                      type="text"
                      name="twitter"
                      className="w-full outline-0 px-4"
                      placeholder="Enter Your X ID"
                      value={formik.values.twitter}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <Link
                    href={social.TWITTER}
                    target="_blank"
                    onClick={() => {
                      setTimeout(() => {
                        setSocialCheck((p) => {
                          return { ...p, twitter: true };
                        });
                      }, 3000);
                    }}
                  >
                    <button className="bg-brand h-12 text-black px-4 lg:w-32 text-sm md:text-md rounded-2xl cursor-pointer">
                      {socialCheck?.twitter ? `Followed` : `Follow`}
                    </button>
                  </Link>
                </div>
                <p className="text-red-500">{formik?.errors?.twitter}</p>
              </div>
              {/* //twitter/// */}
              {/* //Telegram/// */}
              <div>
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex flex-row w-full bg-[#030705] h-12 rounded-2xl items-center px-2">
                    <div className="bg-gray-800 rounded-lg h-8 w-8 flex items-center justify-center ">
                      <IconBrandTelegram size={24} />
                    </div>
                    <input
                      name="telegram"
                      value={formik.values?.telegram}
                      onChange={formik.handleChange}
                      type="text"
                      className="w-full outline-0 px-4"
                      placeholder="Enter Your Telegram User Name"
                    />
                  </div>
                  <Link
                    href={social.TELEGRAM}
                    target="_blank"
                    onClick={() => {
                      setTimeout(() => {
                        setSocialCheck((p) => {
                          return { ...p, telegram: true };
                        });
                      }, 3000);
                    }}
                  >
                    <button className="bg-brand h-12 text-black px-4 lg:w-32 text-sm md:text-md rounded-2xl cursor-pointer">
                      {socialCheck?.telegram ? `Joined` : `Join`}
                    </button>
                  </Link>
                </div>
                <p className="text-red-500">{formik?.errors?.telegram}</p>
              </div>
              {/* //Telegram/// */}
              {/* //Instagram/// */}
              <div>
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex flex-row w-full bg-[#030705] h-12 rounded-2xl items-center px-2">
                    <div className="bg-gray-800 rounded-lg h-8 w-8 flex items-center justify-center ">
                      <IconBrandInstagram size={24} />
                    </div>
                    <input
                      name="instagram"
                      value={formik.values?.instagram}
                      onChange={formik.handleChange}
                      type="text"
                      className="w-full outline-0 px-4"
                      placeholder="Enter Your Instagram ID"
                    />
                  </div>
                  <Link
                    href={social.INSTAGRAM}
                    target="_blank"
                    onClick={() => {
                      setSocialCheck((p) => {
                        return { ...p, instagram: true };
                      });
                    }}
                  >
                    <button className="bg-brand h-12 text-black px-4 lg:w-32 text-sm md:text-md rounded-2xl cursor-pointer">
                      {socialCheck?.instagram ? `Followed` : `Follow`}
                    </button>
                  </Link>
                </div>
                <p className="text-red-500">{formik?.errors?.instagram}</p>
              </div>
              {/* //Instagram/// */}
              {/* //Referral code/// */}
              <div>
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex flex-row w-full bg-[#030705] h-12 rounded-2xl items-center px-2">
                    <div className="bg-gray-800 rounded-lg h-8 w-8 flex items-center justify-center ">
                      <IconUsers size={24} />
                    </div>
                    <input
                      name="referralCode"
                      value={formik.values?.referralCode}
                      onChange={formik.handleChange}
                      type="text"
                      className="w-full outline-0 px-4"
                      placeholder="Enter Referral Code"
                    />
                  </div>
                </div>
                <p className="text-red-500">{formik?.errors?.referralCode}</p>
              </div>
              {/* //Referral code/// */}
              {/* //Referral/// */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                <div className="flex flex-row w-full bg-[#030705] py-3 md:py-0 md:h-12 rounded-2xl items-center px-2">
                  <div className="bg-gray-800 rounded-lg h-8 w-8 flex items-center justify-center ">
                    <IconShare size={24} />
                  </div>
                  <div className="flex justify-between w-full items-center pl-4 flex-col md:flex-row">
                    <p>Share any 3 friends</p>
                    <div className="bg-[#64E79E33] rounded-lg  flex items-center justify-center px-2 py-1 gap-2 ">
                      <p>{userData?.referralCode || ""}</p>
                      <CopyToClipboard
                        text={userData?.referralCode || ""}
                        onCopy={() => {
                          toast.success("Copied Successfully.");
                        }}
                      >
                        <IconCopy className="cursor-pointer" />
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <button
                  className="bg-brand h-12 text-black rounded-2xl cursor-pointer w-full md:w-32"
                  onClick={() => {
                    setShareModalState(true);
                  }}
                >
                  {`Share${socialCheck.share_number ? ":" : " "} ${
                    socialCheck.share_number || ""
                  }`}
                </button>
              </div>
              {/* //Referral/// */}

              <div className="flex items-center justify-between flex-col gap-4 md:gap-0 md:flex-row">
                <div className="w-full">
                  <ReCAPTCHA
                    theme="dark"
                    onChange={(value) => {
                      formik.setFieldValue("token", value);
                    }}
                    sitekey={SECRET_KEY_STAGE}
                  />
                </div>
                <button
                  className="bg-brand flex flex-row h-10 w-full text-black items-center justify-center relative rounded-2xl cursor-pointer"
                  onClick={() => {
                    if (updateUserMutatePending) {
                      return;
                    }
                    formik.handleSubmit();
                  }}
                >
                  <p>{updateUserMutatePending ? `Executing...` : `Submit`}</p>
                  <div className="absolute right-4 bg-black/20 p-0.5 rounded">
                    <ArrowRight />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </BackgroundGradient>
      <SocialShareModal
        open={shareModalState}
        close={() => setShareModalState(false)}
        clickHandler={() => {
          setSocialCheck((p) => {
            return {
              ...p,
              share_number: Number(p?.share_number) + 1,
            };
          });
        }}
      />
    </div>
  );
};

export default SocialTask;
