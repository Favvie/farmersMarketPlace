import Image from "next/image";
import image1 from "../assets/images/meta.png";
import image2 from "../assets/images/solana.png";
import image3 from "../assets/images/another.png";

export default function LoginScreen() {
    return (
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="w-1/3 bg-[url('/placeholder.svg?height=1080&width=640')] bg-cover bg-center p-8 flex flex-col justify-between">
          <div className="flex items-center text-green-500">
            <svg className="w-10 h-10 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-12 2c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46c-1.23-.93-2.78-1.48-4.46-1.48-4.42 0-8 3.58-8 8s3.58 8 8 8c1.68 0 3.23-.55 4.46-1.48l-1.46-1.46c-.83.45-1.79.7-2.8.7-3.31 0-6-2.69-6-6z" />
            </svg>
            <span className="text-2xl font-bold">AgroXchange</span>
          </div>
          <div>
            <p className="text-white mb-4">Select you Category</p>
            <button className="bg-green-500 text-white px-8 py-2 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
              Buyer
            </button>
          </div>
        </div>
  
        {/* Right Section */}
        <div className="w-2/3 bg-green-800 p-12 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">Link Your Personal Wallet</h1>
          <p className="text-xl text-white mb-8">Select your personal wallet to access the marketplace</p>
          
          <div className="flex space-x-8 mb-8">
              <Image src={image1} alt="MetaMask img" className="h-30 w-30" />
              <Image src={image2} alt="MetaMask img" className="h-30 w-30" />
              <Image src={image3} alt="MetaMask img" className="h-30 w-30" />

          </div>
  
          <div className="flex items-center w-full mb-8">
            <div className="flex-grow h-px bg-white"></div>
            <span className="px-4 text-white">or</span>
            <div className="flex-grow h-px bg-white"></div>
          </div>
  
          <input
            type="email"
            placeholder="Enter your Email Address Here"
            className="w-full p-3 rounded-lg mb-4"
          />
  
          <button className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition duration-300 mb-4">
            Continue
          </button>
  
          <p className="text-white">Sign up if you are not a registered users</p>
        </div>
      </div>
    )
  }