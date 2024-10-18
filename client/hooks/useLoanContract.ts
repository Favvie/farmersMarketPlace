import { client } from "@/utils/client";
import { useCallback } from "react";
import { defineChain, getContract } from "thirdweb";

const liskSepolia = defineChain(4202);

export const useLoanContract = () => {
  return useCallback(
    () =>
      getContract({
        client,
        address: "0xe76465828cB5cdB27a57C2b8E75fdeEefFC1f0e3",
        chain: liskSepolia,
      }),
    []
  );
};
