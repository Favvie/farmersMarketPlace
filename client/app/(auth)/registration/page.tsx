import BuyerRegistration from '@/componentsx/buyer-registration';
import { SidebarContent } from '@/componentsx/login/sidebar-content';

function Registration() {
  return (
    <div className="flex h-screen">

      <div className="w-1/3 relative">

        <div
          className="absolute inset-0 opacity-10  bg-[url('/bg.jpeg')] bg-cover bg-center"
        ></div>

        <div className="relative z-10 h-full flex items-center justify-center p-8">
          <SidebarContent/>
        </div>
      </div>


      <div className="w-full bg-green-300 p-12 flex flex-col items-center justify-center">
        <BuyerRegistration />
      </div>
    </div>

  )
}

export default Registration