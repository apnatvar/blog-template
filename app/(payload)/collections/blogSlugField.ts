import type { Field } from "payload";

function slugFromTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const blogSlugField = (): Field => ({
  name: "slug",
  type: "text",
  index: true,
  unique: true,
  admin: {
    hidden: true,
    disableListColumn: true,
  },
  hooks: {
    beforeValidate: [
      ({ data, siblingData, value }) => {
        const incomingTitle = (data?.title ?? siblingData?.title) as
          | string
          | undefined
          | null;

        if (typeof incomingTitle === "string" && incomingTitle.trim()) {
          return slugFromTitle(incomingTitle);
        }
        return value;
      },
    ],
  },
});

export default blogSlugField;
