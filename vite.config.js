const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig({
    plugins: [react()],
    esbuild: {
        loader: "jsx",
        include: /src\/.*\.js$/
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".js": "jsx"
            }
        }
    },
    test: {
        environment: "jsdom",
        setupFiles: "./src/setupTests.js"
    }
});
