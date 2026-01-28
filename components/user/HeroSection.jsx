"use client";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useState } from "react";
import elipseShape from "@/assets/elipseShape.png";
import gsap from "gsap";
import APIRequest from "@/utils/APIRequest";
import useAlert from "@/hooks/useAlert";
import customerFaces from "@/assets/customerFaces.png";
import appleLogo from "@/assets/appleLogo.png";
import playstoreLogo from "@/assets/playstoreLogo.png";
import DownloadButtons from "./DownloadButtons";

const HeroSection = () => {
  const [herosectionData, setHerosectionData] = useState(null);
  const { publishNotification } = useAlert();

  const images = [
    { imageUrl: appleLogo, alt: "apple-logo" },
    { imageUrl: playstoreLogo, alt: "playstore-logo" },
  ];

  useLayoutEffect(() => {
    getHerosectionData();
  }, []);
  const getHerosectionData = async () => {
    try {
      const response = await APIRequest.request("GET", "/api/herosection");
      if (response?.success && response?.status === 200) {
        setHerosectionData(response?.data);
      } else {
        publishNotification("Failed to fetch hero section data", "error");
      }
    } catch (error) {
      console.error("Error fetching hero section data:", error);
      publishNotification("Error fetching hero section data", "error");
    }
  };

  useEffect(() => {
    if (herosectionData) {
      const tl = gsap.timeline({ delay: 0.5 });
      const t2 = gsap.timeline({ delay: 1 });
      const t3 = gsap.timeline({ delay: 1.5 });
      const t4 = gsap.timeline({ delay: 1.5 });
      const t5 = gsap.timeline({ delay: 2 });
      tl.fromTo(
        ".hero-section-img",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
      );
      t2.fromTo(
        ".customer-count",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
      );
      t3.fromTo(
        ".title-content",
        { opacity: 0, x: 50 },
        { opacity: 2, x: 0, duration: 1 },
      );
      t4.fromTo(
        ".subtitle-content",
        { opacity: 0, x: -50 },
        { opacity: 2, x: 0, duration: 1 },
      );
      t5.fromTo(
        ".download-btn",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1 },
      );
    }
  }, [herosectionData]);

  return (
    <div className="relative flex justify-center items-center w-full h-125">
      <Image
        src={elipseShape}
        alt="ellipse-bg"
        fill
        className="object-contain "
        priority
      />

      {herosectionData && (
        <div className="flex flex-col items-center mt-30 gap-2">
          <Image
            src={herosectionData.image}
            alt="Hero Section Image"
            width={320}
            height={600}
            className="hero-section-img z-10 h-80 w-150 object-contain opacity-0"
            priority
          />
          <div className="customer-count opacity-0 flex justify-center items-center mt-2 gap-2">
            <Image
              src={customerFaces}
              width={70}
              height={50}
              alt="customer-faces"
            />
            <h1>
              <span className="font-bold font-mono">59,182</span> Happy Users
            </h1>
          </div>
          <h1 className="title-content opacity-0 text-[#23262F] text-6xl">
            {herosectionData?.title}
          </h1>
          <div className="subtitle-content opacity-0 w-2/3 text-center text-[16px] font-medium text-[#777E90] ">
            <h1>{herosectionData?.subTitle}</h1>
          </div>
          <div className="download-btn flex gap-4 opacity-0">
            <DownloadButtons images={images} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
