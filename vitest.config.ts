/// <reference types="vitest" />
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["./test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["./test/**/util.ts"],
    globals: true,
    coverage: {
      provider: "v8"
    }
  },
  resolve: {
    alias: {
      "@effect/schema/test": path.resolve(__dirname, "/test"),
      "@effect/schema": path.resolve(__dirname, "/src")
    }
  }
})
