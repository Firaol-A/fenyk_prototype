"use client";

import { useState } from "react";
import { auth, db } from "@/app/_utils/firebase-config";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [registrationCode, setRegistrationCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!registrationCode || !email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const codeRef = collection(db, "registrationCodes");
      const q = query(codeRef, where("code", "==", registrationCode));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid registration code.");
        setLoading(false);
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
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
        <h2 className="text-xl font-medium mb-4 -mt-10">
          Hey there! Register to get started.
        </h2>

        <div className="bg-white border border-black rounded-md p-8 w-96 shadow-sm">
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Registration Code
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="9-character code"
                value={registrationCode}
                onChange={(e) => setRegistrationCode(e.target.value)}
              />
            </div>

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

            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#0D2636] text-white py-4 rounded-lg hover:opacity-90 transition w-full mt-2 disabled:opacity-50"
            >
              {loading ? "REGISTERING..." : "REGISTER"}
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>
        </div>

        <div className="w-96 flex justify-end mt-3">
          <Link href="/login">
            <button className="bg-[#0D2636] text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
