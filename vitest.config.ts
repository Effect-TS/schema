/// <reference types="vitest" />
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["./test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["./test/**/util.ts"],
    globals: true
  },
  resolve: {
    alias: {
      "@fp-ts/schema/test": path.resolve(__dirname, "/test"),
      "@fp-ts/schema": path.resolve(__dirname, "/src")
    }
  }
})
