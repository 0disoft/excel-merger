<script lang="ts">
  // 나중에 이 변수를 통해 외부에서 메시지를 제어하게 됩니다.
  let statusMessage = "준비 완료. 엑셀 파일을 추가해주세요.";
</script>

<div class="statusbar">
  <span>{statusMessage}</span>
</div>

<style>
  .statusbar {
    height: 24px;
    background-color: #007acc; /* Visual Studio Code 스타일 */
    color: white;
    font-size: 12px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    flex-shrink: 0; /* 크기가 줄어들지 않도록 설정 */
  }
</style>
