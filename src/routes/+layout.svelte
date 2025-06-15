<!-- src/routes/+layout.svelte -->
<script>
  import Statusbar from "$lib/components/Statusbar.svelte";
  import Titlebar from "$lib/components/Titlebar.svelte";
  // Svelte 5 방식: { children } 프롭을 통해 페이지 콘텐츠를 받습니다.
  let { children } = $props();
</script>

<div class="app-container">
  <header class="titlebar-container">
    <Titlebar />
  </header>

  <main class="main-content">
    {@render children()}
  </main>

  <footer class="statusbar-container">
    <Statusbar />
  </footer>
</div>

<style>
  /* :global(body) ... */
  :global(body) {
    margin: 0;
    font-family: system-ui, sans-serif;
    overflow: hidden; /* 스크롤바 숨기기 */
  }

  .app-container {
    padding-top: 30px; /* 타이틀바 높이 */
    display: flex;
    flex-direction: column;
    height: 100vh; /* 화면 전체 높이 */
    width: 100vw;
    background-color: #2a2a2a;
    color: #f0f0f0;
  }

  .main-content {
    flex-grow: 1; /* 남은 공간을 모두 차지 */
    display: flex;
    padding: 1rem;
  }

  /* 타이틀바와 상태바는 내용에 따라 크기가 결정되도록 설정 */
  .titlebar-container,
  .statusbar-container {
    flex-shrink: 0;
  }
</style>
