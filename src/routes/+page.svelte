<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import FileList from "$lib/components/FileList.svelte";
  import type { Event, UnlistenFn } from "@tauri-apps/api/event";
  import { Window, type DragDropEvent } from "@tauri-apps/api/window";
  import { onDestroy, onMount } from "svelte";

  let isHovering = false;
  let filePaths: string[] = [];
  let unlisten: UnlistenFn;

  onMount(async () => {
    console.log(
      "[DEBUG] onMount: 컴포넌트가 마운트되었습니다. 이벤트 리스너 등록을 시작합니다."
    );
    const appWindow = Window.getCurrent();

    unlisten = await appWindow.onDragDropEvent(
      (event: Event<DragDropEvent>) => {
        // ✅ 1단계: 이벤트 자체가 수신되는지 확인
        console.log("[DEBUG] onDragDropEvent: 이벤트 수신!", event);

        const { type } = event.payload;

        // ✅ 2단계: switch 문이 올바른 case로 들어가는지 확인
        console.log(`[DEBUG] Event Type: ${type}`);

        switch (type) {
          case "enter":
          case "over":
            isHovering = true;
            break;
          case "drop":
            isHovering = false;
            // ✅ 3단계: drop 이벤트 시 파일 경로(paths)가 제대로 들어오는지 확인
            console.log("[DEBUG] Drop-Payload:", event.payload);

            const droppedFiles = event.payload.paths.filter((path) =>
              path.toLowerCase().endsWith(".xlsx")
            );

            // ✅ 4단계: .xlsx 파일만 필터링 된 후의 결과 확인
            console.log("[DEBUG] Filtered .xlsx files:", droppedFiles);

            filePaths = [...filePaths, ...droppedFiles];
            break;
          case "leave":
            isHovering = false;
            break;
        }
      }
    );

    console.log("[DEBUG] onMount: 이벤트 리스너가 성공적으로 등록되었습니다.");
  });

  onDestroy(() => {
    if (unlisten) {
      unlisten();
      console.log("[DEBUG] onDestroy: 이벤트 리스너가 정리되었습니다.");
    }
  });
</script>

<div
  class="drop-zone-container"
  class:hover={isHovering}
  on:dragover|preventDefault
  on:drop|preventDefault
  role="region"
  aria-label="파일 드롭 영역"
>
  <div class="content">
    {#if filePaths.length === 0}
      <div class="initial-view">
        <p>엑셀 파일을 여기에 드래그 앤 드롭 하세요</p>
        <p class="separator">또는</p>
        <Button>엑셀 파일 추가</Button>
      </div>
    {:else}
      <FileList files={filePaths} />
    {/if}
  </div>
</div>

<style>
  /* ... .drop-zone-container, .drop-zone-container.hover, .separator 스타일은 그대로 둡니다 ... */
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
  .drop-zone-container.hover {
    background-color: #444;
    border-color: #007acc;
  }
  .content {
    text-align: center;
    color: #888;
    width: 100%; /* 너비를 100%로 설정하여 FileList가 꽉 차게 함 */
    height: 100%;
    display: flex; /* 자식 요소를 정렬하기 위해 flex 추가 */
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .initial-view {
    /* 파일이 없을 때의 뷰를 묶어줌 */
    text-align: center;
  }
  .separator {
    margin: 1rem 0;
    font-size: 12px;
    text-transform: uppercase;
  }
</style>
