import { client } from "@/utils/client";
import { useCallback } from "react";
import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

export const useTransactionContract = () => {
  return useCallback(
    () =>
      getContract({
        client,
        address: "",
        chain: baseSepolia,
      }),
    []
  );
};
