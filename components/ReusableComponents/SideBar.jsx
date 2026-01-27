"use client"
import { useRouter } from "next/navigation";
import React from "react";

const SideBar = () => {
  const menus = [
    { title: "Hero Section", link: "/hero" },
    {
      title: "About",
      link: "/about",
    },
    { title: "Testimonial", link: "/testimonial" },
    { title: "FAQ's", link: "/faq" },
  ];
  const router = useRouter();
  return (
    <div className="w-64 h-screen bg-gray-700 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Sidebar Menu</h2>
      <div>
        {menus?.map((menu, index) => (
          <div key={index} className="mb-4">
            <h1
              onClick={() => router.push(`/admin/${menu?.link}`)}
              className="text-md cursor-pointer hover:text-gray-400"
            >
              {menu?.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
