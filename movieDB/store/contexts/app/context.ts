"use client";

import React, { useContext } from "react";

export const AppContext = React.createContext<AppContextType | null>(null);

import type { AppContextType } from "./provider";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContext.Provider");
  }
  return context;
};
