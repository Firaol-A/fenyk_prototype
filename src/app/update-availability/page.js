"use client";
import { useAuth } from "../firebase/auth-context";
import { useRouter } from "next/navigation";
import AppLayout from "../components/app-layout";
import { useState } from "react";

export default function UpdateAvailabilityPage() {
    const { user } = useAuth();
    const router = useRouter();
   
    return (
        <AppLayout>
            <div>   
                <h1 className={"font-extrabold text-3xl text-center mt-5"}>YOUR AVAILABILITY</h1>
                <p className={"text-center text-[#0D2636] text-2xl mt-3 mb-10"}>Set your working preferences below</p>
                
                        <div className="flex justify-center mt-6">
                            <button type="submit" className="bg-[#0D2636] text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition">
                                SAVE AVAILABILITY
                            </button>
                        </div>
                
            </div>
        </AppLayout>
    );
}
