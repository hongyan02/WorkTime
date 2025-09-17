import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: "automatic",
        }),
    ],
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: "build",
        sourcemap: true,
    },
    esbuild: {
        loader: "jsx",
        include: /src\/.*\.js$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    },
});
