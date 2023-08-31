import { defineConfig } from "vitest/dist/config";

export default defineConfig({
    build: {
        lib: {
            entry: 'lib/index.js',
            formats: ['es'],
            fileName: 'extract-md-data'
        },
        minify: "esbuild"
    }
})