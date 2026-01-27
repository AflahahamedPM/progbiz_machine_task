"use client";
import { SnackbarProvider } from "notistack";
import React from "react";

const Provider = ({ children }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export default Provider;
