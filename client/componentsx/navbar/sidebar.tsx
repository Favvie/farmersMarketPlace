"use client";

import { SIDEBAR_ITEMS } from "@/lib/constants";
import { NavItemWrapper } from "./nav-item-wrapper";
import { usePathname } from "next/navigation";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import Link from "next/link";

export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const userAddress = "0x6f..813A65";

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-0 h-screen bg-blue-2">
        <div className="flex h-full max-h-screen flex-col p-6">
          <Link href={"/"}>
            <Icons.logo />
          </Link>

          <nav className="flex flex-1 flex-col justify-between overflow-auto">
            <ul className="space-y-[12px] py-2 px-4">
              <li>
                <NavItemWrapper item={SIDEBAR_ITEMS[0]} pathname={pathname}>
                  <Icons.home
                    stroke={
                      pathname === SIDEBAR_ITEMS[0].href ? "#448DF2" : "#5D6679"
                    }
                  />
                </NavItemWrapper>
              </li>

              <li>
                <NavItemWrapper item={SIDEBAR_ITEMS[1]} pathname={pathname}>
                  <Icons.trolley
                    fill={
                      pathname === SIDEBAR_ITEMS[1].href ? "#448DF2" : "#5D6679"
                    }
                  />
                </NavItemWrapper>
              </li>

              <li>
                <NavItemWrapper item={SIDEBAR_ITEMS[2]} pathname={pathname}>
                  <Icons.report
                    fill={
                      pathname === SIDEBAR_ITEMS[2].href ? "#448DF2" : "#5D6679"
                    }
                  />
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
            </ul>

            <Button
              variant={"ghost"}
              className="w-[186px] gap-4 h-auto py-0 justify-start text-gray-0 hover:text-blue-0 hover:bg-white text-base"
            >
              <Icons.logout />
              <span>{userAddress}</span>
            </Button>
          </nav>
        </div>
      </aside>
      <main className="bg-[#F0F1F3] pb-20">{children}</main>
    </div>
  );
}
