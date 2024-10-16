"use client";

import { useCallback } from "react";
import { useConnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/utils/client";

export function useConnection() {
  //
  const { connect } = useConnect();

  return useCallback(() => {
    connect(async () => {
      const metamask = createWallet("io.metamask");
      await metamask.connect({ client });

      return metamask;
    });
  }, [connect]);
}
