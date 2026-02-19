import RenderBlogPage from "@/components/blog/renderBlog";
import { getPayloadClient } from "@/lib/payloadClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ blogSlug: string }>;
};

export default async function Blog({ params }: PageProps) {
  const { blogSlug } = await params;

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
  if (!blog) return notFound();
  return (
    <>
      <RenderBlogPage {...blog} />
    </>
  );
}
