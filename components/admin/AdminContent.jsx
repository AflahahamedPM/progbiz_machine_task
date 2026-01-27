import React from "react";
import AdminHeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import Testimonials from "./Testimonials";
import Faq from "./Faq";

const AdminContent = ({ tab }) => {
  if (tab === "hero") {
    return <AdminHeroSection />;
  }
  if(tab === "about"){
    return <AboutSection />;
  }

  if(tab === "testimonial"){
    return <Testimonials />
  }

  if(tab === "faq"){
    return <Faq />
  }
  return <div>Invalid Tab</div>;
};

export default AdminContent;
