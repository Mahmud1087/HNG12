"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useMemo } from "react";
import axios from "axios";
import { useToastContext } from "./contexts/toast";
import { TMDB_BASE_URL } from "@/utils/constants";

function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a client
  const { open } = useToastContext();
  const queryClient = useMemo(() => {
    const client = new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          open({ duration: 5, message: error.message, type: "error" });
        },
      }),
      mutationCache: new MutationCache({
        onError: (error) => {
          open({ duration: 5, message: error.message, type: "error" });
        },
      }),
      defaultOptions: {
        queries: {
          queryFn: async ({ queryKey }) => {
            const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
            if (!token) {
              throw new Error("Unauthenticated");
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const res = await axios.get(`${TMDB_BASE_URL}${queryKey}`);
            return res.data;
          },

          refetchOnMount: true,
          // refetchOnReconnect: false,
          refetchOnWindowFocus: false,
        },
      },
    });
    return client;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
