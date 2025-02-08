<script lang="ts">
  import { step } from "$lib/refs.svelte";
  import { fly } from "svelte/transition";

  const onclick = () => {
    navigator.clipboard.writeText(step.v.tiles.map(tile => tile.content).join(", "));
    alert("Array copied to clipboard");
  };
</script>

<button
  class="fa-solid fa-clipboard mx-px w-12 bg-secondary transition active:bg-primary active:transition-none hover:bg-white hover:text-secondary"
  transition:fly={{ duration: 1000, y: 80 }}
  aria-label="Copy array to clipboard"
  {onclick}
></button>
