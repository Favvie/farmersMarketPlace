"use client";

import Image from "next/image";
import image1 from "../assets/images/meta.png";
import image2 from "../assets/images/solana.png";
import image3 from "../assets/images/another.png";
import { SidebarContent } from "@/components/login/sidebar-content";
import { ConnectButton, darkTheme, useActiveAccount } from "thirdweb/react";
import { useEffect } from "react";
import { useWallet } from "@/context/wallet";
import { client } from "@/utils/client";
import { useMarketplaceContract } from "@/hooks/useMarketplaceContract";

export default function LoginScreen() {
  //pseudocode
  /**
   * connect wallet
   * check if user is new or already registered
   * if new => router.push("/registration")
   * if registered  => check if user role is farmer or buyer
   * if farmer => router.push("/dashboard")
   * if buyer => router.push("/marketplace")
   */

  const { setUserAddress } = useWallet();

  const activeAccount = useActiveAccount();

  const { buyers, buyersLoading, buyersError } = useMarketplaceContract();

  useEffect(() => {
    if (activeAccount?.address) {
      setUserAddress(activeAccount.address);
      if (buyersError) console.log(buyersError);
      if (buyersLoading) console.log("loading");
      console.log(buyers);
    }
  }, [activeAccount, buyers, buyersError, buyersLoading, setUserAddress]);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-8 flex flex-col justify-between relative">
        <div className="absolute inset-0 opacity-10  bg-[url('/bg.jpeg')] bg-cover bg-center"></div>

        <div className="flex h-screen items-center justify-center z-50">
          <SidebarContent />
        </div>
      </div>

      <div className="w-2/3 bg-green-800 p-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-8 p-4 leading-10">
          Connect your wallet
        </h1>
        <p className="text-2xl text-white font-semibold mb-12 p-4">
          Gain access to the marketplace by linking your personal wallet or
          create a new wallet with your credentials
        </p>

        <div className="flex space-x-8 mb-8">
          <Image src={image1} alt="MetaMask img" className="h-30 w-30" />
          <Image src={image2} alt="MetaMask img" className="h-30 w-30" />
          <Image src={image3} alt="MetaMask img" className="h-30 w-30" />
        </div>

        <ConnectButton
          client={client}
          connectButton={{ label: "Connect Wallet" }}
          theme={darkTheme({
            colors: {
              primaryButtonBg: "#48B94D",
            },
          })}
        />
      </div>
    </div>
  );
}
