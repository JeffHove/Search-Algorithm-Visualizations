<script lang="ts">
  import { ShikiMagicMove } from "shiki-magic-move/svelte";
  import { algorithm, step } from "$lib/refs.svelte";
  import { algosSimple } from "$lib/algosSimple";
  import { createHighlighter } from "shiki";
  import "shiki-magic-move/dist/style.css";

  let sidebarOpen = $state(false);

  const highlighter = createHighlighter({
    langs: ["javascript"],
    themes: ["dark-plus"],
  });
</script>

<main class="flex flex-1 overflow-auto">
  <div class="flex">
    <div
      class="overflow-auto bg-secondary-color text-[.5rem] transition-all duration-1000"
      style:padding={sidebarOpen ? ".25rem" : "0"}
      style:width={sidebarOpen ? "100%" : "0"}
    >
      {#await highlighter then highlighter}
        <ShikiMagicMove
          options={{ containerStyle: false, lineNumbers: true, duration: 1000, stagger: 0.3 }}
          code={algosSimple[algorithm.v].toString()}
          theme="dark-plus"
          {highlighter}
          lang="js"
        />
      {/await}
    </div>
    <div class="mt-1 h-10 bg-secondary-color">
      <button
        class="h-full p-1 fa-solid fa-arrow-right transition-transform duration-1000"
        style:transform={sidebarOpen ? "rotate(-180deg)" : ""}
        onclick={() => { sidebarOpen = !sidebarOpen; }}
      ></button>
    </div>
  </div>

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
          <div class="p-0.5 text-center text-xs">
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

  <div class="p-1">
    <a href="https://github.com/Tree52/Search-Algorithm-Visualizations">
      <i class="fa-brands fa-github"></i>
    </a>
  </div>
</main>
