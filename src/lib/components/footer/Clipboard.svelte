<script lang="ts">
  import { steps } from "$lib/refs.svelte";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(steps.v[0].tileContents.join(", "));
    alert("Array copied to clipboard");
  };
</script>

<button aria-label="Copy array to clipboard" class="fa-solid fa-clipboard" onclick={copyToClipboard}></button>
