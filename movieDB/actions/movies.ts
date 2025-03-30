/* eslint-disable react-hooks/exhaustive-deps */
import { ResponseType } from "@/types/base";
import { TMDB_BASE_URL } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const fetchTMDB = async <T>({
  endpoint,
  params = {},
}: {
  endpoint: string;
  params?: Record<string, string | number | boolean>;
}) => {
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  if (!token) {
    throw new Error("Unauthenticated");
  }
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const res = await axios.get<ResponseType<T>>(`${TMDB_BASE_URL}${endpoint}`, {
    params,
  });

  return res.data;
};

const fetchTMDBSingle = async <T>({
  endpoint,
  params = {},
}: {
  endpoint: string;
  params?: Record<string, string | number | boolean>;
}) => {
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  if (!token) {
    throw new Error("Unauthenticated");
  }
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const res = await axios.get<T>(`${TMDB_BASE_URL}${endpoint}`, {
    params,
  });

  return res.data;
};

export const useMovieQuery = <T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  options = {},
  dependency?: string,
) => {
  const queryClient = useQueryClient();
  const queryKey = [endpoint, JSON.stringify(params)];

  const query = useQuery({
    queryKey,
    queryFn: () => fetchTMDB<T>({ endpoint, params }),
    ...options,
  });

  useEffect(() => {
    if (!dependency === undefined) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [dependency]);

  return query;
};

export const useMovieQuerySingle = <T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  options = {},
) => {
  const queryKey = [endpoint, JSON.stringify(params)];

  return useQuery({
    queryKey,
    queryFn: () => fetchTMDBSingle<T>({ endpoint, params }),
    ...options,
  });
};
