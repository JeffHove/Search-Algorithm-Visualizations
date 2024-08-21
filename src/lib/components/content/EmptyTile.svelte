<script lang="ts">
  const { tileContent }: { tileContent: number | null } = $props();
</script>

<div tabindex="-1">
  {tileContent}
</div>

<style>
  div {
    border: 2px white solid;
  }
</style>
