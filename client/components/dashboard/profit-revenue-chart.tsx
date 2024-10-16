"use client";

import {
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dummy_profit_revenue_data } from "@/lib/data";

const chartConfig = {
  profit: {
    label: "Profit",
    color: "#DBA36247",
  },
  revenue: {
    label: "Revenue",
    color: "#448DF2",
  },
} satisfies ChartConfig;

const yAxisTicks = [20000, 40000, 60000, 80000];

export function ProfitRevenueChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[272px] mt-5 w-full">
      <AreaChart
        accessibilityLayer
        data={dummy_profit_revenue_data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />

        <YAxis tickLine={false} axisLine={false} ticks={yAxisTicks} />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />

        <ChartLegend content={<ChartLegendContent />} />

        <Area
          dataKey="revenue"
          type="natural"
          fill="#FBFBFB"
          fillOpacity={1}
          stroke="#448DF2"
          stackId="a"
        />

        <Area
          dataKey="profit"
          type="natural"
          fillOpacity={0}
          stroke="#DBA36247"
          stackId="b"
        />
      </AreaChart>
    </ChartContainer>
  );
}
