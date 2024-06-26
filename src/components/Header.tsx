import { useWallet } from "@/context/WalletContext";
import Link from "next/link";
import React from "react";

export default function Header(): JSX.Element {
  const { isAuthenticated, smartAccountAddress, connectWallet } = useWallet();

  return (
    <section className="w-full h-[10vh] px-8 text-gray-700 bg-white">
      <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
          <Link
            href="/"
            className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
          >
            <span className="mx-auto text-xl  font-bold leading-none text-gray-900 select-none">
              LEO
              <span className="font-normal text-purple-600">FUND</span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
            <Link
              href="/donate"
              className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
            >
              Donate
            </Link>

            <Link
              href="/addproject"
              className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
            >
              Add Project
            </Link>
            <Link
              href="/profile"
              className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
            >
              My Profile
            </Link>
          </nav>
        </div>

        <button
          disabled={isAuthenticated ? true : false}
          onClick={connectWallet}
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isAuthenticated
            ? `Connected to: ${smartAccountAddress}`
            : "Connect Wallet"}
        </button>
      </div>
    </section>
  );
}
