import Image from "next/image";
import image1 from "../assets/images/meta.png";
import image2 from "../assets/images/solana.png";
import image3 from "../assets/images/another.png";
import image4 from "../assets/images/Mask .png";
import bgImage from "../assets/images/bg.jpeg";


export default function LoginScreen() {
  return (
    <div className="flex h-screen">
    

      <div
        className="w-1/3 p-8 flex flex-col justify-between relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image src={bgImage} alt="bg" fill className="absolute top-0 left-0 object-cover opacity-10 w-full h-full"/>

        <div className="flex h-screen items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center">

              <Image src={image4} alt="MetaMask img" className="h-20 w-20" />
              <span className="text-2xl font-bold text-customGreen">AgroXchange</span>
            </div>

            <div className="flex flex-col items-center">

              <p className="text-black mb-6 text-xl font-bold">Select your Category</p>
              <button className="bg-green-600 text-white text-xl font-semibold px-8 py-2 border border-white w-11/12 shadow-gray-500 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
                Buyer
              </button>
            </div>
          </div>
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