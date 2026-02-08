import Link from "next/link";
import { Blog } from "@/app/(payload)/payload-types";
import { getPayloadClient } from "@/lib/payloadClient";

export const dynamic = "force-dynamic";
export const revalidate = 100;

export default async function BlogIndexPage() {
  const payload = await getPayloadClient();

  const blogsRes = await payload.find({
    collection: "blogs",
    limit: 200,
    depth: 0,
    sort: "-updatedAt",
    draft: false,
  });

  const blogs = (blogsRes.docs ?? []) as unknown as Blog[];
  console.log(blogs);
  return (
    <>
      <section className="w-full bg-background text-foreground">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 md:py-14">
          <div className="mx-auto w-full max-w-3xl">
            <header className="mb-6 space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Blogs
              </h1>
              <p className="text-sm text-muted-foreground md:text-base">
                Browse posts from Elza.
              </p>
            </header>

            {blogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No blogs found.</p>
            ) : (
              <div className="overflow-hidden rounded-lg border border-border">
                {blogs
                  .filter((b) => Boolean(b?.slug && b?.title))
                  .map((b, idx) => {
                    const href = `/blogs/${encodeURIComponent(b.slug as string)}`;
                    const isEven = idx % 2 === 0;

                    return (
                      <Link
                        key={b.id}
                        href={href}
                        className={[
                          "block w-full",
                          "px-4 py-4 md:px-5",
                          "transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          isEven
                            ? "bg-background hover:bg-muted/50"
                            : "bg-muted/30 hover:bg-muted/60",
                        ].join(" ")}
                        aria-label={`Open blog: ${b.title ?? "Untitled"}`}
                        prefetch={true}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="truncate text-base font-medium md:text-lg">
                              {b.title ?? "Untitled"}
                            </p>
                            {b.subtitle ? (
                              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                {b.subtitle}
                              </p>
                            ) : null}
                          </div>

                          <span className="shrink-0 text-xs text-muted-foreground">
                            #{idx + 1}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
