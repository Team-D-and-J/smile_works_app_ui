"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopHeader from "../components/TopHeader";
import LeftNavigation from "../components/LeftNavigation";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  // useEffect(() => {
  //   const verifyToken = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       setLoading(false);
  //       if (pathname !== "/login") {
  //         router.replace("/login");
  //       }
  //       return;
  //     }
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify`,
  //         {
  //           headers: { Authorization: `JWT ${token}` },
  //         }
  //       );
  //       if (res.ok) {
  //         setLoading(false);
  //       } else {
  //         localStorage.removeItem("token");
  //         if (pathname !== "/login") {
  //           router.replace("/login");
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Verification error:", err);
  //       localStorage.removeItem("token");
  //       if (pathname !== "/login") {
  //         router.replace("/login");
  //     }
  //   }
  // };

  //   verifyToken();
  // }, [pathname, router]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* {loading ? (
          <p>Loading Spinner</p>
        ) : isLoginPage ? (
          children
        ) : ( */}
        <>
          <TopHeader />
          <div className="flex">
            <LeftNavigation />
            {children}
          </div>
        </>
        ){/* } */}
      </body>
    </html>
  );
}
