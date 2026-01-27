import { dbConnect } from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { HTTP_STATUS } from "@/lib/httpStatusCode";
import About from "@/models/AboutModel";

export async function GET() {
  try {
    await dbConnect();

    const data = await About.findOne().lean();

    if (!data) {
      return errorResponse("About not found", HTTP_STATUS.NOT_FOUND);
    }

    return successResponse(data, "About fetched", HTTP_STATUS.OK);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch about section");
  }
}

export async function PUT(req) {
  await dbConnect();

  const formData = await req.formData();
  const title = formData.get("title");
  const subTitle = formData.get("subTitle");
  const description = formData.get("description");
  const file = formData.get("image");

  let imageUrl;

  if (file && typeof file === "object") {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "about-section" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    imageUrl = uploadRes.secure_url;
  }

  const updated = await About.findOneAndUpdate(
    {},
    {
      title,
      subTitle,
      description,
      ...(imageUrl && { image: imageUrl }),
    },
    { new: true, upsert: true },
  );

  return successResponse(updated, "About section updated", HTTP_STATUS.OK);
}
