"use client";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import Dialogue from "../ReusableComponents/Dialogue";
import { CheckValidation } from "@/utils/Validation";
import useAlert from "@/hooks/useAlert";
import APIRequest from "@/utils/APIRequest";
import { Field } from "@fluentui/react-components";
import { Button } from "../ui/button";

const testimonialsInitialState = {
  name: "",
  company: "",
  position: "",
  testimonial: "",
};

const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(testimonialsInitialState);
  const { publishNotification } = useAlert();

  const fields = [
    { label: "Name", placeholder: "Enter name" },
    { label: "Company", placeholder: "Enter company" },
    { label: "Position", placeholder: "Enter position" },
    { label: "Testimonial", placeholder: "Enter testimonial" },
  ];

  const handelChange = (value, field) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const getAllTestimonials = async () => {
    try {
      const response = await APIRequest?.request("GET", "/api/testimonial");
      if (response?.success && response?.status === 200) {
        setTestimonialsList(response?.data);
      } else {
        publishNotification(response?.message, "error");
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      publishNotification("Error fetching testimonials", "error");
    }
  };

  useEffect(() => {
    getAllTestimonials();
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
        "/api/testimonial",
        JSON.stringify(form),
      );
      if (response?.success) {
        publishNotification(
          `Testimonial ${isEdit ? "updated" : "created"} successfully`,
          "success",
        );
        setIsModalOpen(false);
        setIsEdit(false);
        setForm(testimonialsInitialState);
        getAllTestimonials();
      } else {
        publishNotification(response?.message, "error");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      publishNotification("Error submitting testimonial", "error");
    }
  };

  const handleEdit = (testimonial) => {
    setForm(testimonial);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-4 ">
      <div className="flex justify-between">
        <Title title="Testimonials" />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-white bg-gray-600 rounded-xl cursor-pointer hover:bg-gray-800"
        >
          + Create
        </Button>
      </div>

      <Dialogue
        header={isEdit ? "Update Testimonial" : "Create Testimonial"}
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
          setForm(testimonialsInitialState);
          setIsEdit(false);
        }}
        children={
          <div className="space-y-4">
            {fields?.map((field, index) => (
              <div key={index}>
                <Field
                  label={field?.label}
                  className="text-md font-semibold"
                  required
                >
                  {field?.label === "Testimonial" ? (
                    <textarea
                      className="w-full p-2 border text-sm font-normal border-gray-300 rounded-lg"
                      value={form?.[field?.label?.toLowerCase()]}
                      placeholder={field?.placeholder}
                      onChange={(e) =>
                        handelChange(
                          e.target.value,
                          field?.label?.toLowerCase(),
                        )
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full p-2 border text-sm font-normal border-gray-300 rounded-lg"
                      value={form?.[field?.label?.toLowerCase()]}
                      placeholder={field?.placeholder}
                      onChange={(e) =>
                        handelChange(
                          e.target.value,
                          field?.label?.toLowerCase(),
                        )
                      }
                    />
                  )}
                </Field>
              </div>
            ))}

            <div className="flex justify-end">
              <Button
                className="px-4 py-2 flex justify-end text-white bg-gray-600 rounded-xl cursor-pointer hover:bg-gray-800"
                onClick={handleSubmit}
              >
                {isEdit ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonialsList?.map((testimonial) => (
          <div
            key={testimonial?._id}
            className="p-4 border border-gray-200 h-auto overflow-hidden rounded-lg shadow-sm"
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">{testimonial?.name}</h3>

              <Button
                onClick={() => handleEdit(testimonial)}
                className="cursor-pointer text-xs px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Edit
              </Button>
            </div>

            <p className="text-gray-600 text-sm">{testimonial?.company}</p>
            <p className="text-gray-600 text-sm">{testimonial?.position}</p>
            <p className="mt-2 text-xs font-bold text-gray-700">
              {testimonial?.testimonial}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
