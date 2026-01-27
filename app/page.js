import About from "@/components/user/About";
import Header from "@/components/user/Header";
import HeroSection from "@/components/user/HeroSection";
import Testimonials from "@/components/user/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans dark:bg-black">
      <Header />
      <HeroSection />
      <About />
      <Testimonials />
    </div>
  );
}
