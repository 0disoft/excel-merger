<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { listen } from "@tauri-apps/api/event";
  import { onDestroy, onMount } from "svelte";

  // 드래그 중인지 여부를 추적하는 상태 변수
  let isHovering = false;
  // 사용자가 드롭한 파일 경로 목록을 저장할 상태 변수
  let filePaths: string[] = [];

  let unlistenHover: Function;
  let unlistenDrop: Function;
  let unlistenCancel: Function;

  // 컴포넌트가 화면에 마운트될 때 이벤트 리스너를 등록합니다.
  onMount(async () => {
    // 파일이 창 위로 드래그될 때 발생하는 이벤트
    unlistenHover = await listen<string[]>(
      "tauri://file-drop-hover",
      (event) => {
        isHovering = true;
      }
    );

    // 파일이 창에 드롭될 때 발생하는 이벤트
    unlistenDrop = await listen<string[]>("tauri://file-drop", (event) => {
      // event.payload가 드롭된 파일 경로들의 배열입니다.
      // 여기서 .xlsx 파일만 필터링할 수 있습니다.
      const droppedFiles = event.payload.filter((path) =>
        path.toLowerCase().endsWith(".xlsx")
      );
      filePaths = [...filePaths, ...droppedFiles];
      isHovering = false;
    });

    // 드래그가 취소될 때 (예: 창 밖으로 파일을 옮길 때)
    unlistenCancel = await listen<void>("tauri://file-drop-cancelled", () => {
      isHovering = false;
    });
  });

  // 컴포넌트가 파괴될 때 등록했던 리스너들을 정리(해제)합니다.
  // 이렇게 하지 않으면 메모리 누수가 발생할 수 있습니다.
  onDestroy(() => {
    if (unlistenHover) unlistenHover();
    if (unlistenDrop) unlistenDrop();
    if (unlistenCancel) unlistenCancel();
  });
</script>

<div class="drop-zone-container" class:hover={isHovering}>
  <div class="content">
    {#if filePaths.length === 0}
      <p>엑셀 파일을 여기에 드래그 앤 드롭 하세요</p>
      <p class="separator">또는</p>
      <Button>엑셀 파일 추가</Button>
    {:else}
      <ul class="file-list">
        {#each filePaths as path}
          <li>{path.split(/[\\/]/).pop()}</li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .drop-zone-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed #555;
    border-radius: 8px;
    background-color: #333;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
  }

  /* 드래그 중일 때 적용될 스타일 */
  .drop-zone-container.hover {
    background-color: #444;
    border-color: #007acc;
  }

  .content {
    text-align: center;
    color: #888;
    width: 90%;
  }

  .separator {
    margin: 1rem 0;
    font-size: 12px;
    text-transform: uppercase;
  }

  /* 임시 파일 목록 스타일 */
  .file-list {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    max-height: 200px;
    overflow-y: auto;
    color: #ccc;
    font-size: 13px;
    text-align: left;
  }
  .file-list li {
    background-color: #2a2a2a;
    padding: 4px 8px;
    border-radius: 4px;
    margin-bottom: 4px;
  }
</style>
