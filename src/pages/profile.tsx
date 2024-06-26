"use client";
import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import { openTransak } from "@/components/_onramp/transak";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { Button } from "@chakra-ui/react";
import { useWallet } from "@/context/WalletContext";

const Home = () => {
  const {
    isAuthenticated,
    smartAccountAddress,
    getAllProjects,
    projects,
    withdrawEth,
    getWalletBalances,
    tokenBalances,
  } = useWallet();

  const [projectsData, setProjectsData]: any = useState([]);

  const handleGetBalances = async () => {
    await getWalletBalances();
  };
  console.log(tokenBalances, "tokenBalances");

  const handleGetProjects = async () => {
    const data: any = await getAllProjects();
    console.log(data, "data");
    if (projects && projects.length > 0) {
      const ownedProjects = data.filter((i: any) => {
        return (
          i.owner.toLowerCase() === (smartAccountAddress?.toLowerCase() || "")
        );
      });

      console.log(ownedProjects, "ownedProjects");

      setProjectsData(ownedProjects);
    }
  };

  const handleWithdraw = (item: any) => {
    withdrawEth(0);
  };

  useEffect(() => {
    handleGetBalances();
    handleGetProjects();
  }, [isAuthenticated]);

  return (
    <>
      <div className="app-container app-theme-white flex flex-col w-full text-gray-700 bg-white">
        <section>
          <div>
            <div>
              <div className="mx-auto max-w-7xl pb-10 lg:py-6  w-full">
                <div className="sm:flex sm:items-center w-full">
                  <div className="sm:flex-auto w-full">
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                      {/* Left column */}

                      <div className="grid grid-cols-1 gap-4 h-full">
                        <div className="h-full rounded-lg bg-white shadow">
                          <div className="p-6 h-full">
                            <div className="h-full">
                              <div className="pt-2 h-full">
                                <h2 className="leading-6 text-xl font-bold font-sans text-gray-900 ">
                                  Buy & Sell Crypto
                                </h2>
                                <p className="mt-4 text-base text-gray-500 font-extralight">
                                No funds? No problem. Top up your wallet now and withdraw to fiat whenever you need.
                                </p>
                                <div className="pt-8 flex rounded-md shadow-sm  justify-center">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openTransak("BUY", smartAccountAddress)
                                    }
                                    className="mr-7 inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-black  to-blue-900 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm "
                                  >
                                    <ArrowDownIcon
                                      className="-ml-0.5 mr-2 h-4 w-4"
                                      aria-hidden="true"
                                    />
                                    Buy Crypto
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openTransak("SELL", smartAccountAddress)
                                    }
                                    className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-green-800  via-black to-black  px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                  >
                                    <ArrowUpIcon
                                      className="-ml-0.5 mr-2 h-4 w-4"
                                      aria-hidden="true"
                                    />
                                    Sell Crypto
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right column */}

                      <div className="grid grid-cols-1 gap-4 lg:col-span-2 ">
                        <section aria-labelledby="section-1-title">
                          <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-6">
                              <div>
                                <div>
                                  <h2 className="leading-6 text-xl font-semibold text-gray-900 font-sans  lg:-mx-2">
                                    Balance
                                  </h2>
                                </div>

                                <div className="mt-4 flex flex-col">
                                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full align-middle ">
                                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                          <thead className="bg-gray-50">
                                            <tr>
                                              <th
                                                scope="col"
                                                className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                              >
                                                Symbol
                                              </th>
                                              <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                              >
                                                Balance
                                              </th>
                                              <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                              >
                                                View
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody className="divide-y divide-gray-200 bg-white">
                                            {tokenBalances.length > 0 &&
                                              tokenBalances.map(
                                                (transaction: any, i: any) => (
                                                  <tr key={i}>
                                                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 flex items-center gap-3">
                                                      {
                                                        <button
                                                          className={`w-8 h-8  text-white bg-gradient-to-r from-cyan-500  to-gold rounded-full border-slate-400 focus:outline-none`}
                                                        ></button>
                                                      }{" "}
                                                      {transaction?.symbol ||
                                                        ""}
                                                    </td>
                                                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                                      {transaction.amount || ""}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                      <a
                                                        href={
                                                          transaction?.meta
                                                            ?.viewURL || ""
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                      >
                                                        <ArrowTopRightOnSquareIcon
                                                          width={15}
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                )
                                              )}
                                            {tokenBalances &&
                                              tokenBalances.length === 0 && (
                                                <tr className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 text-center w-full ">
                                                  No Records Found
                                                </tr>
                                              )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto border p-4 rounded-lg w-full mt-4">
          <h2 className="leading-6 text-xl font-bold font-sans text-gray-900 py-10 ">
            Your Projects
          </h2>
          <ul role="list" className="divide-y divide-gray-100">
            {projectsData &&
              projectsData.map((project: any) => (
                <li
                  key={project.name}
                  className="flex items-center justify-between gap-x-6 py-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {project.projectName}
                      </p>  <p className="text-sm font-semibold leading-6 text-gray-900">
                        {project.fundRaisedInUsd.toFixed(4)} USD
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-x-4">
                    <Button
                      backgroundColor={"black"}
                      color={"white"}
                      onClick={() => handleWithdraw(project)}
                    >
                      Withdraw
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
          {(!projectsData || projectsData?.length === 0) && (
            <span className="py-4 mx-auto">No data</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
