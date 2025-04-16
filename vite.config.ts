import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyPlugin from '@netlify/vite-plugin-react-router'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env': env
    },
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), netlifyPlugin()],
    build: {
      target: "esnext",
    }
  }
});
