const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  console.log(slug);

  return <div>Page</div>;
};
export default Page;
