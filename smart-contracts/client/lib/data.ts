import { IProductSalesData, IProfitRevenueData } from "./types";

export const dummy_product_sales_data: IProductSalesData[] = [
  {
    product: "Tomato",
    productId: "11234",
    category: "Vegetable",
    stock: "225 kg",
  },
  {
    product: "Onion",
    productId: "12345",
    category: "Vegetable",
    stock: "200 kg",
  },
  {
    product: "Yam",
    productId: "11342",
    category: "Tuber",
    stock: "120 tubers",
  },
  {
    product: "Maize",
    productId: "13411",
    category: "Grain",
    stock: "0 kg",
  },
];

export const dummy_profit_revenue_data: IProfitRevenueData[] = [
  { month: "September", profit: 41000, revenue: 22000 },
  { month: "October", profit: 30000, revenue: 38000 },
  { month: "November", profit: 40000, revenue: 28000 },
  { month: "December", profit: 50000, revenue: 57000 },
  { month: "January", profit: 57000, revenue: 50000 },
  { month: "Febuary", profit: 53000, revenue: 48000 },
  { month: "March", profit: 39000, revenue: 42000 },
];
