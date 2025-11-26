"use client";

import { useAuth } from "../firebase/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppLayout from "../components/app-layout";

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
      <h1>dashboard</h1>
    </AppLayout>
  );
}
