import { dbConnect } from "@/lib/dbConnect";
import Faq from "@/models/FaqModel";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { HTTP_STATUS } from "@/lib/httpStatusCode";

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const create = await Faq.create(data);
    return successResponse(create, "FAQ created", HTTP_STATUS.CREATED);
  } catch (error) {
    console.error(error);   
    return errorResponse("Failed to create FAQ");
  }
}

export async function GET() {
  try {
    await dbConnect();
    const data = await Faq.find().lean();
    return successResponse(data, "FAQs fetched", HTTP_STATUS.OK);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch FAQs");
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const { _id, ...updateData } = data;
    const updated = await Faq.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    return successResponse(updated, "FAQ updated", HTTP_STATUS.OK);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to update FAQ");
  }
}
