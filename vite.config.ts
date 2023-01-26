import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import babel from "@rollup/plugin-babel";
// @ts-ignore
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  base: "/shared-vue3/",
  server: {
    port: 3000
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  test: {
    setupFiles: ["./vitest.setup.ts"],
    environment: "happy-dom",
    deps: {
      inline: ["vitest-canvas-mock"]
    },
    threads: false
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/entry.ts"),
      name: "example-library-repro-font-awesome-treeshaking",
      formats: ["es"],
      fileName: (format) =>
        `example-library-repro-font-awesome-treeshaking.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "vue-i18n"],
      output: {
        /**
         * preserveModules build all modules with default imports
         */
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
          "vue-i18n": "vueI18n"
        }
      },
      plugins: [
        peerDepsExternal(),
        babel({
          exclude: "node_modules/**",
          // BABEL EXTENSIONS ERROR STYLE TAG ".vue"
          extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
          babelHelpers: "bundled",
          skipPreflightCheck: true,
          presets: [["@babel/preset-env"], "@babel/preset-typescript"]
        })
      ]
    }
  },
  plugins: [
    /**
     * DTS is responsible for creating .d.ts.
     * We used this, because vue-tsc doesn't generate index.d.ts file which
     * is responsible for good recognition in default project.
     */
    dts({
      staticImport: true,
      // skipDiagnostics: false,
      // logDiagnostics: true,
      insertTypesEntry: true,
      rollupTypes: false
    }),
    vue(),
    visualizer()
  ],
  css: {
    postcss: {
      plugins: []
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
