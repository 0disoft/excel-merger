<script lang="ts">
  // $props()를 사용하여 표준 HTML 속성들을 쉽게 전달받습니다.
  let { children, ...rest } = $props();
</script>

<button type="button" class="btn" {...rest}>
  {@render children()}
</button>

<style>
  .btn {
    background-color: #0e639c;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .btn:hover {
    background-color: #1177bb;
  }

  .btn:active {
    background-color: #0c5586;
  }
</style>
