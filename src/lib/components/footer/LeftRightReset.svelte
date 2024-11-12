<script lang="ts">
  import { stepListIndexer, stepList, step } from "$lib/refs.svelte";
  import { slide } from "svelte/transition";

  const onclick = () => {
    step.v = $state.snapshot(stepList.v[0]);
    stepList.reset();
    stepListIndexer.reset();
  };
</script>

{#if stepListIndexer.v !== 1}
  <button
    class="fa-solid fa-arrow-left mx-px w-12 bg-secondary-color transition active:bg-primary-color active:transition-none hover:bg-white hover:text-secondary-color"
    onclick={() => { stepListIndexer.v--; step.v = $state.snapshot(stepList.v[stepListIndexer.v]); }}
    transition:slide={{ duration: 1000, axis: "x" }}
    aria-label="Left arrow"
  ></button>
{/if}
{#if stepListIndexer.v !== stepList.v.length - 1}
  <button
    class="fa-solid fa-arrow-right mx-px w-12 bg-secondary-color transition active:bg-primary-color active:transition-none hover:bg-white hover:text-secondary-color"
    onclick={() => { stepListIndexer.v++; step.v = $state.snapshot(stepList.v[stepListIndexer.v]); }}
    transition:slide={{ duration: 1000, axis: "x" }}
    aria-label="Right arrow"
  ></button>
{/if}
<button
  class="fa-solid fa-rotate-right mx-px w-12 bg-secondary-color transition active:bg-primary-color active:transition-none hover:bg-white hover:text-secondary-color"
  aria-label="Reset footer"
  {onclick}
></button>
