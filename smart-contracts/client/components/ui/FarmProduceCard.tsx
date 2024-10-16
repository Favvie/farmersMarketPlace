import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type CardProps = {
	title: string;
	image: string;
	price: number;
};

export function FarmProduceCard({ title, image, price }: CardProps) {
	return (
		<Card>
			<CardContent className="py-5">
				<Image
					src={image}
					alt="Cow"
					width={200}
					height={200}
					className="w-full h-full"
				/>
				<div className="mt-5 space-y-2">
					<p className="font-semibold">{title}</p>
					<p>US${price}/Kg</p>
					<p className="pt-1">Min. order: 20metric tons</p>
				</div>
			</CardContent>
			<CardFooter>
				<Button className="w-full bg-[#48B94D] rounded-lg">Buy Now</Button>
			</CardFooter>
		</Card>
	);
}
