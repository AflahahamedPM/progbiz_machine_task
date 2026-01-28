"use client";
import useAlert from "@/hooks/useAlert";
import APIRequest from "@/utils/APIRequest";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const { publishNotification } = useAlert();

  useLayoutEffect(() => {
    getAboutSectionData();
  }, []);
  const getAboutSectionData = async () => {
    try {
      const response = await APIRequest.request("GET", "/api/about");
      if (response?.success && response?.status === 200) {
        setAboutData(response?.data);
      } else {
        publishNotification("Failed to fetch about section data", "error");
      }
    } catch (error) {
      console.error("Error fetching about section data:", error);
      publishNotification("Error fetching about section data", "error");
    }
  };
  return (
    <div className="flex justify-between mx-10 my-10 items-center pt-32">
      <div className="flex w-1/2 flex-col items-start gap-2">
        <h1 className="text-[#23262F] font-semibold text-5xl">
          {aboutData?.title}
        </h1>
        <h1 className="text-[#23262F] text-lg">{aboutData?.subTitle}</h1>
        <h1 className="text-[#777E90] text-[16px] w-1/2">
          {aboutData?.description}
        </h1>
      </div>
      {aboutData && (
        <div className="p-8 rounded-4xl bg-[#F4F5F6]">
          <Image src={aboutData?.image} alt="About" width={400} height={250} />
        </div>
      )}
    </div>
  );
};

export default About;
