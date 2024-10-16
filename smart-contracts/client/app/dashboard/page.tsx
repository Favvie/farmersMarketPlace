import { DashboardSectionWrapper } from "@/components/dashboard/dashboard-section-wrapper";
import { ProductSalesTable } from "@/components/dashboard/product-sales-table";
import { ProfitRevenueChart } from "@/components/dashboard/profit-revenue-chart";
import { ReportItemWrapper } from "@/components/dashboard/report-item-wrapper";
import { Icons } from "@/components/icons";

export default function DashboardPage() {
	const filterOptions: string[] = ["weekly", "monthly", "quarterly", "annually"];

	return (
		<>
			<div className="bg-white text-center py-7">
				<h1 className="text-green-0 text-xl font-semibold leading-[24px]">Welcome to Your AgroXchange Dashboard</h1>
			</div>

			<div className="pt-6 px-8 space-y-[36px]">
				<div className="flex items-center justify-between">
					<ReportItemWrapper
						title="Total Sales"
						value="$10,000">
						<Icons.sales />
					</ReportItemWrapper>

					<ReportItemWrapper
						title="Pending Orders"
						value="5">
						<Icons.hourGlass />
					</ReportItemWrapper>

					<ReportItemWrapper
						title="No. of Orders"
						value="12">
						<Icons.cart />
					</ReportItemWrapper>

					<ReportItemWrapper
						title="Earnings"
						value="$3,000">
						<Icons.wallet />
					</ReportItemWrapper>
				</div>

				<DashboardSectionWrapper
					title="Profit & Revenue"
					hasOptions
					options={filterOptions}>
					<ProfitRevenueChart />
				</DashboardSectionWrapper>

				<DashboardSectionWrapper
					title="Best selling products"
					linkUrl="/dasboard"
					linkText="See All">
					<ProductSalesTable />
				</DashboardSectionWrapper>
			</div>
		</>
	);
}
