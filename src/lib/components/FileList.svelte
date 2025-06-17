<script lang="ts">
  // 부모 컴포넌트로부터 파일 경로 배열을 전달받기 위한 prop 정의
  let { files } = $props<{ files: string[] }>();
</script>

<div class="file-list-wrapper">
  {#if files.length > 0}
    <ul class="file-list">
      {#each files as path (path)}
        <li class="file-item">
          <span class="file-icon">📄</span>
          <span class="file-name" title={path}>{path.split(/[\\/]/).pop()}</span
          >

          <button
            class="remove-btn"
            aria-label="{path.split(/[\\/]/).pop()} 파일 제거"
          >
            &times;
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="empty-message">파일이 없습니다.</div>
  {/if}
</div>

<style>
  .file-list-wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 0.5rem;
  }

  .file-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .file-item {
    display: flex;
    align-items: center;
    background-color: #2a2a2a;
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 6px;
    color: #ccc;
    font-size: 14px;
  }

  .file-icon {
    margin-right: 8px;
    font-size: 16px;
  }

  .file-name {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
    padding: 0 4px;
    margin-left: 8px;
  }

  .remove-btn:hover {
    color: #eee;
  }

  .empty-message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #666;
  }
</style>
