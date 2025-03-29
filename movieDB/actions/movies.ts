import { ResponseType } from "@/types/base";
import { TMDB_BASE_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

export const useMovieQuery = <T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  options = {},
) => {
  const queryKey = [endpoint, JSON.stringify(params)];

  return useQuery({
    queryKey,
    queryFn: () => fetchTMDB<T>({ endpoint, params }),
    ...options,
  });
};
