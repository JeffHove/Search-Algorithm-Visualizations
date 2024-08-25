<script lang="ts">
  import { step } from "$lib/refs.svelte";
</script>

<main class="relative flex flex-1 flex-wrap items-center justify-center">
  <a href="https://github.com/Tree52/Search-Algorithm-Visualizations" class="absolute right-2 top-1">
    <i class="fa-brands fa-github"></i>
  </a>
  {#each step.v.tiles as _, i}
    <div class="relative m-px flex min-h-7 min-w-7 items-center justify-center p-1 hover:p-1.5" style:background-color={step.v.tiles[i].color} tabindex="-1">
      {step.v.tiles[i].content}
      <div class="absolute -bottom-5 text-xs">
        {i}
      </div>
    </div>
  {/each}
</main>

<div class="flex justify-center p-2">
  {step.v.resultContent}
  {#each step.v.metaTiles as _, i}
    <div class="m-px flex min-h-7 min-w-7 items-center justify-center border-2 border-white" tabindex="-1">
      {step.v.metaTiles[i].content}
    </div>
  {/each}
</div>
