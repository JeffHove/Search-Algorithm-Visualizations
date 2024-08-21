<script lang="ts">
  import LeftRightReset from "$lib/components/footer/LeftRightReset.svelte";
  import ArrayInput from "$lib/components/footer/ArrayInput.svelte";
  import Clipboard from "$lib/components/footer/Clipboard.svelte";
  import Target from "$lib/components/footer/Target.svelte";
  import Go from "$lib/components/footer/Go.svelte";
  import { steps } from "$lib/refs.svelte";
</script>

<footer aria-label="Footer">
  {#if steps.v.length === 1}
    <ArrayInput />
    {#if steps.v[0].tileContents.length > 0}
      <Clipboard />
      <Go />
      <Target />
    {:else}
      <button style:visibility="hidden"></button>
      <button style:visibility="hidden"></button>
      <button style:visibility="hidden"></button>
    {/if}
  {:else}
    <LeftRightReset />
  {/if}
</footer>

<style>
  footer {
    display: flex;
    height: 2.25rem;
    justify-content: center;
  }

  :global {
    footer {
      button,
      input {
        border: none;
        font-size: inherit;
        margin: var(--lr-margin);
        padding: 0;
      }

      button {
        background-color: var(--secondary-color);
        color: inherit;
        cursor: pointer;
        font-weight: inherit;
        transition: var(--transition);
        width: var(--button-width);

        &:hover {
          background-color: var(--hover-color);
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

        &:focus::placeholder {
          color: transparent;
        }
      }
    }
  }
</style>
