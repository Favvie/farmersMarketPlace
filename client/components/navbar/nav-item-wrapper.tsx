import Link from "next/link";
import clsx from "clsx";
import { INavbar } from "@/lib/types";

interface Props {
  item: INavbar;
  pathname: string;
  children: React.ReactNode;
}

export function NavItemWrapper({ item, pathname, children }: Props) {
  const { title, href } = item;

  return (
    <Link href={href} className="flex text-gray-0 gap-4 py-4">
      {children}
      <span
        className={clsx("font-medium hover:text-blue-0", {
          "text-green-0": pathname === href,
        })}
      >
        {title}
      </span>
    </Link>
  );
}
