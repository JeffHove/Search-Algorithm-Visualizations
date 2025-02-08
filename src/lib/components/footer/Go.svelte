<script lang="ts">
  import { go } from "$lib/shared.svelte";
  import { fly } from "svelte/transition";
</script>

<button
  class="mx-px w-12 bg-secondary transition active:bg-primary active:transition-none hover:bg-white hover:text-secondary"
  transition:fly={{ duration: 1000, y: 80 }}
  onclick={go}
>Go</button>
