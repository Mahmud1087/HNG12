"use client";

import { useMovieQuerySingle } from "@/actions/movies";
import { Credits } from "@/types/movie";
import Image from "next/image";

export function CastSection({ movieId }: { movieId: number | string }) {
  const { data: creditsData, isLoading } = useMovieQuerySingle<Credits>(
    `/movie/${movieId}/credits`,
  );
  const cast = creditsData?.cast?.slice(0, 10) || [];

  if (isLoading) {
    return (
      <div className="bg-blue-950 rounded-lg p-6 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Top Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full aspect-square rounded-full bg-blue-900 animate-pulse overflow-hidden mb-2"></div>
                <div className="h-4 w-6 bg-blue-900 animate-pulse rounded mb-2"></div>
                <div className="h-3 w-24 bg-blue-900 animate-pulse rounded"></div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (cast.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-950 rounded-lg p-6 text-white shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Top Cast</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {cast.map((person) => (
          <div key={person.id} className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-full bg-[#172957] overflow-hidden mb-2 relative">
              {person.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[#efe1ba]">
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
            </div>
            <p className="font-medium text-center text-white line-clamp-1">
              {person.name}
            </p>
            <p className="text-sm text-white/70 text-center line-clamp-1">
              {person.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
