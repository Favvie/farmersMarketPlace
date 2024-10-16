"use client";

import { MARKETPLACEADDRESS } from "@/lib/constants";
import { client } from "@/utils/client";
import { defineChain, getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";

const liskSepolia = defineChain(4202);

export const useMarketplaceContract = () => {
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
      "function farmers() public view returns (address account, string memory name, string memory location, Role role)",
    params: [],
  });

  const {
    data: buyers,
    isLoading: buyersLoading,
    error: buyersError,
  } = useReadContract({
    contract: marketplaceContract,
    method:
      "function buyers() public view returns (address account, string memory name, string memory location, Role role)",
    params: [],
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
