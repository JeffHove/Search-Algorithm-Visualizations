<script lang="ts">
  import { step } from "$lib/refs.svelte";
  const { tileIndex }: { tileIndex: number } = $props();
</script>

<div style:background-color={step.v.tiles[tileIndex].color} tabindex="-1">
  {step.v.tiles[tileIndex].content}
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
