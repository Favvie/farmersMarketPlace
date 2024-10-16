interface Props {
  children: React.ReactNode;
  title: string;
  value: string;
}

export function ReportItemWrapper({ children, title, value }: Props) {
  return (
    <div className="bg-white w-[230px] rounded-[8px]">
      <div className="p-3 space-y-[40px]">
        <div className="flex items-center justify-between">
          <p className="font-medium">{title}</p>
          <span>{children}</span>
        </div>

        <p className="text-[32px] text-left font-medium leading-6">{value}</p>
      </div>

      <div className="border-t border-[#F0F1F3] h-[30px]"></div>
    </div>
  );
}
