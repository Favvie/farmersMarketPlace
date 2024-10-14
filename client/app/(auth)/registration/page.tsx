import RegistrationScreen from '@/components/registration'
import React from 'react'
import Image from 'next/image'
import bgImage from "@/assets/images/bg.jpeg";
import delivery from "@/assets/images/Mask .png";

function Registration() {
  return (
    <div className="flex h-screen">
    {/* Left side */}
    <div
  
  >
    <Image src={bgImage} alt="bg" fill className="absolute top-0 left-0 object-cover opacity-10 w-full h-full"/>

    <div className="flex h-screen items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center">

          <Image src={delivery} alt="MetaMask img" className="h-20 w-20" />
          <span className="text-2xl font-bold text-customGreen">AgroXchange</span>
        </div>

        <div className="flex flex-col items-center">

          <p className="text-black mb-6 text-xl font-bold">Select your Category</p>
          <button className="bg-green-600 text-white text-xl font-semibold px-8 py-2 border border-white w-11/12 shadow-gray-500 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
            Farmer/Buyer
          </button>
        </div>
      </div>
    </div>

  </div>

    {/* Right side */}
    <div className="w-full bg-green-300 p-12 flex flex-col items-center justify-center">
    <RegistrationScreen/>
    </div>
    </div>
  )
}

export default Registration