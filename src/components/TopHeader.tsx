"use client";
// import Image from "next/image";
import UserAvatar from "./UserAvatar";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import SmileWorksLogo from "./SmileWorksLogo";

const TopNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setUsername(storedName);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        router.replace("/login");
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.message || "Unknown error");
        alert(
          `Logout failed: ${errorData.message || "Please try again later."}`
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      alert(
        "Network error. Please check your internet connection and try again."
      );
    }
  };

  //fetch the user info from the server and display it in the top right corner

  return (
    <div className="flex w-full h-[100px] bg-primary justify-between items-center px-4 shadow-md">
      {/* Left: Logo */}
      <div className="h-full flex flex-col justify-center items-center overflow-hidden">
        <SmileWorksLogo />
      </div>
      <div className="text-5xl text-textLight font-custom drop-shadow-xl">
        Smile Works
      </div>
      <div
        className="relative flex items-center gap-2 p-1 cursor-pointer rounded-md hover:bg-white hover:bg-opacity-15"
        onClick={() => setIsOpen(!isOpen)}
        ref={dropdownRef}
      >
        <div className="flex justify-center items-center cursor-pointer">
          <UserAvatar />
        </div>
        <div className="text-xl text-textLight ">{username}</div>
        {isOpen && (
          <div className="absolute top-11 right-0 bg-white shadow-lg rounded-b-md w-30 ">
            <ul className="text-textDark text-md">
              <li
                className="p-3 hover:bg-gray-200 cursor-pointer border-t"
                onClick={handleLogout}
              >
                Log Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavigation;
