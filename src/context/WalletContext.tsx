"use client";
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
  PaymasterMode,
} from "@biconomy/account";
import { ethers, utils } from "ethers";
import { Magic } from "magic-sdk";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useContext, useEffect, useState } from "react";
import _ from "lodash";
import { config } from "@/constants/config";
import { toast } from "react-toastify";
import { Alchemy, Network } from "alchemy-sdk";

type Chain = {
  chainId: number;
  name: string;
  providerUrl: string;
  incrementCountContractAdd: string;
  biconomyPaymasterApiKey: string;
  explorerUrl: string;
};

interface WalletContextType {
  provider: any;
  smartAccountAddress: string | null;
  isAuthenticated: boolean;
  connectWallet: () => Promise<void>;
  chainSelected: number;
  tokenBalances: any;
  setChainSelected: React.Dispatch<React.SetStateAction<number>>;
  smartAccount: BiconomySmartAccountV2 | null;
  getAllProjects: () => Promise<any>;
  getProjectFundInUSD: (projectNumber: number) => Promise<any>;
  createProject: (name: string) => Promise<any>;
  fundEth: (projectNo: number, amount: string) => Promise<any>;
  withdrawEth: (projectNo: number) => Promise<any>;
  getWalletBalances: () => Promise<any>;
  projects: any;
}

interface WalletProviderProps {
  children: React.ReactNode;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(
    null
  );
  const [chainSelected, setChainSelected] = useState<number>(1);
  const [tokenBalances, setTokenBalances] = useState<any>([]);
  const [alchemyClient, setAlchemyClient] = useState<any>(null);
  const [projects, setProjects] = useState<any>([]);

  const chains: Chain[] = [
    {
      chainId: 11155111,
      name: "Ethereum Sepolia",
      providerUrl: "https://eth-sepolia.public.blastapi.io",
      incrementCountContractAdd: "0xd9ea570eF1378D7B52887cE0342721E164062f5f",
      biconomyPaymasterApiKey: "gJdVIBMSe.f6cc87ea-e351-449d-9736-c04c6fab56a2",
      explorerUrl: "https://sepolia.etherscan.io/tx/",
    },
    {
      chainId: 84532,
      name: "Base Sepolia",
      providerUrl:
        "https://base-sepolia.g.alchemy.com/v2/glA0R7ResM-huSm9Dazi6G8T4sksMrSA",
      incrementCountContractAdd: "0xC3eb56424077eb91889Bc102e400582378E77489",
      biconomyPaymasterApiKey: "hyqnO0F1y.c88a83c3-3f63-48ab-958a-9c3dee381bf8",
      explorerUrl: "https://sepolia-explorer.base.org/",
    },
  ];

