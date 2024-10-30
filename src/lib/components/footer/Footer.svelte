<script lang="ts">
  import LeftRightReset from "$lib/components/footer/LeftRightReset.svelte";
  import ArrayInput from "$lib/components/footer/ArrayInput.svelte";
  import Clipboard from "$lib/components/footer/Clipboard.svelte";
  import Target from "$lib/components/footer/Target.svelte";
  import { stepList, step } from "$lib/refs.svelte";
  import Go from "$lib/components/footer/Go.svelte";
</script>

<footer class="flex h-9 justify-center" aria-label="Footer">
  {#if !stepList.goPressed}
    <ArrayInput />
    {#if step.v.tiles.length > 0}
      <Clipboard />
      <Go />
      <Target />
    {:else}
      <button class="invisible"></button>
      <button class="invisible"></button>
      <button class="invisible"></button>
    {/if}
  {:else}
    <LeftRightReset />
  {/if}
</footer>
