"use client";

import { message } from "antd";
import React from "react";

import type { NoticeType } from "antd/es/message/interface";
import { ToastContext } from "./context";

export type ToastContextType = {
  name?: string;
  open: (options: ToastContextHandlerType) => void;
  close: () => void;
};

type ToastContextHandlerType = {
  duration?: number;
  message: React.ReactNode;
  type?: NoticeType;
};

const ToastProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [api, contextHolder] = message.useMessage();

  const open = React.useCallback(
    ({ duration = 5, message, type = "info" }: ToastContextHandlerType) => {
      api[type]({
        content: message,
        duration,
        type,
      });
    },
    [api],
  );

  const close = React.useCallback(() => {
    api.destroy();
  }, [api]);

  return (
    <ToastContext.Provider value={{ open, close }}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
