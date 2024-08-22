<script lang="ts">
  import EmptyTile from "$lib/components/content/EmptyTile.svelte";
  import Tile from "$lib/components/content/Tile.svelte";
  import { step } from "$lib/refs.svelte";
</script>

<main>
  {#each step.v.tiles as _, i}
    <Tile tileIndex={i} />
  {/each}

  <div>
    {step.v.resultContent}
    {#each step.v.metaTiles as _, i}
      <EmptyTile tileIndex={i} />
    {/each}
  </div>
</main>

<style>
  main {
    align-items: center;
    display: flex;
    justify-content: center;
    flex: 1;

    div {
      bottom: 3rem;
      display: flex;
      position: absolute;
    }
  }

  :global {
    main {
      div {
        align-items: center;
        display: flex;
        justify-content: center;
        height: var(--tile-height);
        margin: var(--lr-margin);
        min-width: var(--tile-height);
        padding: 0.25rem;
      }
    }
  }
</style>
