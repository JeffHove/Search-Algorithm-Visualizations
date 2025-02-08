<script lang="ts">
  import { sanitizeInput, go } from "$lib/shared.svelte";
  import { target } from "$lib/refs.svelte";
  import { fly } from "svelte/transition";
</script>

<input
  class="fa-solid mx-px w-12 min-w-0 bg-white text-center text-black focus:placeholder:text-transparent"
  oninput={() => { target.v = sanitizeInput(target.v, "0-9-"); }}
  onkeydown={(e) => { if (e.key === "Enter") go(); }}
  transition:fly={{ duration: 1000, y: 80 }}
  aria-label="Algorithm target number"
  placeholder="&#xf140"
  bind:value={target.v}
/>
