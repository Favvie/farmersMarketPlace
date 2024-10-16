"use client";

import { useWallet } from "@/context/wallet";
import { MARKETPLACEADDRESS } from "@/lib/constants";
import { client } from "@/utils/client";
import { defineChain, getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";

const liskSepolia = defineChain(4202);

export const useMarketplaceContract = () => {
  const { userAddress } = useWallet();

  const marketplaceContract = getContract({
    client,
    address: MARKETPLACEADDRESS,
    chain: liskSepolia,
  });

  const {
    data: farmers,
    isLoading: farmersLoading,
    error: farmersError,
  } = useReadContract({
    contract: marketplaceContract,
    method:
      "function farmers(address key) public view returns (address account, string memory name, string memory location, uint8 role)",
    params: [userAddress],
  });

  const {
    data: buyers,
    isLoading: buyersLoading,
    error: buyersError,
  } = useReadContract({
    contract: marketplaceContract,
    method:
      "function buyers(address key) public view returns (address account, string memory name, string memory location, uint8 role)",
    params: [userAddress],
  });

  return {
    farmers,
    buyers,
    buyersLoading,
    farmersLoading,
    farmersError,
    buyersError,
  };
};

// export function useGetFarmer(address: string) {

// }
