"use client";
import useAlert from "@/hooks/useAlert";
import APIRequest from "@/utils/APIRequest";
import { Avatar } from "@fluentui/react-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useLayoutEffect, useState } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  const { publishNotification } = useAlert();

  useLayoutEffect(() => {
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

  const handleChange = (move) => {
    if (move === "next") {
      setCurrentIndex((prev) => prev + 1);
    } else if (move === "previous") {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const startIndex =
    currentIndex + 3 > testimonials.length
      ? Math.max(testimonials.length - 3, 0)
      : currentIndex;

  return (
    <div className="bg-[#F4F5F6] py-10 px-10 flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-semibold text-[#23262F] w-1/3 text-center">
        Our Users Feel the Transformation
      </h1>
      <h1 className="text-[#777E90] text-lg w-1/3 text-center">
        Real Stories from People Empowered by Personalized Wellness
      </h1>

      <div className="flex justify-center items-center gap-4">
        <button
          disabled={currentIndex === 0}
          onClick={() => handleChange("previous")}
          className="p-1 rounded-full cursor-pointer border border-[#929498] hover:bg-[#3772FF] hover:border-none hover:text-white  text-[#929498]"
        >
          <ChevronLeft size={35} />
        </button>

        {testimonials && (
          <div className="bg-white p-4 rounded-2xl flex flex-col justify-center items-center">
            <h1 className="text-center w-2/3 text-[#23262F] font-medium text-lg mb-4">
              "{testimonials[currentIndex]?.testimonial}."
            </h1>
            <div className="flex justify-center items-center gap-4">
              <div className="p-1 border border-[#23262F] rounded-full">
                <Avatar size={40} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-1 justify-center items-center text-[#23262F] text-xl">
                  <h1>{testimonials[currentIndex]?.name}, </h1>
                  <h1>{testimonials[currentIndex]?.position}</h1>
                </div>
                <h1 className="text-[#909DA2]">
                  {testimonials[currentIndex]?.company}
                </h1>
              </div>
            </div>
          </div>
        )}

        <button
          disabled={
            testimonials.length === 0 ||
            currentIndex === testimonials.length - 1
          }
          onClick={() => handleChange("next")}
          className="p-1 rounded-full cursor-pointer border border-[#929498] hover:bg-[#3772FF] hover:border-none hover:text-white  text-[#929498]"
        >
          <ChevronRight size={35} />
        </button>
      </div>

      <div className="flex justify-center gap-2 items-center">
        {testimonials
          ?.slice(startIndex, startIndex + 3)
          ?.map((testimonial, idx) => {
            const actualIndex = startIndex + idx;
            const isActive = actualIndex === currentIndex;

            return (
              <div
                key={testimonial?._id || actualIndex}
                className={`p-2 rounded-2xl flex justify-center items-center gap-2 bg-white transition-opacity duration-300
            ${isActive ? "opacity-100" : "opacity-40"}
          `}
              >
                <div className="p-2 border border-[#23262F] rounded-full">
                  <Avatar size={20} />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h1>{testimonial?.name}, </h1>
                  <h1>{testimonial?.position}</h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Testimonials;
