"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/reppoLogo.png";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const router = useRouter();
  return (
    <div className="ml-auto mr-10 w-[95%] p-4 mt-4 bg-gray-100 rounded-lg h-16">
      <div className="flex justify-between items-center">
        <Image src={logo} alt="Logo" width={120} height={40} />

        <h1 className="text-md cursor-pointer" onClick={() => router.push("/")}>Return to home page</h1>
      </div>
    </div>
  );
};

export default TopBar;
