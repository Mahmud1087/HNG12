"use client";

export const ToastContext = createContext<ToastContextType>({
  name: "Default",
  open: () => {},
  close: () => {},
});

import { createContext, useContext } from "react";
import type { ToastContextType } from "./provider";

export const useToastContext = () => {
  return useContext(ToastContext) as ToastContextType;
};
