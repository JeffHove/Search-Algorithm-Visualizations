<script lang="ts">
  import LeftRightReset from "$lib/components/footer/LeftRightReset.svelte";
  import ArrayInput from "$lib/components/footer/ArrayInput.svelte";
  import Clipboard from "$lib/components/footer/Clipboard.svelte";
  import Target from "$lib/components/footer/Target.svelte";
  import { stepList, step } from "$lib/refs.svelte";
  import Go from "$lib/components/footer/Go.svelte";
</script>

<footer class="flex h-9 justify-center" aria-label="Footer">
  {#if stepList.v.length === 0}
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

<style>
  :global {
    footer {
      button,
      input {
        border: none;
        font-size: inherit;
        margin: 0 1px;
        padding: 0;
      }

      button {
        background-color: var(--secondary-color);
        color: inherit;
        cursor: pointer;
        font-weight: inherit;
        transition: background-color 0.15s ease-out, color 0.15s ease-out;
        width: 3rem;

        &:hover {
          background-color: white;
          color: var(--secondary-color);
        }

        &:active {
          background-color: var(--primary-color);
          transition: none;
        }
      }

      input {
        min-width: 0; /* Window Resizing */
        outline: none;
        text-align: center;
        color: black;

        &:focus::placeholder {
          color: transparent;
        }
      }
    }
  }
</style>
