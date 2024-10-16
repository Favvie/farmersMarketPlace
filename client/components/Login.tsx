import Image from "next/image";
import image1 from "../assets/images/meta.png";
import image2 from "../assets/images/solana.png";
import image3 from "../assets/images/another.png";
import { SidebarContent } from "./login/sidebar-content";


export default function LoginScreen() {

  //pseudocode
  /**
   * connect wallet
   * check if user is new or already registered
   * if new => router.push("/registration") 
   * if registered  => check if user role is farmer or buyer
   * if farmer => router.push("/dashboard") 
   * if buyer => router.push("/marketplace")
   */

  return (
    <div className="flex h-screen">
      <div
        className="w-1/3 p-8 flex flex-col justify-between relative"
      >
        <div
          className="absolute inset-0 opacity-10  bg-[url('/bg.jpeg')] bg-cover bg-center"
        ></div>

        <div className="flex h-screen items-center justify-center z-50">
          <SidebarContent/>
        </div>

      </div>

      {/* Right Section */}
      <div className="w-2/3 bg-green-800 p-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-8 p-4 leading-10">Link Your Personal Wallet</h1>
        <p className="text-2xl text-white font-semibold mb-12 p-4">Select your personal wallet to access the marketplace</p>

        <div className="flex space-x-8 mb-8">
          <Image src={image1} alt="MetaMask img" className="h-30 w-30" />
          <Image src={image2} alt="MetaMask img" className="h-30 w-30" />
          <Image src={image3} alt="MetaMask img" className="h-30 w-30" />

        </div>


        <button className="w-[269px] h-[65px] bg-[#48B94D] mt-4 text-white font-semibold text-3xl leading-7 rounded-[15px] hover:bg-green-600 transition duration-300">
          Connect Wallet
        </button>

      </div>
    </div>
  )
}