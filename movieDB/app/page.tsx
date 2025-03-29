"use client";

import { useEffect, useState, useRef } from "react";
import { useMovieQuery } from "@/actions/movies";
import MovieList from "@/components/movies/movie-list";
import { Movie } from "@/types/movie";

export default function Home() {
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const MAX_PAGES = 10;

  const { data: popularMovies, isLoading: loadingPopularMovies } =
    useMovieQuery<Movie[]>("/discover/movie", {
      sort_by: "popularity.desc",
      page: page,
    });

  useEffect(() => {
    if (popularMovies?.results) {
      if (page === 1) {
        setAllMovies(popularMovies.results);
      } else {
        setAllMovies((prev) => [...prev, ...popularMovies.results]);
      }

      if (
        popularMovies.page >= popularMovies.total_pages ||
        page >= MAX_PAGES
      ) {
        setHasMore(false);
      }

      setLoadingMore(false);
    }
  }, [popularMovies, page]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          hasMore &&
          !loadingMore &&
          !loadingPopularMovies &&
          page < MAX_PAGES
        ) {
          setLoadingMore(true);
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "0px 0px 300px 0px",
      },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, loadingPopularMovies, page]);

  return (
    <>
      <main className="flex flex-col gap-8">
        <section className="flex flex-col gap-8">
          <h1 className="text-2xl font-semibold text-center">Movies</h1>
          <MovieList
            movies={allMovies}
            loading={page === 1 && loadingPopularMovies}
          />

          <div
            ref={loadMoreRef}
            className="h-10 w-full flex justify-center items-center"
          >
            {(loadingMore || (loadingPopularMovies && page > 1)) && (
              <div className="flex justify-center py-4">
                <div className="animate-pulse text-center">
                  <span className="loading loading-bars loading-md"></span>
                </div>
              </div>
            )}

            {!hasMore && allMovies.length > 0 && (
              <div className="text-center py-4 text-gray-500">
                You&apos;ve reached the end
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
