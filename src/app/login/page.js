"use client";

import {useEffect, useState} from "react";
import {auth} from "@/app/_utils/firebase-config";
import {signInWithEmailAndPassword} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAuth} from "@/app/_utils/auth-context";

export default function LoginPage() {
    const {user} = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            router.push("/home");
        }
    }, [user, router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/home");
        } catch (error) {
            console.error(error);
            setError("Password or email is incorrect. Please try again.");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="h-screen w-screen flex">
            <div className="w-1/2 bg-[#0D2636] flex items-center justify-center">
                <Image
                    src="/images/Fenyk_logo_login.png"
                    alt="FENYK Logo"
                    width={300}
                    height={300}
                    priority
                />
            </div>

            <div className="w-1/2 bg-[#F6F6F6] flex flex-col items-center justify-center">
                {/* Top text (outside white box) */}
                <h2 className="text-xl font-medium mb-4 -mt-10">
                    Hey there! Sign in to get started.
                </h2>

                <div className="bg-white border border-black rounded-md p-8 w-96 shadow-sm">
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div>
                            <label className="block font-medium text-gray-800 mb-1">
                                Email
                            </label>
                            <input
                                type="text"
                                inputMode="email"
                                className="w-full p-2 border rounded-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-800 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full p-2 border rounded-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#0D2636] text-white py-4 rounded-lg hover:opacity-90 transition w-full"
                        >
                            SIGN IN
                        </button>
                        <h1>Forgot Password?</h1>

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                    </form>
                </div>

                <div className="w-96 flex justify-end mt-3">
                    <Link href=" ../register">
                        <button className="bg-[#0D2636] text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
