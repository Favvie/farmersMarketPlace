"use client";

import { SIDEBAR_ITEMS } from "@/lib/constants";
import { NavItemWrapper } from "./nav-item-wrapper";
import { usePathname } from "next/navigation";
import { Icons } from "../icons";
import Link from "next/link";
import { useWallet } from "@/context/wallet";
import { ConnectButton, darkTheme, useActiveAccount } from "thirdweb/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/utils/client";

export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const { userAddress, setUserAddress } = useWallet();

  const activeAccount = useActiveAccount();

  useEffect(() => {
    if (activeAccount?.address) {
      setUserAddress(activeAccount.address);
      console.log(userAddress);
    } else {
      router.push("/login");
    }
  }, [activeAccount, router, setUserAddress, userAddress]);

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <aside className="sticky top-0 h-screen bg-blue-2">
        <div className="flex h-full max-h-screen flex-col p-6">
          <Link href={"/"}>
            <Icons.logo />
          </Link>

					<nav className="flex flex-1 flex-col justify-between overflow-auto">
						<ul className="space-y-[12px] py-2 px-4">
							<li>
								<NavItemWrapper
									item={SIDEBAR_ITEMS[0]}
									pathname={pathname}>
									<Icons.home stroke={pathname === SIDEBAR_ITEMS[0].href ? "#4ABA4F" : "#5D6679"} />
								</NavItemWrapper>
							</li>

							<li>
								<NavItemWrapper
									item={SIDEBAR_ITEMS[1]}
									pathname={pathname}>
									<Icons.trolley fill={pathname === SIDEBAR_ITEMS[1].href ? "#448DF2" : "#5D6679"} />
								</NavItemWrapper>
							</li>

							<li>
								<NavItemWrapper
									item={SIDEBAR_ITEMS[2]}
									pathname={pathname}>
									<Icons.report fill={pathname === SIDEBAR_ITEMS[2].href ? "#448DF2" : "#5D6679"} />
								</NavItemWrapper>
							</li>

							<li>
								<NavItemWrapper
									item={SIDEBAR_ITEMS[3]}
									pathname={pathname}>
									<Icons.box fill={pathname === SIDEBAR_ITEMS[3].href ? "#448DF2" : "#5D6679"} />
								</NavItemWrapper>
							</li>

              <li>
                <NavItemWrapper item={SIDEBAR_ITEMS[3]} pathname={pathname}>
                  <Icons.box
                    fill={
                      pathname === SIDEBAR_ITEMS[3].href ? "#448DF2" : "#5D6679"
                    }
                  />
                </NavItemWrapper>
              </li>

              <li>
                <Link href={"/marketplace"}>Open Marketplace</Link>
              </li>
            </ul>

            <ConnectButton
              client={client}
              connectButton={{ label: "Connect Wallet" }}
              theme={darkTheme({
                colors: {
                  primaryButtonBg: "#fff",
                },
              })}
            />
          </nav>
        </div>
      </aside>
      <main className="bg-[#F0F1F3] pb-20">{children}</main>
    </div>
  );
}
