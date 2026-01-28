"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../assets/reppoLogo.png";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import avatar from "@/assets/avatar.png";

const Header = () => {
  const router = useRouter();
  const [logginDetails, setLogginDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("logginDetails");
    if (data) setLogginDetails(JSON.parse(data));
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!logginDetails?.name);
  }, [logginDetails]);

  const handleLogout = () => {
    localStorage.removeItem("logginDetails");
    setLogginDetails(null);
  };

  return (
    <div className="flex justify-between p-4 border-b">
      <Image src={logo} width={130} height={30} alt="logo" />

      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <Image
            src={avatar}
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h1>{logginDetails?.name}</h1>
            <h1 className="text-[#667085] text-sm">{logginDetails?.email}</h1>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-white hover:bg-white text-[#5797FF] border border-[#5797FF] rounded-xl"
          >
            Log out
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => router.push("/admin/login")}
          className="bg-white hover:bg-white text-black border-[#00000008] border-2 rounded-xl px-5 py-5"
        >
          Admin Login
        </Button>
      )}
    </div>
  );
};

export default Header;
