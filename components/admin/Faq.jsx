"use client";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import Dialogue from "../ReusableComponents/Dialogue";
import useAlert from "@/hooks/useAlert";
import { CheckValidation } from "@/utils/Validation";
import { Field } from "@fluentui/react-components";
import APIRequest from "@/utils/APIRequest";
import { Button } from "../ui/button";

const faqInitialState = {
  question: "",
  answer: "",
};

const Faq = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(faqInitialState);
  const { publishNotification } = useAlert();

  const fields = [
    { label: "Question", placeholder: "Enter question" },
    { label: "Answer", placeholder: "Enter answer" },
  ];

  const handelChange = (value, field) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const getAllFAQs = async () => {
    try {
      const response = await APIRequest?.request("GET", "/api/faq");
      if (response?.success && response?.status === 200) {
        setFaqs(response?.data);
      } else {
        publishNotification(response?.message, "error");
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      publishNotification("Error fetching FAQs", "error");
    }
  };

  useEffect(() => {
    getAllFAQs();
  }, []);

  const handleSubmit = async () => {
    try {
      const missingFields = CheckValidation(form);

      if (missingFields.length > 0) {
        publishNotification(`Please fill all the mandatory fields`, "error");
        return;
      }
      const method = isEdit ? "PUT" : "POST";

      const response = await APIRequest?.request(
        method,
        "/api/faq",
        JSON.stringify(form),
      );
      if (response?.success) {
        publishNotification(
          `FAQ ${isEdit ? "updated" : "created"} successfully`,
          "success",
        );
        setIsModalOpen(false);
        setIsEdit(false);
        setForm(faqInitialState);
        getAllFAQs();
      } else {
        publishNotification(response?.message, "error");
      }
    } catch (error) {
      console.error(error);
      publishNotification("Error submitting the form", "error");
    }
  };

  const handleEdit = (faq) => {
    setForm(faq);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-4 ">
      <div className="flex justify-between">
        <Title title="FAQ's" />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-white bg-gray-600 rounded-xl cursor-pointer hover:bg-gray-800"
        >
          + Create
        </Button>
      </div>
      <Dialogue
        open={isModalOpen}
        header={isEdit ? "Update FAQ" : "Create FAQ"}
        onOpenChange={() => {
          setIsModalOpen(false);
          setForm(faqInitialState);
          setIsEdit(false);
        }}
        children={
          <div className="space-y-4">
            {fields?.map((field, index) => (
              <div key={index}>
                <Field label={field?.label} className="text-md font-semibold" required>
                <textarea
                  type="text"
                  className="w-full p-2 border text-sm font-normal border-gray-300 rounded-lg"
                  value={form?.[field?.label?.toLowerCase()]}
                  placeholder={field?.placeholder}
                  onChange={(e) =>
                    handelChange(e.target.value, field?.label?.toLowerCase())
                  }
                />
                </Field>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                className="px-4 py-2 flex justify-end text-white bg-gray-600 rounded-xl cursor-pointer hover:bg-gray-800"
                onClick={handleSubmit}
              >
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        }
      />
      <div className="space-y-4">
        {faqs?.map((faq) => (
          <div
            key={faq?._id}
            className="p-4 border rounded-lg flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{faq?.question}</p>
              <p className="text-sm text-gray-600 mt-1">{faq?.answer}</p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleEdit(faq)}
                className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
