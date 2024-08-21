<script lang="ts">
  const { tileContent, tileIndex }: { tileContent: number | null; tileIndex: number } = $props();
</script>

<div style:background-color="var(--tile-color)" tabindex="-1">
  {tileContent}
  <div>
    {tileIndex}
  </div>
</div>

<style>
  div {
    position: relative;

    &:hover {
      padding: 0.3rem;
    }

    div {
      bottom: -1.3rem;
      font-size: 0.5rem;
      position: absolute;
    }
  }
</style>
