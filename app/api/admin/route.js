import { dbConnect } from "@/lib/dbConnect";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { HTTP_STATUS } from "@/lib/httpStatusCode";
import User from "@/models/UserModel";

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();
  
  const checkUser = await User.findOne({ email });

  if (!checkUser) {
    return errorResponse(
      "User not found, check the email entered",
      HTTP_STATUS.NOT_FOUND,
    );
  }

  if (password !== checkUser?.password) {
    return errorResponse("Wrong password", HTTP_STATUS.UNAUTHORIZED);
  }

  return successResponse(checkUser, "Logged in successfully", HTTP_STATUS.OK);
}
