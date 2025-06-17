// Tauri doesn't have a Node.js server to do proper SSR
// so we will use adapter-static to prerender the app (SSG)
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // fallback: 'index.html'을 설정해주는 것이 좋습니다.
      // Tauri에서 새로고침 시에도 페이지를 제대로 찾게 해줍니다.
      fallback: 'index.html'
    }),
  },
};

export default config;
