import { PRODUCT_SALES_TABLE_HEADER } from "@/lib/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { dummy_product_sales_data } from "@/lib/data";

export function ProductSalesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {PRODUCT_SALES_TABLE_HEADER.map((item) => (
            <TableHead
              key={item}
              className="font-medium text-sm text-[#667085] py-4"
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {dummy_product_sales_data.map((item) => (
          <TableRow key={item.productId} className="">
            <TableCell className="py-[14px] text-sm font-medium text-[#48505E]">
              {item.product}
            </TableCell>
            <TableCell className="py-[14px] text-sm font-medium text-[#48505E]">
              {item.productId}
            </TableCell>
            <TableCell className="py-[14px] text-sm font-medium text-[#48505E]">
              {item.category}
            </TableCell>
            <TableCell className="py-[14px] text-sm font-medium text-[#48505E]">
              {item.stock}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
