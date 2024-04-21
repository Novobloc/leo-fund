import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Button, Code, Divider } from "@chakra-ui/react";
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
      <div className="bg-white border m-3 px-3 pt-3 pb-6 my-3  rounded-lg">
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
                <div className="w-6 h-6">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  version="1.1"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  viewBox="0 0 784.37 1277.39"
                >
                  <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer" />
                    <g id="_1421394342400">
                      <g>
                        <polygon
                          fill="#343434"
                          fill-rule="nonzero"
                          points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                        />
                        <polygon
                          fill="#8C8C8C"
                          fill-rule="nonzero"
                          points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                        />
                        <polygon
                          fill="#3C3C3B"
                          fill-rule="nonzero"
                          points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                        />
                        <polygon
                          fill="#8C8C8C"
                          fill-rule="nonzero"
                          points="392.07,1277.38 392.07,956.52 -0,724.89 "
                        />
                        <polygon
                          fill="#141414"
                          fill-rule="nonzero"
                          points="392.07,882.29 784.13,650.54 392.07,472.33 "
                        />
                        <polygon
                          fill="#393939"
                          fill-rule="nonzero"
                          points="0,650.54 392.07,882.29 392.07,472.33 "
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                </div>
                
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
