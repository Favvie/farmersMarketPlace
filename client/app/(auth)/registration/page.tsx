import RegistrationScreen from '@/components/registration'
import React from 'react'
import Image from 'next/image'
import delivery from "@/assets/images/Mask .png";

function Registration() {
  return (
    <div className="flex h-screen">

      <div className="w-1/3 relative">
     
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/bg.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative z-10 h-full flex items-center justify-center p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center">
              <Image src={delivery} alt="MetaMask img" width={80} height={80} />
              <span className="text-2xl font-bold text-customGreen ml-2">AgroXchange</span>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-black mb-6 text-xl font-bold">Select your Category</p>
              <button className="bg-green-600 text-white text-xl font-semibold px-8 py-2 border border-white w-full shadow-gray-500 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
                Farmer/Buyer
              </button>
            </div>
          </div>
        </div>
      </div>

  
      <div className="w-2/3 bg-green-300 p-12 flex flex-col items-center justify-center">
        <RegistrationScreen />
      </div>
    </div>
  )
}

export default Registration