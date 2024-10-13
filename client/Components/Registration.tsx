import Image from "next/image";
import bgImage from "../assets/images/bg.jpeg";
import delivery from "../assets/images/Mask .png";


export default function RegistrationScreen() {
    return (
      <div className="flex h-screen">
        {/* Left side */}
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
   <form className="space-y-6 w-full">
          <div className="flex items-center space-x-4">
            <label htmlFor="country" className="text-gray-700 text-xl text-right font-bold ">Country/Location:</label>
            <input type="text" id="country" className="border rounded-3xl mb-4 p-3 flex-1 py-5" />
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="fullname" className="text-gray-700 text-xl text-right font-bold ">Full Name:</label>
            <div className="flex space-x-2 flex-1">
              <input type="text" id="firstname" className="border rounded-3xl mb-4  p-3 flex-1 py-5" placeholder="First Name" />
              <input type="text" id="lastname" className="border rounded-3xl mb-4  p-3 flex-1 py-5" placeholder="Last Name" />
            </div>
          </div>
          <div className="flex items-center space-x-4 pl-28">
            <label htmlFor="tel" className="text-gray-700 text-xl text-right font-bold">Tel:</label>
            <div className="flex space-x-2 flex-1">
              <input type="text" id="tel-1" className="border rounded-3xl mb-4 p-3 w-1/6 py-5" />
              <input type="text" id="tel-2" className="border rounded-3xl mb-4 p-3 w-1/6 py-5" />
              <input type="text" id="tel-3" className="border rounded-3xl mb-4  p-3 w-1/2 py-5" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <input type="checkbox" id="terms" className="mr-2 p-2" />
            <label htmlFor="terms" className="text-gray-700 font-bold text-xl m-4 ">
              I agree to free membership terms and aggrement
            </label>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-green-700 text-white px-8 py-2 rounded-2xl text-lg font-semibold">
              Register
            </button>
          </div>
        </form>
        </div>
      </div>
    )
  }