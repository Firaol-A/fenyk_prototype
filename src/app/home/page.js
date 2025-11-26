"use client";

import { useAuth } from "../firebase/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  return (
    <div>
      <h1>Home Page</h1>

      <button
        onClick={handleLogout}
        className="mt-4 bg-[#0D2636] text-white px-4 py-2 rounded hover:opacity-90 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
