"use client";

import { api } from "@/convex/_generated/api";
import { useToastContext } from "@/store";
import { ConvexMovieType } from "@/types/movie";
import { BookFilled, StarFilled } from "@ant-design/icons";
import { useMutation } from "convex/react";
import { useState } from "react";

const ActionButtons = ({ data }: { data: ConvexMovieType }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { open } = useToastContext();
  const addToFav = useMutation(api.movie.toggleFavorites);
  const addToBookmark = useMutation(api.movie.toggleBookmarks);

  const handleFavorite = async () => {
    try {
      setIsFavorited(!isFavorited);
      const res = await addToFav(data);
      open({
        message: res,
        type: "success",
        duration: 5,
      });
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to add to favorites",
      );
    }
  };

  const handleBookmark = async () => {
    try {
      setIsBookmarked(!isBookmarked);
      const res = await addToBookmark(data);
      open({
        message: res,
        type: "success",
        duration: 5,
      });
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to add to favorites",
      );
    }
  };

  return (
    <div className="flex gap-3 my-5 w-full justify-end">
      <button
        onClick={handleFavorite}
        className={`py-1.5 px-3.5 rounded-md cursor-pointer bg-blue-500 flex items-center justify-center transition-colors ${isFavorited ? "text-yellow-400" : "text-white"}`}
        aria-label="Add to favorites"
      >
        <StarFilled size={20} />
        <p>{}</p>
      </button>
      <button
        onClick={handleBookmark}
        className={`py-1.5 px-3.5 rounded-md cursor-pointer bg-slate-700 flex items-center justify-center transition-colors ${isBookmarked ? "text-orange-500" : "text-white"}`}
        aria-label="Bookmark"
      >
        <BookFilled
          className={`${isBookmarked ? "fill-[#efe1ba] text-[#efe1ba]" : "text-[#efe1ba]"}`}
        />
      </button>
    </div>
  );
};
export default ActionButtons;
