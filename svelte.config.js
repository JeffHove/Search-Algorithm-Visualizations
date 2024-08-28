import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  /* eslint-disable-next-line no-undef */
  paths: { base: process.env.NODE_ENV === "production" ? "/Search-Algorithm-Visualizations" : "" },
  preprocess: vitePreprocess(),
  kit: { adapter: adapter() },
};

export default config;
