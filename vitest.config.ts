/// <reference types="vitest" />
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["./test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["./src/index.ts", "./test/**/util.ts"],
    globals: true,
    coverage: {
      provider: "c8"
    }
  },
  resolve: {
    alias: {
      "@fp-ts/schema/test": path.resolve(__dirname, "/test"),
      "@fp-ts/schema": path.resolve(__dirname, "/src")
    }
  }
})
