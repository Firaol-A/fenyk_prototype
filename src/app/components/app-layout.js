"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../firebase/auth-context";
import { useRouter } from "next/navigation";

export default function AppLayout({ children }) {

    const { logout } = useAuth();
    const router = useRouter();


  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  return (
    <div className="h-screen w-screen flex">
      {/* nav bar */}
      <div className="w-58 bg-[#0D2636] text-white flex flex-col items-center py-6">
        
        <Image
          src="/images/Fenyk_logo_2.png"
          alt="FENYK Logo"
          width={150}
          height={150}
          className="mb-8"
        />

        <button
          onClick={handleLogout}
          className="mt-auto bg-[#F6F6F6] text-black font-bold px-4 py-3 rounded-lg hover:opacity-90 transition w-50"
        >
          SIGN OUT
        </button>
      </div>

      {/* top bar, content*/}
      <div className="flex-1 flex flex-col">
        {/* top bar */}
        <div className="h-20 w-full bg-[#0D2636] flex items-center justify-between px-8 text-white">
      
        </div>

        {/* main content goes here */}
        <div className="flex-1 bg-[#F6F6F6] p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
