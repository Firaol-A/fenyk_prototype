"use client";

import { useAuth } from "../firebase/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppLayout from "../components/app-layout";
import Image from "next/image";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <AppLayout>
        <div>
            <Image
                src="/images/dashboardPlaceHolder.png"
                alt="Logo"
                width={1100}
                height={1100}
                className=""
            />
        </div>
    </AppLayout>
  );
}
