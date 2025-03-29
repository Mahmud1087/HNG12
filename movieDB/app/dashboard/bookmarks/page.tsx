"use client";

import { api } from "@/convex/_generated/api";
import { useAppContext } from "@/store";
import { TMDB_IMAGE_BASE_URL } from "@/utils/constants";
import { Button } from "antd";
import { useConvexAuth, useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const bookmarks = useQuery(api.movie.getBookmarks);
  const router = useRouter();
  const { isAuthenticated } = useConvexAuth();
  const { setMovieId } = useAppContext();

  return (
    <main className="flex flex-col gap-8 mb-10">
      {bookmarks?.length === 0 ? (
        <div className="h-[85vh] w-full flex flex-col items-center justify-center">
          <p className="mb-7 text-2xl italic">No movie in your bookmark</p>
          <Button
            size="large"
            type="primary"
            onClick={() => router.push("/dashboard")}
          >
            Add Movies
          </Button>
        </div>
      ) : (
        <section className="flex flex-col gap-8">
          <h1 className="text-2xl font-semibold text-center">My Bookmarks</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks?.map((movie) => {
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
          {/* <button
        className={`"bg-red-500" rounded-md px-2 py-1 text-white text-sm w-full cursor-pointer`}
        onClick={() => { }}
      >
        Remove
      </button> */}
        </section>
      )}
    </main>
  );
};
export default Page;
