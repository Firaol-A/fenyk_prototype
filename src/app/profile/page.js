"use client";


import AppLayout from "../components/app-layout";
import { useAuth } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <AppLayout>
      <div>
        <h1 className={"font-bold text-3xl text-center mt-5"}>YOUR PROFILE</h1>
        <div>
          <div className="ml-15 mt-45">
            <label htmlFor="email" className={"flex flex-col"}>
              Email
              <input
                disabled={true}
                className={
                  "border-1 border-[@668F80] rounded-md w-1/4 text-left pl-0.5 mb-4 p-1.5"
                }
                placeholder={user ? user.email : "Not logged in"}
              ></input>
            </label>
            <p>Password</p>
            <input
              disabled={true}
              className={
                "border-1 border-[@668F80] rounded-md w-1/4 text-left pl-0.5 p-1.5 mb-4"
              }
              placeholder={"●●●●●●●●●●●●●"}
            ></input>
            <p>Role</p>
            <input
              disabled={true}
              className={
                "border-1 border-[@668F80] rounded-md w-1/4 text-left pl-0.5 p-1.5"
              }
              placeholder={"Barista"}
            ></input>
          </div>
          <div className={" ml-15 mt-25"}>
            <button className="mx-auto bg-[#0D2636] text-[#F6F6F6] font-bold px-4 py-3 rounded-lg">
              CHANGE PASSWORD
            </button>
          </div>
          <div className={"flex justify-end mr-70"}>
            <button
              onClick={() => router.push("/update-availability")}
              className=" bg-[#0D2636] text-[#F6F6F6] font-bold px-4 py-3 rounded-lg hover:opacity-90 transition"
            >
              UPDATE AVAILABILITY
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
