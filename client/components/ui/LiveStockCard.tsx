import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type CardProps = {
	title: string;
	description: string;
	image: string;
	price: number;
	farmer: string;
};

export function LiveStockCard({ title, description, image, price, farmer }: CardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="flex justify-between gap-x-2">
				<Image
					src={image}
					alt={title}
					width={200}
					height={200}
				/>
				<div className="self-end">
					<p className="font-semibold text-2xl">{`US$${price}/Kg`}</p>
					<p className="pt-3">Farmer</p>
					<p className="font-semibold">{farmer}</p>
				</div>
			</CardContent>
			<CardFooter>
				<Button className="w-full bg-[#48B94D] rounded-lg">Buy Now</Button>
			</CardFooter>
		</Card>
	);
}
