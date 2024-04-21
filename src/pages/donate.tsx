"use client";
import Link from "next/link";
import ProjectCard from "@/components/_projects/project-card";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWallet } from "@/context/WalletContext";

const Project = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projects, setProjects]: any = useState([]);
  const [selectedProject, setSelectedProject] = useState(projects?.[0]);
  const {
    isAuthenticated,
    smartAccountAddress,
    getProjectFundInUSD,
    getAllProjects,
    createProject,
    fundEth,
    withdrawEth
  } = useWallet();

  useEffect(() => {
    isAuthenticated && handleGetProjects();
  }, [isAuthenticated]);

  const handleGetProjects = async () => {
    const data: any = await getAllProjects();
    console.log(data, "data");

    setProjects(data);
  };

  const handleSelectProject = (item: any) => {
    setSelectedProject(item);
    onOpen();
  };

  const handleGetProjectFundInUSD = async (item: any) => {
    const data2: any = await getProjectFundInUSD(0);
    console.log(data2, "data2");
  };

  

  const handleFundEth = async (item: any) => {
    const data3: any = await fundEth(0, "0.01");
    console.log(data3, "data3");
  };

  const handleWithdrawEth = async (item: any) => {
    const data3: any = await withdrawEth(0);
    console.log(data3, "data3");
  };

  return (
    <>
      <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
        <div className="sm:flex justify-between items-center">
          <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
            Discover projects
          </h3>
          <Button onClick={handleGetProjects}> GetAllProjects</Button>
          {/* <Button onClick={handleCreateProject}> Create</Button> */}
          <Button onClick={handleGetProjectFundInUSD}> Get Funds</Button>
          <Button onClick={handleFundEth}> Fund</Button>
          <Button onClick={handleWithdrawEth}> Withdraw</Button>

          <Link
            href={"/addproject"}
            className="text-blue-500 text-lg font-medium space-links font-mono"
          >
            Add Project&nbsp;&gt;&nbsp;
          </Link>
        </div>

        <div className="grid grid-cols-2 justify-center w-full">
          {projects &&
            projects.map((item: any, i: any) => {
              return (
                <ProjectCard
                  item={item}
                  index={i}
                  selectedProject={selectedProject}
                  onOpen={onOpen}
                  onClose={onClose}
                  isOpen={isOpen}
                  key={item.transactionHash}
                  handleSelectProject={handleSelectProject}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Project;
