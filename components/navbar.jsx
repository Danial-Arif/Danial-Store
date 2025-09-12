"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar select-none flex justify-between items-center px-6  md-px-18 lg:px-32 py-4 bg-white text-black border-b border-black">
      {/* Logo */}
      <div className="logo">
        <img
          src="https://quickcart.greatstack.in/_next/static/media/logo.83ad3901.svg"
          alt="Logo"
          className="h-8 cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>

      <div className="hidden md:flex gap-10">
        <button onClick={() => router.push("/")} className="hover:text-orange-500">Home</button>
        <button onClick={() => router.push("/shop")} className="hover:text-orange-500">Shop</button>
        <button onClick={() => router.push("/")} className="hover:text-orange-500">About Us</button>
      </div>

      <div className="hidden md:flex gap-6 items-center">
        {session ? (
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 hover:bg-gray-300 border border-black rounded-3xl px-3 py-1.5"
          >
            <img
              src={session.user?.image || "/icons/user.png"}
              className="w-5 h-5 rounded-full"
              alt="User"
            />
            {session.user?.name || "Account"}
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 hover:bg-gray-300 border border-black rounded-3xl px-3 py-1.5"
          >
            <img src="/icons/user.png" className="w-5 h-5" alt="Login" />
            Login
          </button>
        )}
      </div>

      <button
        className="md:hidden p-2 border border-black rounded-lg"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden z-50">
          <button onClick={() => {router.push("/"); setMenuOpen(false);}} className="hover:text-orange-500">Home</button>
          <button onClick={() => {router.push("/shop"); setMenuOpen(false);}} className="hover:text-orange-500">Shop</button>
          <button onClick={() => {router.push("/about"); setMenuOpen(false);}} className="hover:text-orange-500">About Us</button>

          {session ? (
            <button
              onClick={() => {router.push("/dashboard"); setMenuOpen(false);}}
              className="flex items-center gap-2 hover:bg-gray-300 border border-black rounded-3xl px-3 py-1.5"
            >
              <img
                src={session.user?.image || "/icons/user.png"}
                className="w-5 h-5 rounded-full"
                alt="User"
              />
              {session.user?.name || "Account"}
            </button>
          ) : (
            <button
              onClick={() => {router.push("/login"); setMenuOpen(false);}}
              className="flex items-center gap-2 hover:bg-gray-300 border border-black rounded-3xl px-3 py-1.5"
            >
              <img src="/icons/user.png" className="w-5 h-5" alt="Login" />
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
