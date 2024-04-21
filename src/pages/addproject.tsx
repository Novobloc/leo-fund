"use client";
import { useWallet } from "@/context/WalletContext";
import { useState, SetStateAction } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const ListProject = () => {
  const { createProject } = useWallet();
  const [projectName, setProjectName] = useState("");
  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setProjectName(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await createProject(projectName);
    setProjectName("");
  };

  return (
    <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 min-h-screen ">
     
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
          
           

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Name
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={projectName}
                    onChange={handleInputChange}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-600">
             The Smart contract Wallet address will be set as owner for the project.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListProject;
