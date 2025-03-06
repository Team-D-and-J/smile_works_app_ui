"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopHeader from "../components/TopHeader";
import LeftNavigation from "../components/LeftNavigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const res = await fetch("/api/login/verify", {
          headers: { Authorization: `JWT ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setLoading(false);
          }
        } else {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch (err) {
        console.error("Verification error:", err);
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {loading ? (
          <p>loading spinner</p>
        ) : (
          <>
            <TopHeader />
            <div className="flex">
              <LeftNavigation />
              {children}
            </div>
          </>
        )}
      </body>
    </html>
  );
}