  const connectWallet = async () => {
    try {
      const magic: any = new Magic("pk_live_9327608A9300350A", {
        network: {
          rpcUrl: chains[chainSelected].providerUrl,
          chainId: chains[chainSelected].chainId,
        },
      });
      console.log(chainSelected, "chainSelected");
      console.log(magic, "magic");

      await magic.wallet.connectWithUI();
      const web3Provider = new ethers.providers.Web3Provider(
        magic.rpcProvider,
        "any"
      );
      console.log(web3Provider, "web3Provider");
      const _provider = new ethers.providers.JsonRpcProvider(
        chains[chainSelected].providerUrl
      );
      console.log(_provider, "_provider");
      setProvider(_provider);

      const alchemy = new Alchemy({
        network: Network.BASE_SEPOLIA,
        apiKey: "glA0R7ResM-huSm9Dazi6G8T4sksMrSA",
      });
      setAlchemyClient(alchemy);

      const config = {
        biconomyPaymasterApiKey: chains[chainSelected].biconomyPaymasterApiKey,
        bundlerUrl: `https://bundler.biconomy.io/api/v2/${chains[chainSelected].chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
      };

      const smartWallet = await createSmartAccountClient({
        signer: web3Provider.getSigner(),
        biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
        bundlerUrl: config.bundlerUrl,
        rpcUrl: chains[chainSelected].providerUrl,
        chainId: chains[chainSelected].chainId,
      });

      console.log("Biconomy Smart Account", smartWallet);
      setSmartAccount(smartWallet);
      const saAddress = await smartWallet.getAccountAddress();
      console.log("Smart Account Address", saAddress);
      setSmartAccountAddress(saAddress);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProjects = async () => {
    try {
      const contractAddress = config.MAIN_CONTRACT(
        chains[chainSelected].chainId
      ).ADDRESS;

      const contractInstance = new ethers.Contract(
        contractAddress,
        config.MAIN_CONTRACT(chains[chainSelected].chainId).ABI, // Assuming you have defined contractABI for FundAProject contract
        provider
      );
      const response = await contractInstance.getAllProjects();

      const _projects = await Promise.all(
        response.map(async (project: any, i: any) => {
          const _fundRaisedInUsd: any = await getProjectFundInUSD(i);
          console.log(_fundRaisedInUsd, "_fundRaisedInUsd");
          const fundRaisedInUsd = _fundRaisedInUsd / 100000000;
          console.log(fundRaisedInUsd, "fundRaisedInUsd");

          const item = {
            projectName: project[0],
            balance: project[1],
            owner: project[2],
            index: i,
            fundRaisedInUsd,
          };
          return item;
        })
      );

      setProjects(_projects);
      return _projects;
    } catch (error) {
      console.error(error);
    }
  };

  async function getProjectFundInUSD(projectNo: any) {
    try {
      const contractAddress = config.MAIN_CONTRACT(
        chains[chainSelected].chainId
      ).ADDRESS;

      const contractInstance = new ethers.Contract(
        contractAddress,
        config.MAIN_CONTRACT(chains[chainSelected].chainId).ABI, // Assuming you have defined contractABI for FundAProject contract
        provider
      );

      const ethPriceDataFeed = await contractInstance.getProjectFundInUSD(
        projectNo
      );

      return ethers.utils.formatEther(ethPriceDataFeed);
    } catch (error) {
      console.error(error);
    }
  }

  const createProject = async (name: string) => {
    try {
      const toastId = toast("Creating Project", { autoClose: false });

      const contractAddress = config.MAIN_CONTRACT(
        chains[chainSelected].chainId
      ).ADDRESS;

      const contractInstance = new ethers.Contract(
        contractAddress,
        config.MAIN_CONTRACT(chains[chainSelected].chainId).ABI, // Assuming you have defined contractABI for FundAProject contract
        provider
      );

      const minTx = await contractInstance.populateTransaction.createProject(
        name
      );
      console.log("Create Project Tx Data", minTx.data);
      const tx1: any = {
        to: contractAddress,
        data: minTx.data,
      };

      toast.update(toastId, {
        render: "Sending Transaction",
        autoClose: false,
      });

      const userOpResponse: any = await smartAccount?.sendTransaction(tx1, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      const { transactionHash } = await userOpResponse.waitForTxHash();
      console.log("Transaction Hash", transactionHash);

      if (transactionHash) {
        toast.update(toastId, {
          render: "Transaction Successful",
          type: "success",
          autoClose: 5000,
        });
        return transactionHash;
      }
    } catch (error) {
      console.error(error);
      toast.error("Transaction Unsuccessful", { autoClose: 5000 });
    }
  };

  const fundEth = async (projectNo: number, amount: string) => {
    try {
      const toastId = toast("Funding ETH to Project", { autoClose: false });
      const contractAddress = config.MAIN_CONTRACT(
        chains[chainSelected].chainId
      ).ADDRESS;

      console.log("contractAddress: ", contractAddress);
      console.log("projectNo: ", projectNo, "amount:", amount);

      const contractInstance = new ethers.Contract(
        contractAddress,
        config.MAIN_CONTRACT(chains[chainSelected].chainId).ABI, // Assuming you have defined contractABI for FundAProject contract
        provider
      );

      // Convert amount to Wei
      const amountInWei = ethers.utils.parseEther(amount);

      // Prepare transaction data
      const minTx = await contractInstance.populateTransaction.fundEth(
        projectNo,
        {
          value: amountInWei,
        }
      );
      console.log("Fund ETH Tx Data", minTx.data);

      // Create transaction object
      const tx1: any = {
        to: contractAddress,
        data: minTx.data,
        value: amountInWei, // Include ETH value in the transaction
      };

      console.log(tx1);

      // Update toast and send transaction
      toast.update(toastId, {
        render: "Sending Transaction",
        autoClose: false,
      });
      const userOpResponse: any = await smartAccount?.sendTransaction(tx1, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      const { transactionHash } = await userOpResponse.waitForTxHash();
      console.log("Transaction Hash", transactionHash);

      // Handle success
      if (transactionHash) {
        toast.update(toastId, {
          render: "Transaction Successful",
          type: "success",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Transaction Unsuccessful", { autoClose: 5000 });
    }
  };

  const withdrawEth = async (projectNo: number) => {
    try {
      const toastId = toast("Withdrawing ETH from Project", {
        autoClose: false,
      });
      const contractAddress = config.MAIN_CONTRACT(
        chains[chainSelected].chainId
      ).ADDRESS;

      const contractInstance = new ethers.Contract(
        contractAddress,
        config.MAIN_CONTRACT(chains[chainSelected].chainId).ABI, // Assuming you have defined contractABI for FundAProject contract
        provider
      );

      // Prepare transaction data
      const minTx = await contractInstance.populateTransaction.withdrawEth(
        projectNo
      );
      console.log("Withdrawing ETH Tx Data", minTx.data);

      // Create transaction object
      const tx1: any = {
        to: contractAddress,
        data: minTx.data,
      };

      // Update toast and send transaction
      toast.update(toastId, {
        render: "Sending Transaction",
        autoClose: false,
      });
      const userOpResponse: any = await smartAccount?.sendTransaction(tx1, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      const { transactionHash } = await userOpResponse.waitForTxHash();
      console.log("Transaction Hash", transactionHash);

      // Handle success
      if (transactionHash) {
        toast.update(toastId, {
          render: "Transaction Successful",
          type: "success",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Transaction Unsuccessful", { autoClose: 5000 });
    }
  };

  const getTokenMetaData = async (tokenAddress: string) => {
    const tokenMetaData = await alchemyClient?.core?.getTokenMetadata(
      tokenAddress
    );
    return tokenMetaData;
  };

  const getWalletBalances = async () => {
    const _tokenBalance = await alchemyClient?.core?.getBalance(
      smartAccountAddress
    );
    const _tokenBalances = await alchemyClient?.core?.getTokenBalances(
      smartAccountAddress
    );

    const promises = await _tokenBalances?.tokenBalances.map(
      async (item: any) => {
        const metaData = await getTokenMetaData(item.contractAddress);
        if (metaData) {
          const amount = item.tokenBalance / Math.pow(10, metaData.decimals);
          item.amount = amount.toFixed(2);
          delete item.tokenBalance;
          delete metaData.logo;
        }
        return { ...item, ...metaData };
      }
    );

    const tokenBalancesNew = await Promise.all(promises);
    const nativeTokenBalance = {
      contractAddress: "0x00000000000000000000000000",
      amount: (
        parseInt(BigInt(_tokenBalance?._hex).toString()) / Math.pow(10, 18)
      ).toFixed(3),
      decimals: 18,
      name: "Native Token",
      symbol: "ETH",
    };
    const newTokenBalances = [...tokenBalancesNew, nativeTokenBalance];
    setTokenBalances(newTokenBalances);
    return newTokenBalances;
  };

  useEffect(() => {
    connectWallet();
  }, [chainSelected]);

  return (
    <WalletContext.Provider
      value={{
        provider,
        smartAccountAddress,
        isAuthenticated,
        connectWallet,
        chainSelected,
        setChainSelected,
        smartAccount,
        getAllProjects,
        getProjectFundInUSD,
        createProject,
        fundEth,
        withdrawEth,
        getWalletBalances,
        tokenBalances,
        projects,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
