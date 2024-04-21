import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

export default function Index() {
  return (
    <section className="px-2 py-40 bg-white md:px-0 h-[90vh]">
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <div className="flex flex-row-reverse flex-wrap items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 font  sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl">
                <span className="block xl:inline">
                Back the projects that matter most
                </span>
              </h1>
              <p className="mx-auto text-base text-gray-500 sm:max-w-md  lg:text-xl md:max-w-3xl">
                Not for profit. For people.
              </p>

              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <Link
                  href="/donate"
                  className="flex items-center px-6 py-3 text-black bg-white border border-black "
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
          <section className="bg-white pt-7 pb-14 tails-selected-element"></section>

          <div className="w-">
            <Image
              src="/images/_banner/bg.svg"
              alt="nothing"
              width={500}
              height={400}
              className=""
            />
          </div>
        </div>
        <br />
        <br />
        <div className="container px-8 mx-auto sm:px-12 lg:px-20">
          <h1 className="text-sm font-bold tracking-wide text-center text-gray-800 uppercase mb-7">
            BUILT WITH
          </h1>
          <div className=" grid items-center justify-center grid-cols-6 gap-y-8">
            <div className="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2">
              <img
                src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*dfYJiqHVoWBuKnI9q-SNHg.png"
                alt="Base"
                className="block object-contain h-12"
              />
            </div>
            <div className="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2">
              <img
                src="https://altcoinsbox.com/wp-content/uploads/2023/01/link-full-chainlink-logo-2048x625.webp"
                alt="Chainlink"
                className="block object-contain h-9"
              />
            </div>

            <div className="flex items-center justify-center col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2">
              <img
                src="https://altcoinsbox.com/wp-content/uploads/2023/04/full-biconomy-logo.png"
                alt="Youtube"
                className="block object-contain h-7 lg:h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
