<script lang="ts">
  import { stepListIndexer, stepList, step } from "$lib/refs.svelte";

  const onclick = () => {
    step.v = $state.snapshot(stepList.v[0]);
    stepList.reset();
    stepListIndexer.reset();
  };
</script>

{#if stepListIndexer.v !== 1}
  <button
    onclick={() => { stepListIndexer.v--; step.v = $state.snapshot(stepList.v[stepListIndexer.v]); }}
    class="fa-solid fa-arrow-left"
    aria-label="Left arrow"
  ></button>
{:else}
  <button class="invisible"></button>
{/if}
{#if stepListIndexer.v !== stepList.v.length - 1}
  <button
    onclick={() => { stepListIndexer.v++; step.v = $state.snapshot(stepList.v[stepListIndexer.v]); }}
    class="fa-solid fa-arrow-right"
    aria-label="Right arrow"
  ></button>
{:else}
  <button class="invisible"></button>
{/if}
<button class="fa-solid fa-rotate-right" aria-label="Reset footer" {onclick}></button>
