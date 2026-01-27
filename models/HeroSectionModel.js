import mongoose from "mongoose";

const heroSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  image: { type: String, },
});

export default mongoose.models.Herosection || mongoose.model("Herosection", heroSectionSchema);