"use client";
import useAlert from "@/hooks/useAlert";
import APIRequest from "@/utils/APIRequest";
import { CheckValidation } from "@/utils/Validation";
import { Field } from "@fluentui/react-components";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Title from "./Title";

const AdminHeroSection = () => {
  const [form, setForm] = useState({
    title: "",
    subTitle: "",
    image: "",
  });

  const [initialForm, setInitialForm] = useState({
    title: "",
    subTitle: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { publishNotification } = useAlert();

  const getHeroSectionData = async () => {
    try {
      const response = await APIRequest?.request("GET", "/api/herosection");
      if (response?.success && response?.status === 200) {
        setForm(response?.data);
        setInitialForm(response?.data);
      } else {
        publishNotification(response?.message, "error");
      }
    } catch (error) {
      console.error("Error fetching hero section data:", error);
    }
  };

  useEffect(() => {
    getHeroSectionData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: file, preview: reader.result }));
    };

    reader.readAsDataURL(file);
  };

  const isFormChanged = () => {
    return (
      form?.title !== initialForm?.title ||
      form?.subTitle !== initialForm?.subTitle ||
      form?.image instanceof File
    );
  };

  const handleSubmit = async () => {
    try {
      const missingFields = CheckValidation(form);
      if (missingFields.length > 0) {
        publishNotification("Please fill all mandatory fields", "error");
        return;
      }

      if (!isFormChanged()) {
        publishNotification("No changes to update", "info");
        return;
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", form?.title);
      formData.append("subTitle", form?.subTitle);
      formData.append("image", form?.image);

      const response = await APIRequest?.request(
        "PUT",
        "/api/herosection",
        formData,
      );

      if (response?.success && response?.status === 200) {
        publishNotification("Hero section updated successfully", "success");
        getHeroSectionData();
      } else {
        publishNotification(
          response?.message || "Failed to update hero section",
          "error",
        );
      }
    } catch (error) {
      publishNotification(
        "An error occurred while updating hero section",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-md">
      <Title title="Hero Section" />
      <Field label="Title" className="text-[16px] font-semibold" required>
        <input
          name="title"
          value={form?.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full text-sm font-normal rounded-xl"
          required
        />
      </Field>

      <Field label="Subtitle" className="text-[16px] font-semibold" required>
        <input
          name="subTitle"
          value={form?.subTitle}
          onChange={handleChange}
          placeholder="Subtitle"
          className="border p-2 w-full text-sm font-normal rounded-xl"
          required
        />
      </Field>
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="border p-2 w-full rounded-xl"
      />

      {form?.image && (
        <Image
          src={form?.preview || form?.image}
          width={40}
          height={40}
          alt="heroImage"
          className="w-40 h-auto rounded"
        />
      )}

      <button
        onClick={handleSubmit}
        className="bg-black w-full text-white px-4 py-2 mt-4 cursor-pointer rounded-xl"
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Update"}
      </button>
    </div>
  );
};

export default AdminHeroSection;
