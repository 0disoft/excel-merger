<script lang="ts">
  import Button from "$lib/components/Button.svelte";
</script>

<div class="drop-zone-container">
  <div class="content">
    <p>엑셀 파일을 여기에 드래그 앤 드롭 하세요</p>
    <p class="separator">또는</p>
    <Button>엑셀 파일 추가</Button>
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
    transition: background-color 0.2s ease;
  }

  .drop-zone-container:hover {
    background-color: #444;
    border-color: #777;
  }

  .content {
    text-align: center;
    color: #888;
  }

  .separator {
    margin: 1rem 0;
    font-size: 12px;
    text-transform: uppercase;
  }
</style>
