export default function Component() {
    return (
      <div className="flex h-screen">
        {/* Left side */}
        <div className="w-1/2 bg-[url('/placeholder.svg?height=1080&width=960')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <div className="text-white text-4xl font-bold mb-8 flex items-center">
              <svg className="w-12 h-12 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13.5V16H4V13.5H7Z" fill="currentColor" />
                <path d="M10 10.5V13H7V10.5H10Z" fill="currentColor" />
                <path d="M13 7.5V10H10V7.5H13Z" fill="currentColor" />
                <path d="M16 4.5V7H13V4.5H16Z" fill="currentColor" />
                <path d="M19 1.5V4H16V1.5H19Z" fill="currentColor" />
                <path d="M21 1.5H19.5V21H21V1.5Z" fill="currentColor" />
                <path d="M3 13.5H4.5V21H3V13.5Z" fill="currentColor" />
              </svg>
              AgroXchange
            </div>
            <div className="text-white text-xl mb-4">Select you Category</div>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full text-lg font-semibold">
              Farmer/Buyer
            </button>
          </div>
        </div>
  
        {/* Right side */}
        <div className="w-1/2 bg-green-200 p-8 overflow-y-auto">
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="country" className="text-gray-700 mb-1">Country/Region:</label>
              <input type="text" id="country" className="border rounded p-2" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 mb-1">Email:</label>
              <input type="email" id="email" className="border rounded p-2" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700 mb-1">Login Password:</label>
              <input type="password" id="password" className="border rounded p-2" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirm-password" className="text-gray-700 mb-1">Confirm Password:</label>
              <input type="password" id="confirm-password" className="border rounded p-2" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="company" className="text-gray-700 mb-1">Company Name:</label>
              <input type="text" id="company" className="border rounded p-2" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fullname" className="text-gray-700 mb-1">Full Name:</label>
              <div className="flex space-x-2">
                <input type="text" id="firstname" className="border rounded p-2 w-1/2" placeholder="First Name" />
                <input type="text" id="lastname" className="border rounded p-2 w-1/2" placeholder="Last Name" />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="tel" className="text-gray-700 mb-1">Tel:</label>
              <div className="flex space-x-2">
                <input type="text" id="tel-1" className="border rounded p-2 w-1/4" />
                <input type="text" id="tel-2" className="border rounded p-2 w-1/4" />
                <input type="text" id="tel-3" className="border rounded p-2 w-1/2" />
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to free membership terms and aggrement
              </label>
            </div>
            <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-full text-lg font-semibold w-full">
              Sign up
            </button>
          </form>
        </div>
      </div>
    )
  }