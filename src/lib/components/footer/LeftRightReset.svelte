<script lang="ts">
  import { stepListIndexer, stepList, algorithm, target, step } from "$lib/refs.svelte";

  const onclick = () => {
    step.v = $state.snapshot(stepList.v[0]);
    stepList.reset();
    stepListIndexer.reset();
  };
</script>

<div>
  Target: {target.v}
  <br />
  Visual: {stepListIndexer.v + 1} / {stepList.v.length}
  <br />
  Algorithm: {algorithm.v}
</div>
{#if stepListIndexer.v !== 0}
  <button
    onclick={() => { stepListIndexer.v--; step.v = $state.snapshot(stepList.v[stepListIndexer.v]); console.log($state.snapshot(stepList.v[stepListIndexer.v])); }}
    class="fa-solid fa-arrow-left"
    aria-label="Left arrow"
  ></button>
{:else}
  <button style:visibility="hidden"></button>
{/if}
{#if stepListIndexer.v !== stepList.v.length - 1}
  <button
    onclick={() => { stepListIndexer.v++; step.v = $state.snapshot(stepList.v[stepListIndexer.v]); console.log($state.snapshot(stepList.v[stepListIndexer.v])); }}
    class="fa-solid fa-arrow-right"
    aria-label="Right arrow"
  ></button>
{:else}
  <button style:visibility="hidden"></button>
{/if}
<button class="fa-solid fa-rotate-right" aria-label="Reset footer" {onclick}></button>

<style>
  div {
    bottom: 20px;
    left: 20px;
    position: absolute;
  }
</style>
