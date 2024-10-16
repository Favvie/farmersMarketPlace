import Image from "next/image"
import delivery from "@/assets/images/Mask .png";

export function SidebarContent() {
    return (
        <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center">
                <Image src={delivery} alt="MetaMask img" width={80} height={80} />
                <span className="text-2xl font-bold text-customGreen ml-2">AgroXchange</span>
            </div>

            <Image src="/Frame 50.png" alt="facts image" width={350} height={185} />

            <p className="text-gray-700 w-[350px]">
                AgroXchange, is revolutionizing agricultural markets by enabling decentralized trading of agricultural commodities. Leveraging blockchain to enhance transparency and traceability in supply chains.
            </p>
        </div>
    )
}