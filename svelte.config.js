import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: { adapter: adapter() },
  paths: { base: process.env.NODE_ENV === "production" ? "/Search-Algorithm-Visualizations" : "" }
};

export default config;
