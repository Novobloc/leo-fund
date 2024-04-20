"use client";
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
} from "@biconomy/account";
import { ethers } from "ethers";
import { Magic } from "magic-sdk";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useContext, useEffect, useState } from "react";
import _ from "lodash";

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
  setChainSelected: React.Dispatch<React.SetStateAction<number>>;
  smartAccount: BiconomySmartAccountV2 | null;
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
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error);
    }
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
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
