import MovieDetails from "@/components/movies/movie-details";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div>
      <MovieDetails id={slug} />
    </div>
  );
};
export default Page;
