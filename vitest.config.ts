/// <reference types="vitest" />
import path from "node:path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["./test/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    sequence: {
      concurrent: true
    }
  },
  resolve: {
    alias: {
      "@effect/schema/test": path.join(__dirname, "test"),
      "@effect/schema": path.join(__dirname, "src")
    }
  }
})
