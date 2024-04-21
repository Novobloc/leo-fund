import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Button, Code } from "@chakra-ui/react";
import DonateModal from "./donate-modal";

import { utils } from "ethers";

const ProjectCard = ({
  item,
  isOpen,
  handleSelectProject,
  onClose,
  selectedProject,
  index,
}: any) => {

  return (
    <div className="w-full max-w-xl">
      <div className="bg-white border m-3 px-3 pt-3 pb-12 my-20  rounded-lg">
        <div className="px-3">
          <div className="w-full h-4 bg-green-100"></div>
          <h4 className="text-2xl font-bold pt-6 text-black">
            {item.projectName}
          </h4>
          <div>
            <h3 className="text-base font-normal pt-1 opacity-75 font-mono">
              Listed By: {item.owner}
            </h3>
          </div>
          <br />
          <div className="flex flex-col justify-end  item-center py-1">
            <h3 className="text-xl font-medium font-mono">
              Funds raised in ETH : $
              {utils.formatEther(item.balance)?.toString()}
            </h3>
            <h3 className="text-xl font-medium font-mono">
              Funds raised in USD : ${item?.fundRaisedInUsd}
            </h3>
          </div>

          <hr style={{ color: "#C4C4C4" }} />
          <div className="flex justify-between pt-6 w-full max-w-7xl">
            <Button
              onClick={() => handleSelectProject(item)}
              leftIcon={
                <CurrencyDollarIcon className="h-6 w-6" aria-hidden="true" />
              }
              colorScheme="gray"
              variant="solid"
              width={"inherit"}
            >
              Donate
            </Button>
          </div>
          {isOpen && (
            <DonateModal
              item={selectedProject}
              onClose={onClose}
              isOpen={isOpen}
              index={index}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
