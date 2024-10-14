import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// interface HasOptions {
//   select?: boolean;
// }

// type ConditionalProps<T> = T extends {select: true} ? {
//   options: string[]
// } : {
//   link: string;
//   option: string;
// }

// type Props = HasOptions & ConditionalProps<HasOptions>

interface Props {
  title: string;
  linkUrl?: string;
  linkText?: string;
  children: React.ReactNode;
  hasOptions?: boolean;
  options?: string[];
}

export function DashboardSectionWrapper({
  children,
  title,
  linkUrl,
  linkText,
  hasOptions = false,
  options,
}: Props) {
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
  return (
    // <Select value={"Weekly"}>
    <Select value={options[0]}>
      <SelectTrigger
        className="w-[160px] rounded-lg sm:ml-auto"
        aria-label="Select a value"
      >
        <SelectValue placeholder="Last 3 months" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectItem value="90d" className="rounded-lg">
          Last 3 months
        </SelectItem>
        <SelectItem value="30d" className="rounded-lg">
          Last 30 days
        </SelectItem>
        <SelectItem value="7d" className="rounded-lg">
          Last 7 days
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
