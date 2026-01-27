import { dbConnect } from "@/lib/dbConnect";
import Testimonial from "@/models/TestimonialModel";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { HTTP_STATUS } from "@/lib/httpStatusCode";

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const create = await Testimonial.create(data);
    return successResponse(create, "Testimonial created", HTTP_STATUS.CREATED);
  } catch (error) {
    console.error(error);   
    return errorResponse("Failed to create testimonial");
  }
}

export async function GET() {
  try {
    await dbConnect();
    const data = await Testimonial.find().lean();
    return successResponse(data, "Testimonials fetched", HTTP_STATUS.OK);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch testimonials");
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const { _id, ...updateData } = data;
    const updated = await Testimonial.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    return successResponse(updated, "Testimonial updated", HTTP_STATUS.OK);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to update testimonial");
  }
}
