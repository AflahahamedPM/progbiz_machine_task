import { dbConnect } from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";
import HeroSection from "@/models/HeroSectionModel";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { HTTP_STATUS } from "@/lib/httpStatusCode";

export async function GET() {
  try {
    await dbConnect();

    const data = await HeroSection.findOne().lean();

    if (!data) {
      return errorResponse("Hero section not found", HTTP_STATUS.NOT_FOUND);
    }

    return successResponse(data, "Hero fetched", HTTP_STATUS.OK);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch hero section");
  }
}

export async function PUT(req) {
  await dbConnect();

  const formData = await req.formData();
  const title = formData.get("title");
  const subTitle = formData.get("subTitle");
  const file = formData.get("image");

  let imageUrl;

  if (file && typeof file === "object") {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "hero-section" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    imageUrl = uploadRes.secure_url;
  }

  const updated = await HeroSection.findOneAndUpdate(
    {},
    {
      title,
      subTitle,
      ...(imageUrl && { image: imageUrl }),
    },
    { new: true, upsert: true },
  );

  return successResponse(updated, "Hero section updated", HTTP_STATUS.OK);
}
