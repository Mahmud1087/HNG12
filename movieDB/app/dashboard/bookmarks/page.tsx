"use client";

import { api } from "@/convex/_generated/api";
import { useAppContext, useToastContext } from "@/store";
import { TMDB_IMAGE_BASE_URL } from "@/utils/constants";
import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const bookmarks = useQuery(api.movie.getBookmarks);
  const router = useRouter();
  const { isAuthenticated } = useConvexAuth();
  const { setMovieId } = useAppContext();
  const removeFromBookmarks = useMutation(api.movie.removeFromBookmarks);
  const { open } = useToastContext();
  const [loading, setLoading] = useState(false);

  const handleRemoveFromBookmark = async (id: number) => {
    setLoading(true);
    try {
      const res = await removeFromBookmarks({ id });
      if (res) {
        open({
          message: res,
          type: "success",
          duration: 5,
        });
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!bookmarks) {
    return (
      <div className="min-h-screen bg-[#efe1ba] flex items-center justify-center">
        <div className="animate-pulse text-[#172957] text-xl font-semibold">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      </div>
    );
  }

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
                <section
                  key={crypto.randomUUID()}
                  className="w-full p-3 rounded-md flex flex-col gap-2.5 shadow-2xl cursor-pointer"
                >
                  <div className="relative">
                    <aside
                      className="absolute top-0 left-0 w-full h-full hover:bg-black/50 transition-all delay-100"
                      onClick={() => {
                        setMovieId(isAuthenticated ? null : movie.id);
                        router.push(
                          isAuthenticated
                            ? `/dashboard/${movie.id}`
                            : "/signin",
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
                  <button
                    className={`bg-red-500 rounded-md px-2 py-1 text-white text-sm w-full cursor-pointer`}
                    onClick={() => {
                      handleRemoveFromBookmark(movie.id);
                    }}
                  >
                    {loading ? <LoadingOutlined /> : "Remove"}
                  </button>
                </section>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};
export default Page;
