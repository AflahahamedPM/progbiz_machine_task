import React from "react";
import { enqueueSnackbar } from "notistack";
import { closeSnackbar } from "notistack";

const useAlert = () => {
  const customSnackbarStyle = {
    fontFamily: "Segoe UI",
  };

  const publishNotification = (
    message = "",
    variant,
    duration = 3000,
    anchorOrigin = {},
  ) => {
    return enqueueSnackbar(message, {
      variant,
      autoHideDuration: duration,
      preventDuplicate: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
        ...anchorOrigin,
      },
      style: customSnackbarStyle,
    });
  };

  return { publishNotification, closeSnackbar };
};

export default useAlert;
