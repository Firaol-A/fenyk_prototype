import {Figtree} from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/app/_utils/auth-context";

const figtree = Figtree({
    variable: "--font-figtree"
})

export const metadata = {
    title: "Fenyk Prototype",
    description: "Capstone project prototype",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body
            className={`${figtree.variable} antialiased`}
        >
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}