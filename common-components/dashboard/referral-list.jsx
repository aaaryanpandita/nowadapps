"use client";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { formatCurrency } from "@/const";
import { useConnectWallet, useReferredUsers } from "@/queries";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useAccount } from "wagmi";
import Loader from "../globals/loader";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { maskValue } from "@/utils";

const ReferralList = () => {
  const { address } = useAccount();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: referredData, isPending: referredDataPending } =
    useReferredUsers(address, currentPage);

  const handlePageChange = (page) => {
    try {
      setCurrentPage(page?.selected + 1);
    } catch (error) {
      console.log(error);
    }
  };

  if (referredData?.referredUsers?.length == 0) {
    return <></>;
  }

  return (
    <div className="container mx-auto relative z-20 w-full mb-20">
      <BackgroundGradient className=" grid grid-cols-12 h-full w-full bg-[#121313] gap-4 p-6 shadow-[0px_0px_7.6px_7px_rgba(100,231,158,0.25)] rounded-2xl">
        <p className="col-span-12 font-semibold text-2xl">My Referrals</p>

        <div className="relative overflow-x-auto col-span-12">
          {referredDataPending && (
            <div className="min-h-96 min-w-full flex items-center justify-center">
              <Loader2 />
            </div>
          )}
          {!referredDataPending && (
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className="text-xs uppercase bg-transparent ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sr.No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Wallet Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date/Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount (NOWA)
                  </th>
                </tr>
              </thead>
              <tbody>
                {referredData?.referredUsers?.map((item, idx) => {
                  return (
                    <tr className="bg-[#161D26]" key={idx}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {(currentPage - 1) * 10 + idx + 1}
                      </th>
                      <td className="px-6 py-4">
                        {maskValue(item?.walletAddress)}
                      </td>
                      <td className="px-6 py-4">{item?.createdAt}</td>
                      <td className="px-6 py-4">
                        {formatCurrency({
                          symbol: "",
                          value: item?.rewardEarned || 0,
                        })}
                        <img
                          src="/assets/brand/onlyLogo.png"
                          alt=""
                          className="object-contain h-4 inline"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {!referredDataPending && (
          <div className="col-span-12 flex items-center justify-center">
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={referredData?.totalPages}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={"flex gap-2"}
              pageClassName={"px-3 py-1 border rounded cursor-pointer"}
              activeClassName={"bg-brand/50 text-white"}
              previousClassName={"px-3 py-1 border rounded cursor-pointer"}
              nextClassName={"px-3 py-1 border rounded cursor-pointer"}
              forcePage={currentPage - 1}
            />
          </div>
        )}
      </BackgroundGradient>
    </div>
  );
};

export default ReferralList;
