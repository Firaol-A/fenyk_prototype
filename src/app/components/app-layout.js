"use client";

import Image from "next/image";
import Link from "next/link";
import {useAuth} from "@/app/_utils/auth-context";
import {useRouter} from "next/navigation";

export default function AppLayout({children}) {

    const {logout} = useAuth();
    const router = useRouter();

    const navItems = [
        {navName: 'SCHEDULE', navPath: '/icons/calendar-event-fill.svg'},
        {navName: 'NOTICES', navPath: '/icons/megaphone-fill.svg'},
        {navName: 'CALENDAR', navPath: '/icons/pin-angle-fill.svg'},
        {navName: 'FILES', navPath: '/icons/folder-fill.svg'},
    ]

    function getNavItems(item) {
        return (
            <div className={"flex flex-row items-center mb-5 hover:cursor-pointer"}
                 onClick={() => router.push(item.navName)}>
                <Image
                    key={item}
                    src={item.navPath}
                    alt={""}
                    width={32}
                    height={32}
                    className="mr-2"
                />
                <p>{item.navName}</p>
            </div>
        );
    }

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };
    return (
        <div className="h-screen w-screen flex">
            {/* nav bar */}
            <div className="w-45 bg-[#0D2636] text-white flex flex-col items-center py-6">
                <Link href={"/home"}>
                    <Image
                        src="/images/Fenyk_logo_2.png"
                        alt="FENYK Logo"
                        width={150}
                        height={150}
                        className="mb-8"
                    />
                </Link>
                <ul>
                    {navItems.map(getNavItems)}
                </ul>
                <button
                    onClick={handleLogout}
                    className="mt-auto bg-[#F6F6F6] text-black font-bold px-4 py-3 rounded-lg hover:opacity-90 transition w-40 hover:cursor-pointer"
                >
                    SIGN OUT
                </button>
            </div>

            {/* top bar, content*/}
            <div className="flex-1 flex flex-col">
                {/* top bar */}
                <div className="h-20 w-full bg-[#0D2636] flex items-center px-5 text-white justify-end gap-7">
                    <Image
                        onClick={() => router.push("/notifications")}
                        src={"icons/bell-fill.svg"}
                        alt={""}
                        width={40}
                        height={40}
                        className="hover:cursor-pointer"
                    />
                    <Image
                        onClick={() => router.push("/profile")}
                        src={"icons/person-circle.svg"}
                        alt=""
                        width={40}
                        height={40}
                        className="hover:cursor-pointer"
                    />
                </div>
                {/* main content goes here */}
                <div className="flex-1 bg-[#F6F6F6] overflow-y-auto py-5">
                    {children}
                </div>
            </div>
        </div>
    );
}
