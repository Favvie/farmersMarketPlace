"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IContextProps {
  userAddress: string;
  setUserAddress: Dispatch<SetStateAction<string>>;
}

const initialState: IContextProps = {
  userAddress: "",
  setUserAddress: () => {},
};

const WalletContext = createContext<IContextProps>(initialState);

export default function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userAddress, setUserAddress] = useState<string>("");

  return (
    <WalletContext.Provider value={{ userAddress, setUserAddress }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
