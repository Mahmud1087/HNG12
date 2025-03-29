"use client";

import { useAppContext } from "@/store";
import { Movie } from "@/types/movie";
import { Skeleton } from "antd";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MovieList = ({
  movies,
  loading,
}: {
  movies: Movie[];
  loading: boolean;
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
        <div className="grid gap-6 cursor-pointer relative  md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => {
            return (
              <div key={movie.id} className="w-full flex flex-col gap-2.5">
                <div
                  className="w-full h-full"
                  onClick={() => {
                    setMovieId(isAuthenticated ? null : movie.id);
                    router.push(
                      isAuthenticated ? `/dashboard/${movie.id}` : "/signin",
                    );
                  }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
