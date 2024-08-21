import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import graphqlLoader from "vite-plugin-graphql-loader";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/repository-search/",
  plugins: [react(), svgr(), graphqlLoader()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
