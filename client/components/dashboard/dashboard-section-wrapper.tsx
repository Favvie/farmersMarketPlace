"use client";

import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "../icons";
import { useState } from "react";
import { DSWProps } from "@/lib/types";

export function DashboardSectionWrapper({
  children,
  title,
  linkUrl,
  linkText,
  hasOptions = false,
  options,
}: DSWProps) {
  return (
    <div className="bg-white px-3 py-5 rounded-[8px] space-y-[6px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[#383E49] font-medium text-xl">{title}</h2>
        {hasOptions ? (
          <Filter options={options!} />
        ) : (
          <Link href={linkUrl!} className="text-blue-1 text-sm hover:underline">
            {linkText}
          </Link>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
}

function Filter({ options }: { options: string[] }) {
  const [option, setOption] = useState<string>("monthly");

  return (
    <Select value={option} onValueChange={setOption}>
      <SelectTrigger
        className="w-[150px] rounded-[4px] ml-auto flex items-center gap-2 capitalize text-gray-0 font-medium"
        aria-label="Select a value"
      >
        <Icons.calendar />
        <SelectValue placeholder="Choose" />
      </SelectTrigger>

      <SelectContent className="rounded-xl">
        {options.map((option) => (
          <SelectItem value={option} className="capitalize">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
