
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const DownloadButtons = ({ images }) => {
  return (
    <>
      {images?.map((img) => (
        <Button
          key={img.alt}
          className="flex justify-center items-center gap-2 bg-white hover:bg-white text-black px-6 py-5 mt-4 cursor-pointer rounded-xl border-[#00000008] border-2"
        >
          <Image src={img?.imageUrl} width={20} height={20} alt={img?.alt} />
          <span>Download</span>
        </Button>
      ))}
    </>
  );
};

export default DownloadButtons;
