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

export const MARKETPLACEADDRESS = "0xE3d094a057CcEF06066ded13F72a88f0238c136e";
export const TRANSACTIONADDRESS = "0xe4e8F00af3a3CEEcDAB8Ba153a8bFBfbe83985D8";
export const TOKENADDRESS = "0x1399D6eEDDA2d21A1FBa8aA1E09Db1EfDd8f5bEd";
