import Image from "next/image";
import React from "react";
import reppoLogo from "@/assets/reppoLogo.png";
import FooterLinks from "./FooterLinks";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  const FOOTER_LINKS = [
    {
      title: "Company",
      links: ["Home", "Early Access", "404"],
    },
    {
      title: "App",
      links: ["Download For iOS", "Download For Android"],
    },
    {
      title: "Legal Pages",
      links: ["Privacy Policy", "Terms & Conditions"],
    },
  ];

  const SOCIAL_ICONS = [
  { Icon: Facebook },
  { Icon: Twitter },
  { Icon: Instagram },
  { Icon: Linkedin },
];

  return (
    <footer className="bg-white px-12 py-10">
      <div className="flex justify-between items-start border-b pb-8">
        <div className="w-1/2 text-left flex flex-col gap-2">
          <Image src={reppoLogo} alt="footer-logo" width={125} height={34} />
          <h1 className="text-[#1F221E] font-medium text-sm">
            innovative health assistant app that leverages artificial <br />{" "}
            intelligence to provide personalized wellness recommendations.
          </h1>
          <h1 ame="text-[#1F221E] font-medium text-sm">hello@reppoo.com</h1>
        </div>

        <FooterLinks data={FOOTER_LINKS} />

      </div>
        <FooterBottom icons={SOCIAL_ICONS}/>
    </footer>
  );
};

export default Footer;
