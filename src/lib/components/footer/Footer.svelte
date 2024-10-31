<script lang="ts">
  import LeftRightReset from "$lib/components/footer/LeftRightReset.svelte";
  import ArrayInput from "$lib/components/footer/ArrayInput.svelte";
  import Clipboard from "$lib/components/footer/Clipboard.svelte";
  import Target from "$lib/components/footer/Target.svelte";
  import { getGoPressed, step } from "$lib/refs.svelte";
  import Go from "$lib/components/footer/Go.svelte";
</script>

<footer class="flex h-9 justify-center" aria-label="Footer">
  {#if !getGoPressed()}
    {#if step.v.tiles.length > 0}
      <Clipboard />
    {/if}
    <ArrayInput />
    {#if step.v.tiles.length > 0}
      <Target />
      <Go />
    {/if}
  {:else}
    <LeftRightReset />
  {/if}
</footer>
