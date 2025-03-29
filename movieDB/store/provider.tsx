import AppProvider from "./contexts/app/provider";
import ToastProvider from "./contexts/toast/provider";
import QueryProvider from "./query-provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <AppProvider>
        <QueryProvider>{children}</QueryProvider>
      </AppProvider>
    </ToastProvider>
  );
};

export default Provider;
