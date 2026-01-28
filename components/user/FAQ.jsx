"use client";
import APIRequest from "@/utils/APIRequest";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const getAllFAQs = async () => {
    try {
      const response = await APIRequest.request("GET", "/api/faq");
      if (response?.success && response?.status === 200) {
        setFaqs(response?.data);
      } else {
        publishNotification(response?.message, "error");
      }
    } catch (error) {
      console.log("Error fetching testimonials:", error);
      publishNotification("Error fetching testimonials", "error");
    }
  };
  useEffect(() => {
    getAllFAQs();
  }, []);
  return (
    <div className="py-10 px-10 flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-semibold text-[#23262F] w-1/3 text-center">
        Frequently Asked Questions
      </h1>
      <h1 className="text-[#777E90] text-lg w-1/3 text-center">
        Get answers to common questions about our AI health assistant app
      </h1>

      <Accordion type="single" collapsible className="w-1/2">
        {faqs?.length > 0 &&
          faqs?.map((data) => (
            <AccordionItem key={data?._id} value={data?._id}>
              <AccordionTrigger
                className="
                     text-2xl 
                  text-[#23262F]
                    hover:no-underline
                  data-[state=open]:text-[#3772FF]
                "
              >
                {data?.question}
              </AccordionTrigger>

              <AccordionContent className="text-[#00000080] text-xl">
                {data?.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
