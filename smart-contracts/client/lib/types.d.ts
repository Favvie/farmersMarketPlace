export interface INavbar {
  title: string;
  href: string;
}

export interface IProductSalesData {
  product: string;
  productId: string;
  category: string;
  stock: string;
}

export interface IProfitRevenueData {
  month: string;
  profit: number;
  revenue: number;
}

interface BaseDSWProps {
  title: string;
  children: React.ReactNode;
}

interface WithOptions {
  hasOptions: true;
  options: string[];
  linkUrl?: never;
  linkText?: never;
}

interface WithoutOptions {
  hasOptions?: false;
  options?: never;
  linkUrl: string;
  linkText: string;
}

export type DSWProps = BaseDSWProps & (WithOptions | WithoutOptions);
