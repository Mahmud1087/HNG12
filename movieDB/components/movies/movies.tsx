"use client";

import { useEffect, useState, useRef } from "react";
import { useMovieQuery } from "@/actions/movies";
import MovieList from "@/components/movies/movie-list";
import { Movie } from "@/types/movie";
import { Input } from "antd";
import { useDebounce } from "@/hooks/use-debounce";

export default function Home() {
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const MAX_PAGES = 10;

  // Use the debounce hook to delay updating the actual search term
  const handleSearchChange = useDebounce((term: string) => {
    console.log("searching...", term);
    setDebouncedSearchTerm(term);
    // Reset to page 1 when search term changes
    setPage(1);
    setHasMore(true);
  }, 500); // 500ms debounce delay

  const { data: popularMovies, isLoading: loadingPopularMovies } =
    useMovieQuery<Movie[]>(
      debouncedSearchTerm === "" ? "/discover/movie" : "/search/movie",
      {
        sort_by: "popularity.desc", // This should probably be fixed, not using searchName as sort_by
        query: debouncedSearchTerm, // Use query parameter for search (check your API requirements)
        page: page,
      },
      { staleTime: 60000 },
      debouncedSearchTerm + page, // Combine search term and page for dependency
    );

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
          <div className="w-full flex items-center justify-center">
            <aside className="w-full md:w-1/2">
              <Input
                placeholder="Search by name..."
                value={searchInput}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setSearchInput(newValue);
                  handleSearchChange(newValue);
                }}
                size="large"
              />
            </aside>
          </div>
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
