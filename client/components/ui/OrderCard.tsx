import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { CircleDashed, CircleDollarSign, Boxes } from "lucide-react";

type CardProps = {
	title: string;
	description: string;
	qty: number;
	price: number;
	status: string;
};

export function OrderCard({ title, description, qty, price, status }: CardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<span className="text-green-600">#2202</span> <span className="text-xl">- {title}</span>
				</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="flex justify-between gap-x-2">
				<div className="flex items-center">
					<p className="font-semibold text-xl flex items-center">
						<CircleDollarSign />
						<span className="pl-3">${price}/Kg</span>
					</p>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between w-full">
				<div className="flex">
					<CircleDashed className="text-green-600" />
					<p className="pl-3">{status}</p>
					<span className="px-5">|</span>
					<Boxes className="text-green-600" />
					<p className="pl-5">Quantity: {qty}kg</p>
				</div>
				{status === "Pending" && (
					<div>
						<Button className="bg-green-600 mr-3">Accept</Button>
						<Button>Reject</Button>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
