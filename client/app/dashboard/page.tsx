import { ProductSalesTable } from "@/components/dashboard/product-sales-table";
import { ReportItemWrapper } from "@/components/dashboard/report-item-wrapper";
import { Icons } from "@/components/icons";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <div className="bg-white text-center py-7">
        <h1 className="text-green-0 text-xl font-semibold leading-[24px]">
          Welcome to Your AgroXchange Dashboard
        </h1>
      </div>

      <div className="pt-6 px-8 space-y-[36px]">
        <div className="flex items-center justify-between">
          <ReportItemWrapper title="Total Sales" value="$10,000">
            <Icons.sales />
          </ReportItemWrapper>

          <ReportItemWrapper title="Pending Orders" value="5">
            <Icons.hourGlass />
          </ReportItemWrapper>

          <ReportItemWrapper title="No. of Orders" value="12">
            <Icons.cart />
          </ReportItemWrapper>

          <ReportItemWrapper title="Earnings" value="$3,000">
            <Icons.wallet />
          </ReportItemWrapper>
        </div>

        <div className="bg-white px-3 py-5 rounded-[8px]">
          {/*chart here */}
        </div>

        <div className="bg-white px-3 py-5 rounded-[8px] space-y-[4px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[#383E49] font-medium text-xl">
              Best selling products
            </h2>
            <Link
              href={"/dashboard"}
              className="text-blue-1 text-sm hover:underline"
            >
              See All
            </Link>
          </div>

          <ProductSalesTable />
        </div>
      </div>
    </>
  );
}
