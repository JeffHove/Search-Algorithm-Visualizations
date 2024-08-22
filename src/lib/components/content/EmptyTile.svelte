<script lang="ts">
  import { step } from "$lib/refs.svelte";
  const { tileIndex }: { tileIndex: number } = $props();
</script>

<div tabindex="-1">
  {step.v.tiles[tileIndex].content}
</div>

<style>
  div {
    border: 2px white solid;
  }
</style>
