<script lang="ts">
  import Funding from "$lib/components/Funding.svelte";
  import Code from "$lib/components/Code.svelte";
  import { step } from "$lib/refs.svelte";
</script>

<main class="flex flex-1 overflow-auto">
  <Code />

  <div class="flex flex-1 flex-col overflow-auto">
    <div class="flex flex-1 flex-wrap items-center justify-center">
      {#each step.v.tiles as _, i}
        <div class="m-px">
          <div
            class="flex min-h-7 min-w-7 items-center justify-center p-1 hover:p-1.5"
            style:background-color={step.v.tiles[i].color}
            tabindex="-1"
          >
            {step.v.tiles[i].content}
          </div>
          <div class="text-center text-xs">
            {i}
          </div>
        </div>
      {/each}
    </div>

    <div class="flex items-center justify-center p-2 text-sm">
      {step.v.resultContent}
      {#each step.v.metaTiles as _, i}
        <div class="m-px flex h-7 w-7 items-center justify-center border-2 border-white text-base" tabindex="-1">
          {step.v.metaTiles[i].content}
        </div>
      {/each}
    </div>
  </div>

  <Funding />
</main>
