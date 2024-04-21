"use client";
import { useWallet } from "@/context/WalletContext";
import { useState, SetStateAction } from "react";

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
    console.log(projectName);
    // send the project name to the blockchain

    const data3: any = await createProject(projectName);

    setProjectName("");
  };

  return (
    <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 min-h-screen ">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="project-name"
            >
              Project Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="project-name"
              type="text"
              value={projectName}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListProject;
