<script lang="ts">
  import { stepsIndexer, algorithm, target, steps } from "$lib/refs.svelte";
</script>

<div>
  Target: {target.v}
  <br />
  Visual: {stepsIndexer.v} / {steps.v.length - 1}
  <br />
  Algorithm: {algorithm.v}
</div>
{#if stepsIndexer.v !== 1}
  <button
    onclick={() => { stepsIndexer.v--; }}
    class="fa-solid fa-arrow-left"
    aria-label="Left arrow"
  ></button>
{:else}
  <button style:visibility="hidden"></button>
{/if}
{#if stepsIndexer.v !== steps.v.length - 1}
  <button
    onclick={() => { stepsIndexer.v++; }}
    class="fa-solid fa-arrow-right"
    aria-label="Right arrow"
  ></button>
{:else}
  <button style:visibility="hidden"></button>
{/if}
<button onclick={() => { stepsIndexer.reset(); steps.v.splice(1); }} class="fa-solid fa-rotate-right" aria-label="Reset footer"></button>

<style>
  div {
    bottom: 20px;
    left: 20px;
    position: absolute;
  }
</style>
