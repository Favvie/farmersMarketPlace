import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { OrderCard } from "@/components/ui/OrderCard";

export default function OrdersPage() {
	return (
		<div>
			<div className="bg-white p-7">
				<h1 className="text-green-0 text-xl font-semibold leading-[24px]">Orders</h1>
			</div>

			<div className="w-[95%] mx-auto py-10">
				<Tabs
					defaultValue="pending"
					className="w-full">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="pending">Pending</TabsTrigger>
						<TabsTrigger value="processing">Processing</TabsTrigger>
						<TabsTrigger value="delivered">Delivered</TabsTrigger>
						<TabsTrigger value="cancelled">Cancelled</TabsTrigger>
					</TabsList>
					<TabsContent value="pending">
						<OrderCard
							title="Fresh Pineapple / Cashew"
							description="Freshly plucked and squeezed pineapple fruits"
							qty={2}
							price={60}
							status="Pending"
						/>
					</TabsContent>
					<TabsContent value="processing">
						<OrderCard
							title="Fresh Pineapple / Cashew"
							description="Freshly plucked and squeezed pineapple fruits"
							qty={2}
							price={60}
							status="Processing"
						/>
					</TabsContent>
					<TabsContent
						value="delivered"
						className="flex w-full items-center justify-center">
						No deliveries yet
					</TabsContent>
					<TabsContent
						value="cancelled"
						className="flex w-full items-center justify-center">
						No cancelled deliveries yet
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
