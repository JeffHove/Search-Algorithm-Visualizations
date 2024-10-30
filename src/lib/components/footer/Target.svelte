<script lang="ts">
  import { sanitizeInput } from "$lib/shared.svelte";
  import { target } from "$lib/refs.svelte";
</script>

<input
  oninput={() => { target.v = sanitizeInput(target.v, "0-9-"); }}
  aria-label="Algorithm target number"
  placeholder="&#xf140"
  bind:value={target.v}
  class="fa-solid mx-px w-12 min-w-0 text-center text-black focus:placeholder:text-transparent"
/>
