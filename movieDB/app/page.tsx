"use client";

import { useMovieQuery } from "@/actions/movies";
import MovieList from "@/components/movies/movie-list";
import { Movie } from "@/types/movie";

export default function Home() {
  const { data: popularMovies, isLoading: loadingPopularMovies } =
    useMovieQuery<Movie>("/discover/movie", { sort_by: "popularity.desc" });

  const popular = popularMovies?.results || [];

  return (
    <>
      <main className="flex flex-col gap-8 py-8">
        <section className="flex flex-col gap-8 py-8">
          <h1 className="text-2xl font-semibold text-center">Popular Movies</h1>
          <MovieList movies={popular} loading={loadingPopularMovies} />
        </section>

        {/* <section className="flex flex-col gap-8 py-8">
          <h1 className="text-2xl font-semibold text-center">All Movies</h1>
          <MovieList movies={movies} loading={loading} />
        </section> */}
      </main>
    </>
  );
}
