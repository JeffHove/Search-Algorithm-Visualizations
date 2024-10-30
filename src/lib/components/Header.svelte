<script lang="ts">
  import { stepListIndexer, algorithm, stepList, target } from "$lib/refs.svelte";
  import { unsortedAlgos, sortedAlgos } from "$lib/algos";
</script>

<header class="flex flex-wrap justify-center border-b-2 border-b-white" aria-label="Header algorithms checklist">
  {#if !stepList.goPressed}
    {#each [...Object.keys(unsortedAlgos), ...Object.keys(sortedAlgos)] as key, i}
      {#if i === Object.keys(unsortedAlgos).length}&nbsp;{/if}
      <input bind:group={algorithm.v} name="algorithm" class="pointer-events-none fixed opacity-0" type="radio" value={key} id={key} />
      <label class="cursor-pointer bg-secondary-color px-2 py-1 transition-colors hover:bg-white hover:text-secondary-color" for={key}>{key}</label>
    {/each}
  {:else}
    <div class="p-2 text-xs">
      Algorithm: {algorithm.v} <br />
      Visual: {stepListIndexer.v} / {stepList.v.length - 1} <br />
      Target: {target.v}
    </div>
  {/if}
</header>

<style>
  input[type="radio"]:checked + label {
    background-color: white;
    color: var(--secondary-color);
  }
</style>
