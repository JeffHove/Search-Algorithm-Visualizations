<script lang="ts">
  import { step } from "$lib/refs.svelte";

  const onclick = () => {
    navigator.clipboard.writeText(step.v.tiles.map(tile => tile.content).join(", "));
    alert("Array copied to clipboard");
  };
</script>

<button aria-label="Copy array to clipboard" class="fa-solid fa-clipboard mx-px w-12 bg-secondary-color transition active:bg-primary-color active:transition-none hover:bg-white hover:text-secondary-color" {onclick}></button>
