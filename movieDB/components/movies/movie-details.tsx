"use client";

import { useMovieQuerySingle } from "@/actions/movies";
import { MovieDetail, Video } from "@/types/movie";
import {
  ArrowLeftOutlined,
  BookFilled,
  CalendarFilled,
  ClockCircleFilled,
  PlayCircleFilled,
  StarFilled,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CastSection } from "./casts";

const MovieDetails = ({ id }: { id: number | string }) => {
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Here you would add logic to save to user's favorites
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would add logic to save to user's bookmarks
  };

  const { data: movieData, isLoading: loadingMovie } =
    useMovieQuerySingle<MovieDetail>(`/movie/${id}`);

  const { data: videosData, isLoading: loadingVideos } =
    useMovieQuerySingle<Video>(`/movie/${id}/videos`);

  // Extract trailer from videos data
  const trailer =
    videosData?.results?.find(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    ) || videosData?.results?.[0];

  if (loadingMovie || loadingVideos) {
    return (
      <div className="min-h-screen bg-[#efe1ba] flex items-center justify-center">
        <div className="animate-pulse text-[#172957] text-xl font-semibold">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="min-h-screen bg-[#efe1ba] flex flex-col items-center justify-center">
        <div className="text-[#172957] text-xl font-semibold mb-4">
          Movie not found
        </div>
        <Link
          href="/"
          className="flex items-center text-blue-950 hover:underline"
        >
          <ArrowLeftOutlined size={16} className="mr-2" /> Back to home
        </Link>
      </div>
    );
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-[#efe1ba] text-[#172957]">
      {/* Hero Section with Backdrop */}
      <div className="relative h-96 md:h-[500px] w-full">
        <div className="absolute inset-0 bg-blue-950/70 z-10"></div>
        {movieData.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
            alt={movieData.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-blue-950"></div>
        )}

        {/* Back button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            href="/"
            className="flex items-center text-white hover:text-[#efe1ba] transition-colors"
          >
            <ArrowLeftOutlined size={20} className="mr-2" /> Back
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 -mt-36 relative z-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="rounded-lg overflow-hidden shadow-xl bg-blue-950/20 backdrop-blur-sm">
              {movieData.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                  alt={movieData.title}
                  width={500}
                  height={750}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-blue-950 flex items-center justify-center text-white">
                  No poster available
                </div>
              )}
            </div>
          </div>

          {/* Movie Details */}
          <div className="w-full md:w-2/3">
            <div className="bg-blue-950 rounded-lg p-6 shadow-xl text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {movieData.title}
              </h1>
              {movieData.tagline && (
                <p className="text-lg italic text-[#efe1ba] mb-4">
                  {movieData.tagline}
                </p>
              )}

              {/* Movie Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                {movieData.release_date && (
                  <div className="flex items-center">
                    <CalendarFilled size={18} className="mr-2 text-[#efe1ba]" />
                    <span>
                      {new Date(movieData.release_date).getFullYear()}
                    </span>
                  </div>
                )}
                {movieData.runtime && (
                  <div className="flex items-center">
                    <ClockCircleFilled
                      size={18}
                      className="mr-2 text-[#efe1ba]"
                    />
                    <span>{formatRuntime(movieData.runtime)}</span>
                  </div>
                )}
                {movieData.vote_average > 0 && (
                  <div className="flex items-center">
                    <StarFilled
                      size={18}
                      className="mr-2 text-[#efe1ba] fill-[#efe1ba]"
                    />
                    <span>{movieData.vote_average.toFixed(1)}/10</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movieData.genres && movieData.genres.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {movieData.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-[#172957] border border-[#efe1ba]/30 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-white/90 leading-relaxed">
                  {movieData.overview}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {movieData.production_companies?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#efe1ba] mb-1">
                      Studios
                    </h3>
                    <p>
                      {movieData.production_companies
                        .map((c) => c.name)
                        .join(", ")}
                    </p>
                  </div>
                )}
                {movieData.spoken_languages?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#efe1ba] mb-1">
                      Languages
                    </h3>
                    <p>
                      {movieData.spoken_languages
                        .map((l) => l.english_name)
                        .join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Section */}
        {trailer && (
          <div className="mt-12 bg-blue-950 rounded-lg p-6 text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <PlayCircleFilled size={24} className="mr-2 text-[#efe1ba]" />
              Watch Trailer
            </h2>

            <div className="aspect-video relative rounded-lg overflow-hidden">
              {isTrailerPlaying ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                  title={`${movieData.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              ) : (
                <div
                  className="relative cursor-pointer w-full h-full group"
                  onClick={() => setIsTrailerPlaying(true)}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`}
                    alt={`${movieData.title} Trailer`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-950/40 group-hover:bg-blue-950/20 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#efe1ba]/90 flex items-center justify-center">
                      <PlayCircleFilled
                        size={48}
                        className="text-blue-950 fill-blue-950"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cast Section */}
        <div className="mt-12">
          <CastSection movieId={id} />
        </div>

        <div className="flex gap-3 mt-5 w-full justify-end">
          <button
            onClick={handleFavorite}
            className="w-10 h-10 rounded-full bg-[#172957] hover:bg-[#172957]/80 flex items-center justify-center transition-colors"
            aria-label="Add to favorites"
          >
            <StarFilled
              size={20}
              className={`${isFavorited ? "fill-[#efe1ba] text-[#efe1ba]" : "text-[#efe1ba]"}`}
            />
          </button>
          <button
            onClick={handleBookmark}
            className="w-10 h-10 rounded-full bg-[#172957] hover:bg-[#172957]/80 flex items-center justify-center transition-colors"
            aria-label="Bookmark"
          >
            <BookFilled
              className={`${isBookmarked ? "fill-[#efe1ba] text-[#efe1ba]" : "text-[#efe1ba]"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;
