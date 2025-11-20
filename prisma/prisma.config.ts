import { defineConfig, env } from "prisma/config";

export default defineConfig({
     schema: "prisma/schema.prisma",

     datasource: {
          url: env("DATABASE_URL"), // Prisma 6 requires URL here
},

     migrations: {
     path: "prisma/migrations",
},
});
