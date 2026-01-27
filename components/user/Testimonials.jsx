"use client";
import useAlert from "@/hooks/useAlert";
import APIRequest from "@/utils/APIRequest";
import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  const { publishNotification } = useAlert();

  useEffect(() => {
    getAllTestimonials();
  }, []);

  const getAllTestimonials = async () => {
    try {
      const response = await APIRequest?.request("GET", "/api/testimonial");
      if (response?.success && response?.status === 200) {
        setTestimonials(response?.data);
      } else {
        publishNotification(response?.message, "error");
      }
    } catch (error) {
      console.log("Error fetching testimonials:", error);
      publishNotification("Error fetching testimonials", "error");
    }
  };
  return (
    <div className="bg-[#F4F5F6] py-10 px-10 flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-semibold text-[#23262F] w-1/3 text-center">
        Our Users Feel the Transformation
      </h1>
      <h1 className="text-[#777E90] text-lg w-1/3 text-center">Real Stories from People Empowered by Personalized Wellness</h1>
    </div>
  );
};

export default Testimonials;
