import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  IndentFeature,
  InlineCodeFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Blogs } from "./collections/Blogs";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // onInit: async (payload) => {
  //   const existingUsers = await payload.find({
  //     collection: "users",
  //     limit: 1,
  //   });

  //   if (existingUsers.docs.length === 0) {
  //     await payload.create({
  //       collection: "users",
  //       data: {
  //         email: "",
  //         username: process.env.FIRST_USER_USERNAME ?? "",
  //         password: process.env.FIRST_USER_PASSWORD ?? "",
  //         role: "admin",
  //       },
  //       draft: false,
  //       overrideAccess: true,
  //     });
  //     console.log("Initial admin user seeded successfully!");
  //   }
  // },
  collections: [Users, Media, Blogs],
  editor: lexicalEditor({
    features: [
      BoldFeature(),
      UnderlineFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      LinkFeature(),
      ItalicFeature(),
      FixedToolbarFeature(),
      StrikethroughFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),
      InlineCodeFeature(),
      ParagraphFeature(),
      HeadingFeature(),
      IndentFeature(),
      ChecklistFeature(),
      UploadFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      uploadsCollection: "media",
      generateTitle: ({ doc }) => `ChangeThis.com — ${doc.title}`,
      collections: ["blogs"],
      tabbedUI: true,
    }),
  ],
});
