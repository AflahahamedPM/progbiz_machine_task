"use client";
import Image from "next/image";
import React from "react";
import logo from "../../assets/reppoLogo.png";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between  p-4 border-b">
      <Image src={logo} width={130} height={30} alt="logo" />

      <Button
        onClick={() => {
          router.push("/admin/login");
        }}
        className="bg-white hover:bg-white text-black border-[#00000008] border-2 cursor-pointer rounded-xl px-5 py-5"
      >
        Admin Login
      </Button>
    </div>
  );
};

export default Header;
