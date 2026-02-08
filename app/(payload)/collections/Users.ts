import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: ({ req }) => req.user?.role === "admin",
    read: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  auth: {
    loginWithUsername: true,
    maxLoginAttempts: 5,
    lockTime: 1,
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "user",
      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
      ],
    },
  ],
};
