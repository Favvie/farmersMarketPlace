import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Loans() {
	return (
		<div>
			<div className="bg-white p-7">
				<h1 className="text-green-0 text-xl font-semibold leading-[24px]">Micro Loans</h1>
			</div>

			<div className="w-[95%] mx-auto mt-10">
				<div className="flex justify-between gap-x-5 bg-white p-10 w-[65%]">
					<div className="space-y-3">
						<div className="flex items-center space-x-3">
							<Image
								src={"/product.svg"}
								alt={"product"}
								width={20}
								height={20}
							/>
							<h3>PRODUCTS</h3>
						</div>
						<p>Micro Loans</p>
					</div>

					<div className="space-y-3">
						<div className="flex items-center space-x-2">
							<Image
								src={"/coins.svg"}
								alt={"product"}
								width={20}
								height={20}
							/>
							<h3>AMOUNT</h3>
						</div>
						<p>US$500</p>
					</div>

					<div className="space-y-3">
						<div className="flex items-center space-x-3">
							<Image
								src={"/collateral.svg"}
								alt={"product"}
								width={20}
								height={20}
							/>
							<h3>NEXT STEP</h3>
						</div>
						<p>Pay Collateral</p>
					</div>

					<Button
						className="self-end"
						variant={"secondary"}>
						Continue
					</Button>
				</div>

				<div className="py-12 flex gap-x-5">
					<Card className="w-[300px]">
						<CardHeader>
							<CardTitle className="flex gap-x-4">
								<Image
									src={"/money.svg"}
									alt="money"
									width={40}
									height={40}
								/>
								<div className="flex flex-col">
									<span className="text-xl">MICRO LOAN</span>
									<span className="text-4xl">$ 2500</span>
								</div>
							</CardTitle>

							{/* <CardDescription>{description}</CardDescription> */}
						</CardHeader>
						<CardContent>
							<p>
								<span className="font-semibold pr-2">Loan ID:</span>2314456
							</p>
							<p>
								<span className="font-semibold">Issued</span>Oct 15, 2024
							</p>
							<p>24 months term</p>
							<p>5% APR</p>
						</CardContent>
						<CardFooter className="flex justify-between w-full">
							<div className="flex">
								{/* <CircleDashed className="text-green-600" /> */}
								{/* <p className="pl-3">{status}</p> */}
								{/* <span className="px-5">|</span> */}
								{/* <Boxes className="text-green-600" /> */}
								{/* <p className="pl-5">Quantity: {qty}kg</p> */}
							</div>
						</CardFooter>
					</Card>

					<Card className="flex-1">
						<CardHeader>
							<CardTitle className="flex gap-x-4">
								<Image
									src={"/calendar.svg"}
									alt="money"
									width={40}
									height={40}
								/>
								<div className="flex flex-col">
									<span className="text-lg">NEXT PAYMENT DUE</span>
									<span className="text-4xl">Oct 14, 2026</span>
								</div>
							</CardTitle>

							{/* <CardDescription>{description}</CardDescription> */}
						</CardHeader>
						<CardContent>
							<p>
								<span className="font-semibold pr-2">Loan ID:</span>2314456
							</p>
							<p>
								<span className="font-semibold">Issued</span>Oct 15, 2024
							</p>
							<p className="flex gap-x-2">
								<Image
									src={"/coins.svg"}
									alt="coins"
									width={20}
									height={20}
								/>
								Principal Paid:{" "}
							</p>
						</CardContent>
						<CardFooter className="flex justify-between w-full">
							<div className="flex">
								<Progress value={33} />
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
