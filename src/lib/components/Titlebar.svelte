<script lang="ts">
  import { Window } from "@tauri-apps/api/window";
  const appWindow = new Window("main");
</script>

<div data-tauri-drag-region class="titlebar">
  <div class="title">
    <img src="/favicon.png" alt="icon" />
    ExcelMerger
  </div>

  <div class="titlebar-buttons">
    <button
      type="button"
      class="titlebar-button"
      aria-label="최소화"
      on:click={() => appWindow.minimize()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14"
        /></svg
      >
    </button>
    <button
      type="button"
      class="titlebar-button"
      aria-label="최대화"
      on:click={() => appWindow.toggleMaximize()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        /></svg
      >
    </button>
    <button
      type="button"
      class="titlebar-button close"
      aria-label="닫기"
      on:click={() => appWindow.close()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18 6L6 18M6 6l12 12"
        /></svg
      >
    </button>
  </div>
</div>

<style>
  .titlebar {
    height: 30px;
    background: #1e1e1e;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    padding: 0 8px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #ccc;
    pointer-events: none;
  }
  .title img {
    width: 16px;
    height: 16px;
  }
  .titlebar-buttons {
    display: flex;
    align-items: center;
    height: 100%;
  }

  /* <button> 태그의 기본 스타일을 제거하여 
    이전의 <div>처럼 보이게 만듭니다. 
  */
  .titlebar-button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: #ccc;
  }
  .titlebar-button:hover {
    background-color: #333;
  }
  .titlebar-button.close:hover {
    background-color: #e81123;
    color: white;
  }
</style>
