import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subTitle: { type: String, required: true },
  image: { type: String },
});

export default mongoose.models.About || mongoose.model("About", aboutSchema);
