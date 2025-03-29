"use client";

import { useAppContext } from "@/store";
import { Movie } from "@/types/movie";
import { TMDB_IMAGE_BASE_URL } from "@/utils/constants";
import { Skeleton } from "antd";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MovieList = ({
  movies,
  loading,
}: {
  movies: Movie[];
  loading?: boolean;
}) => {
  const router = useRouter();
  const { isAuthenticated } = useConvexAuth();
  const { setMovieId } = useAppContext();

  return (
    <div>
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="w-full flex flex-col gap-2.5">
              <Skeleton.Image active />
              <Skeleton active />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => {
            return (
              <div
                key={crypto.randomUUID()}
                className="w-full flex flex-col gap-2.5 relative hover:scale-105 transition-all delay-100 shadow-2xl cursor-pointer"
              >
                <aside
                  className="absolute top-0 left-0 w-full h-full hover:bg-black/50 transition-all delay-100"
                  onClick={() => {
                    setMovieId(isAuthenticated ? null : movie.id);
                    router.push(
                      isAuthenticated ? `/dashboard/${movie.id}` : "/signin",
                    );
                  }}
                ></aside>
                <div className="w-full h-full">
                  <Image
                    src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                    width={2000}
                    height={100}
                    alt={movie.title}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default MovieList;
