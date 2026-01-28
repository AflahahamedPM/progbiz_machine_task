"use client";
import useAlert from "@/hooks/useAlert";
import APIRequest from "@/utils/APIRequest";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const loginInitialState = {
  email: "",
  password: "",
};

const AdminLogin = () => {
  const router = useRouter();
  const [loginDetails, setLoginDetails] = useState(loginInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const { publishNotification } = useAlert();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!loginDetails?.email) {
        publishNotification("Email is required", "error");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(loginDetails?.email)) {
        publishNotification("Please enter a valid email address", "error");
        return;
      }
      if (!loginDetails?.password) {
        publishNotification("password is required", "error");
        return;
      }
      setIsLoading(true);
      const response = await APIRequest.request(
        "POST",
        "/api/admin",
        JSON.stringify(loginDetails),
      );
      if (response?.success && response?.status === 200) {
        publishNotification("Loggin successfull", "success");
        localStorage.setItem("logginDetails", JSON.stringify(response?.data));
        router.push("/admin/hero");
      } else {
        publishNotification(response?.message, "error");
      }
    } catch (error) {
      publishNotification("Error logging in", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value, field) => {
    setLoginDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="border border-gray-300 flex flex-col justify-center items-center p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form className="w-full max-w-md" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleChange(e.target.value, "email")}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleChange(e.target.value, "password")}
          />
          <button
            type="submit"
            className="w-full bg-gray-500 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
