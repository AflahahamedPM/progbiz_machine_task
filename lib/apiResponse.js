import { NextResponse } from "next/server";
import { HTTP_STATUS } from "./httpStatusCode";

export const successResponse = (
  data,
  message = "Success",
  status = HTTP_STATUS.OK,
) => {
  return NextResponse.json({
    success: true,
    message,
    data: data,
    status,
  });
};

export const errorResponse = (
  message = "Something went wrong",
  status = HTTP_STATUS.INTERNAL_SERVER_ERROR,
) => {
  return NextResponse.json({
    success: false,
    message,
    status,
  });
};
