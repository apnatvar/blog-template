import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { postgresAdapter } from "@payloadcms/db-postgres";
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

function getDatabase() {
  const provider = process.env.DB_PROVIDER;
  if (!provider) {
    throw new Error("DB_PROVIDER is not defined");
  }

  switch (provider) {
    case "mongo":
      return mongooseAdapter({
        url: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${process.env.MONGO_DATABASE}?authSource=admin`,
      });

    case "sqlite":
      return sqliteAdapter({
        client: {
          url: `file:./${process.env.SQLITEDB}.db`,
        },
      });

    case "postgres":
      return postgresAdapter({
        pool: {
          connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.POSTGRES_DB}`,
        },
        // prodMigrations: migrations, // might have to change this to migrations after you create it with npx payload migrations:create
      });

    default:
      throw new Error(`Unsupported DB_PROVIDER: ${provider}`);
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // use this to create the first user in your docker-production template
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
  db: getDatabase(),
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
