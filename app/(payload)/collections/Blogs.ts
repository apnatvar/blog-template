import type { CollectionConfig } from "payload";
import blogSlugField from "./blogSlugField";

export const Blogs: CollectionConfig = {
  slug: "blogs",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["id", "title", "_status"],
    hideAPIURL: true,
  },
  access: {
    read: () => true,
    readVersions: () => true,
    delete: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
      defaultValue: "Title",
    },
    {
      name: "subtitle",
      type: "text",
      defaultValue: "Subtitle",
      admin: {
        disableListColumn: true,
      },
    },
    {
      name: "body",
      type: "richText",
      admin: {
        disableListColumn: true,
      },
    },
    blogSlugField(),
  ],
};
