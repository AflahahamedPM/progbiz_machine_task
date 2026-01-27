"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AdminLogin = () => {
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/admin/hero");
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="border border-gray-300 flex flex-col justify-center items-center p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form className="w-full max-w-md" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
