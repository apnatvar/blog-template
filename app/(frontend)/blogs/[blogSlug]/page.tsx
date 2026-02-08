import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payloadClient";
import RenderBlogPage from "@/components/blog/renderBlog";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ blogSlug: string }>;
};

export default async function Blog({ params }: PageProps) {
  console.log("does not reach");
  const { blogSlug } = await params;
  console.log(blogSlug);

  if (!blogSlug) return notFound();

  const payload = await getPayloadClient();

  const blogRes = await payload.find({
    collection: "blogs",
    limit: 1,
    depth: 2,
    draft: false,
    where: {
      slug: { equals: blogSlug },
    },
  });

  const blog = blogRes.docs?.[0];
  console.log(blog);
  if (!blog) return notFound();
  console.log(blog);
  return (
    <>
      <RenderBlogPage {...blog} />
    </>
  );
}
