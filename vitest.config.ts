/// <reference types="vitest" />
import path from "node:path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["./test/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
  resolve: {
    alias: {
      "@effect/schema/test": path.resolve(__dirname, "/test"),
      "@effect/schema": path.resolve(__dirname, "/src")
    }
  }
})
