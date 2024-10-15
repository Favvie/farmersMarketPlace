import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
// import { createThirdwebClient } from "thirdweb";
import {client} from "../utils/client";

import { ConnectButton } from "thirdweb/react";

export default function Home() {
	return (
		<>
			<nav className="flex items-center justify-between py-8 w-[90%] mx-auto lg:w-[80%]">
				<div className="flex items-center">
					<Image
						src="/logo.svg"
						alt="AgroXchange Logo"
						width={0}
						height={0}
						className="w-10 md:w-16"
					/>
					{/* <img src="" alt="" /> */}
					<h1 className="font-semibold lg:ml-2">AgroXchange</h1>
				</div>

				<Button className="px-4 sm:px-6 lg:px-8">
					<span className="font-semibold sm:font-bold">Open App</span>
					<ArrowRight className="text-[100px]" />
				</Button>
			</nav>
			<main className="container">
				{/* hero section */}
				<section className="flex flex-col lg:flex-row items-center justify-between pt-3 pb-5 sm:py-10 lg:py-24  gap-y-10 lg:gap-y-0">
					<div className="">
						<div className="lg:w-[80%] space-y-5 lg:space-y-6">
							<h2 className="font-bold text-2xl sm:text-4xl">Resolutionize Your Agricultural Commodity Purchase with Web3 Technology</h2>
							<p className="text-sm sm:text-base tracking-wide leading-5">Discover a new era of agricultural trading where blockchain technology connects you directly with African farmers. Enjoy transparent, decentralized transactions that eliminate the need for middlemen, empowering you to make ethical, informed purchases while supporting sustainable farming practices. With end-to-end traceability and automated logistics, buying commodities has never been more secure or efficient</p>
							<Button
								variant={"secondary"}
								className="font-bold p-5">
								Explore
							</Button>
						</div>
					</div>
					<div className="">
						<Image
							src={"/heroImage.png"}
							alt={"hero image"}
							width={2200}
							height={2200}
						/>
					</div>
				</section>

				{/* why buy section */}
				<section className="relative bg-red-500">
					<div className="bg-green-500 h-[230px] w-full relative flex items-start justify-center flex-col gap-y-4 px-5 lg:px-10 ">
						<Image
							src="/marketPlace.png"
							fill
							alt="marketplace"
							className="object-cover absolute top-0 left-0"
						/>
						<div className="absolute inset-0 bg-green-500 opacity-50 z-0"></div>
						<h2 className="text-white relative z-10 font-black text-4xl lg:text-6xl">Why Buy With AgroXchange</h2>
						<Button
							variant={"secondary"}
							className="font-bold relative z-10"
							size={"sm"}>
							SEARCH
						</Button>
					</div>
					<div className="bg-[#3E9B42] flex flex-col gap-y-6 lg:flex-row p-6 lg:p-12 lg:gap-x-5">
						<div className="flex flex-col bg-[#2F7532] p-7 rounded-[50px] pt-10 gap-y-3 flex-1">
							<Image
								src={"/scale.svg"}
								alt={"scale"}
								width={50}
								height={50}
							/>
							<h3 className="text-white font-semibold text-xl leading-tight">Direct Access via Decentralized Marketplace</h3>
							<p className="text-white">Connect directly with African farmers, bypassing intermediaries, on a decentralized platform for transparent and fair trade</p>
						</div>

						<div className="flex flex-col bg-[#2F7532] p-7 rounded-[50px] pt-10 gap-y-3 flex-1">
							<Image
								src={"/blockchain.svg"}
								alt={"blockchain"}
								width={50}
								height={50}
							/>
							<h3 className="text-white font-semibold text-xl leading-tight">Blockchain-Powered Transaction</h3>
							<p className="text-white">Every transaction is verified and secured on the blockchain, ensuring trustless, immutable records without the need for third parties.</p>
						</div>

						<div className="flex flex-col bg-[#2F7532] p-7 rounded-[50px] pt-10 gap-y-3 flex-1">
							<Image
								src={"/clock.svg"}
								alt={"clock"}
								width={50}
								height={50}
							/>
							<h3 className="text-white font-semibold text-xl leading-tight">Real-Time Pricing with On-Chain Data</h3>
							<p className="text-white">Stay updated with real-time, on-chain price feeds that keeps you up-to-date on current market conditions</p>
						</div>

						<div className="flex flex-col bg-[#2F7532] p-7 rounded-[50px] pt-10 gap-y-3 flex-1">
							<Image
								src={"/trustless.svg"}
								alt={"trustless"}
								width={50}
								height={50}
							/>
							<h3 className="text-white font-semibold text-xl leading-tight">Smart Contracts for Trustless Deals</h3>
							<p className="text-white">AgorXchange employs smart contracts to automate transactions, guaranteeing that payments and deliveries meet agreed terms</p>
						</div>
					</div>
				</section>

				{/* agroxchange products */}
				<section className="py-10">
					<h2 className="text-[#265E28] font-bold text-4xl lg:text-5xl py-5">AgroXchange Products</h2>
					<div className="flex flex-col gap-y-7 lg:flex-row lg:gap-x-5">
						<div className="flex flex-col bg-[#6AAC6D] p-5 rounded-[15px] gap-y-2 h-[450px]">
							<Image
								src={"/seeds.png"}
								alt={"seeds"}
								width={400}
								height={600}
							/>
							<h3 className="text-white font-semibold leading-tight">Fresh Vegetable and Pepper</h3>
							<p className="text-white">100% freshly fetch from farm and ready for delivery</p>
							<p className="font-semibold">US$40</p>
							<p>Min. order: 20metric tons</p>
						</div>

						<div className="flex flex-col bg-[#6AAC6D] p-5 rounded-[15px] gap-y-2 h-[450px]">
							<Image
								src={"/seeds.png"}
								alt={"seeds"}
								width={400}
								height={600}
							/>
							<h3 className="text-white font-semibold leading-tight">Fresh Vegetable and Pepper</h3>
							<p className="text-white">100% freshly fetch from farm and ready for delivery</p>
							<p className="font-semibold">US$40</p>
							<p>Min. order: 20metric tons</p>
						</div>

						<div className="flex flex-col bg-[#6AAC6D] p-5 rounded-[15px] gap-y-2 h-[450px]">
							<Image
								src={"/seeds.png"}
								alt={"seeds"}
								width={400}
								height={600}
							/>
							<h3 className="text-white font-semibold leading-tight">Fresh Vegetable and Pepper</h3>
							<p className="text-white">100% freshly fetch from farm and ready for delivery</p>
							<p className="font-semibold">US$40</p>
							<p>Min. order: 20metric tons</p>
						</div>

						<div className="flex flex-col bg-[#6AAC6D] p-5 rounded-[15px] gap-y-2 h-[450px]">
							<Image
								src={"/seeds.png"}
								alt={"seeds"}
								width={400}
								height={600}
							/>
							<h3 className="text-white font-semibold leading-tight">Fresh Vegetable and Pepper</h3>
							<p className="text-white">100% freshly fetch from farm and ready for delivery</p>
							<p className="font-semibold">US$40</p>
							<p>Min. order: 20metric tons</p>
						</div>
					</div>
				</section>

				{/* how AgroXchange works */}
				<section>
					<h2 className="text-[#265E28] font-bold text-4xl py-5 lg:w-[50%]">How AgroXchange Works with Web3</h2>
					<div className="flex flex-col lg:flex-row gap-x-5 w-full">
						<div className="flex flex-col gap-y-5 flex-1">
							<div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5">
								<div className="flex flex-col bg-[#2F7532] p-7 rounded-[50px] pt-10 gap-y-3 w-full lg:w-[300px]">
									<Image
										src={"/scale.svg"}
										alt={"scale"}
										width={50}
										height={50}
									/>
									<h3 className="text-white font-semibold text-xl leading-tight">Connect Your Wallet</h3>
									<p className="text-white">Use your Web3 wallet to sign in and access the marketplace. Buy produce seamlessly using Ethereum, Stablecoins, or other supported tokens</p>
								</div>

								<div className="flex flex-col bg-[#2F7532] p-7 rounded-[50px] pt-10 gap-y-3 w-full lg:w-[300px]">
									<Image
										src={"/listing.svg"}
										alt={"scale"}
										width={50}
										height={50}
									/>
									<h3 className="text-white font-semibold text-xl leading-tight">Browse On-Chain Listing</h3>
									<p className="text-white">Filler products by commodity type, price, and region, all with real-time blockchain updates for pricing and availability</p>
								</div>
							</div>
							<div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5">
								<div className="flex flex-col bg-[#2F7532] p-7 rounded-[50px] pt-10 gap-y-3 w-full lg:w-[300px]">
									<Image
										src={"/cart.svg"}
										alt={"scale"}
										width={50}
										height={50}
									/>
									<h3 className="text-white font-semibold text-xl leading-tight">Purchase</h3>
									<p className="text-white">Once you place an order, the transaction is secured via smart contracts, automating payment and ensuring that funds are only released when goods are delivered</p>
								</div>

								<div className="flex flex-col bg-[#2F7532] p-7 rounded-[50px] pt-10 gap-y-3 w-full lg:w-[300px]">
									<Image
										src={"/message.svg"}
										alt={"scale"}
										width={50}
										height={50}
									/>
									<h3 className="text-white font-semibold text-xl leading-tight">Receive Goods and Confirm Delivery</h3>
									<p className="text-white">Filler products by commodity type, price, and region, all with real-time blockchain updates for pricing and availability</p>
								</div>
							</div>
						</div>

						<div className="flex-1 flex items-center justify-center mt-5 lg:mt-0">
							<Image
								src={"/workingImage.png"}
								alt="working"
								width={500}
								height={500}
							/>
						</div>
					</div>
				</section>

				{/* discovery section */}
				<section className="py-16">
					<h2 className="font-bold text-4xl py-5 w-full lg:w-[50%]">AgroXchange Discovery</h2>

					<div className="flex flex-col lg:flex-row gap-x-5 w-full items-center">
						<div className="flex flex-col gap-y-5 flex-1">
							<div className="flex bg-[#2F7532] p-7 rounded-[50px] pt-10 gap-x-10 pl-12">
								<Image
									src={"/logistics.svg"}
									alt={"logistics"}
									width={70}
									height={70}
								/>
								<div>
									<h3 className="text-white font-semibold text-xl leading-tight">LOGISTICS</h3>
									<p className="text-white">Our platform ensures transparency and safe delivery of purchased items.</p>
								</div>
							</div>

							<div className="flex bg-[#2F7532] p-7 rounded-[50px] pt-10 gap-x-5 pl-12">
								<div>
									<h3 className="text-white font-semibold text-xl leading-tight">DISPUTE RESOLUTION</h3>
									<p className="text-white">Confirm delivery and click to scan QR Code upon satisfactory quality and safe delivery.</p>
								</div>
								<Image
									src={"/qrcode.svg"}
									alt={"logistics"}
									width={70}
									height={70}
								/>
							</div>
						</div>

						<div className="flex justify-center mt-5 lg:mt-0">
							<Image
								src={"/delivery.png"}
								alt="delivery"
								width={500}
								height={500}
							/>
						</div>
					</div>
				</section>
			</main>
			{/* footer */}
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
