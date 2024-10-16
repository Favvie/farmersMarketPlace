import { TOKENADDRESS } from "@/lib/constants";
import { client } from "@/utils/client";
import { useCallback } from "react";
import { defineChain, getContract } from "thirdweb";

const liskSepolia = defineChain(4202);

export const useTokenContract = () => {
  return useCallback(
    () =>
      getContract({
        client,
        address: TOKENADDRESS,
        chain: liskSepolia,
      }),
    []
  );
};
