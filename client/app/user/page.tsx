import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { LiveStockCard } from "@/components/ui/LiveStockCard";
import { FarmProduceCard } from "@/components/ui/FarmProduceCard";

export default function Home() {
	return (
		<>
			<header className="bg-[rgb(62,155,66)] mt-10">
				<div className="flex items-center justify-between w-[90%] mx-auto lg:w-[80%]">
					<div className="flex items-center">
						<Image
							src="/logo.svg"
							alt="AgroXchange Logo"
							width={0}
							height={0}
							className="w-10 md:w-16 filter fill-white"
						/>
						<h1 className="font-semibold lg:ml-2 text-white">AgroXchange</h1>
					</div>

					<nav className="flex gap-x-10">
						<Link
							href="/"
							className="flex items-center gap-x-2">
							<Image
								src={"/home.svg"}
								alt="home"
								width={0}
								height={0}
								className="w-6 h-6"
							/>
							<span className="text-white">Home</span>
						</Link>

						<Link
							href="/"
							className="flex items-center gap-x-2">
							<Image
								src={"/carts.svg"}
								alt="home"
								width={0}
								height={0}
								className="w-6 h-6"
							/>
							<span className="text-white">Marketplace</span>
						</Link>

						<Link
							href="/"
							className="flex items-center gap-x-2">
							<Image
								src={"/contact.svg"}
								alt="home"
								width={0}
								height={0}
								className="w-6 h-6"
							/>
							<span className="text-white">My Account</span>
						</Link>
					</nav>

					<div className="flex space-x-5 items-center">
						<div className="bg-[#D9D9D9] p-[7px] flex items-center rounded-full pl-5 px-24">
							<Search />
							<input
								type="text"
								name=""
								id=""
								placeholder="Search Everything"
								className=" rounded-full bg-transparent focus:outline-none pl-4"
							/>
						</div>

						<Button className="px-4 sm:px-6 lg:px-8">
							<span className="font-semibold sm:font-bold">Open App</span>
							<ArrowRight className="text-[100px]" />
						</Button>
					</div>
				</div>
			</header>
			<main className="container py-10">
				<div className="flex w-[80%] mx-auto justify-between">
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Location" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Lagos</SelectItem>
							<SelectItem value="dark">Abuja</SelectItem>
							<SelectItem value="system">Kaduna</SelectItem>
						</SelectContent>
					</Select>

					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Commodity Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="dark">Dark</SelectItem>
							<SelectItem value="system">System</SelectItem>
						</SelectContent>
					</Select>

					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Delivery Option" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="dark">Dark</SelectItem>
							<SelectItem value="system">System</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<section className="my-10">
					<h2 className="font-semibold text-2xl">Live Stocks</h2>

					<div className="grid grid-cols-3 gap-5 py-10">
						<LiveStockCard
							title="Brown Gaussian Cow"
							description="Nigeria"
							image={"/cow.png"}
							price={60}
							farmer="ABC Farms"
						/>

						<LiveStockCard
							title="Brown Gaussian Cow"
							description="Nigeria"
							image={"/cow.png"}
							price={60}
							farmer="ABC Farms"
						/>

						<LiveStockCard
							title="Brown Gaussian Cow"
							description="Nigeria"
							image={"/cow.png"}
							price={60}
							farmer="ABC Farms"
						/>
					</div>

					<h3 className="font-semibold text-xl">Real-time Pricing</h3>
					<div className="rounded-full focus:outline-none pl-4 border inline-block w-full h-12 mt-3"></div>
				</section>

				<section>
					<h2 className="font-semibold text-2xl">Farm Produce</h2>

					<div className="grid grid-cols-4 gap-5 py-10">
						<FarmProduceCard
							title="Fresh Groundnut/ Cashew"
							image={"/cow.png"}
							price={60}
						/>

						<FarmProduceCard
							title="Fresh Groundnut/ Cashew"
							image={"/cow.png"}
							price={60}
						/>

						<FarmProduceCard
							title="Fresh Groundnut/ Cashew"
							image={"/cow.png"}
							price={60}
						/>

						<FarmProduceCard
							title="Fresh Groundnut/ Cashew"
							image={"/cow.png"}
							price={60}
						/>

						<FarmProduceCard
							title="Fresh Groundnut/ Cashew"
							image={"/cow.png"}
							price={60}
						/>

						<FarmProduceCard
							title="Fresh Groundnut/ Cashew"
							image={"/cow.png"}
							price={60}
						/>

						<FarmProduceCard
							title="Fresh Groundnut/ Cashew"
							image={"/cow.png"}
							price={60}
						/>

						<FarmProduceCard
							title="Fresh Groundnut/ Cashew"
							image={"/cow.png"}
							price={60}
						/>
					</div>
				</section>
			</main>

			<footer className="bg-[#265E28]">
				<div className="container flex flex-col lg:flex-row justify-between py-10">
					<div className="flex flex-col w-full mb-10 lg:mb-0">
						<div className="flex items-center">
							<Image
								src={"/logo.svg"}
								alt="logo"
								width={70}
								height={70}
							/>
							<h1 className="font-bold lg:ml-2 text-3xl text-white">AgroXchange</h1>
						</div>

						<div className="flex flex-col gap-y-10">
							<p className="font-bold text-white w-full text-center lg:text-start">Decentralized Market Place for Agricultural Commodity</p>

							<div className="flex justify-center lg:justify-start gap-x-3">
								<Image
									src={"/twitter.svg"}
									alt="twitter"
									width={30}
									height={30}
								/>
								<Image
									src={"/facebook.svg"}
									alt="facebook"
									width={40}
									height={40}
								/>
								<Image
									src={"/linkedin.svg"}
									alt="linkedin"
									width={30}
									height={30}
								/>
							</div>
						</div>
					</div>

					<div className="text-white flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full lg:justify-between mt-5 lg:mt-0">
						<div className="space-y-3">
							<h4 className="font-bold">Get Support</h4>
							<p>Help Center</p>
						</div>

						<div className="space-y-3">
							<h4 className="font-bold">About Us</h4>
							<p>Confirm Delivery</p>
						</div>

						<div className="space-y-3">
							<h4 className="font-bold">Defi</h4>
							<p>Sell on AgroXchange</p>
						</div>

						<div className="space-y-3">
							<h4 className="font-bold">Get Token</h4>
							<p>Get Loan</p>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
