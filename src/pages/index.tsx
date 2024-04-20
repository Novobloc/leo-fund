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
                  Fund the projects that matter to you
                </span>
              </h1>
              <p className="mx-auto text-base text-gray-500 sm:max-w-md  lg:text-xl md:max-w-3xl">
                Not for profit. For people.
              </p>

              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <Link
                  href="/creator/profile"
                  className="flex items-center px-6 py-3 text-black bg-white border border-black "
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>

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
      </div>
    </section>
  );
}
