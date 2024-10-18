import { INavbar } from "./types";

export const SIDEBAR_ITEMS: INavbar[] = [
	{
		title: "Dashboard",
		href: "/dashboard",
	},
	{
		title: "My Listing",
		href: "/dashboard/listing",
	},
	{
		title: "Reports",
		href: "/dashboard/reports",
	},
	{
		title: "Orders",
		href: "/dashboard/orders",
	},
	{
		title: "Loans",
		href: "/dashboard/microloans",
	},
];

export const PRODUCT_SALES_TABLE_HEADER = ["Product", "Product ID", "Category", "Remaining Quantity"];
