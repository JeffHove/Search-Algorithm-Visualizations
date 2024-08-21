<script lang="ts">
  import { sanitizeInput } from "$lib/shared";
  import { target } from "$lib/refs.svelte";
</script>

<input
  oninput={() => { target.v = sanitizeInput(target.v, "0-9-"); }}
  aria-label="Algorithm target number"
  placeholder="&#xf140"
  bind:value={target.v}
  class="fa-solid"
/>

<style>
  input {
    width: var(--button-width);
  }
</style>
