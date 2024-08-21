<script lang="ts">
  import { stepsIndexer, steps } from "$lib/refs.svelte";

  import EmptyTile from "./EmptyTile.svelte";
  import Tile from "./Tile.svelte";
</script>

<main>
  {#each steps.v[stepsIndexer.v].tileContents as tileContent, i}
    <Tile --tile-color={steps.v[stepsIndexer.v].tileColors[i]} tileIndex={i} {tileContent} />
  {/each}

  <div>
    {steps.v[stepsIndexer.v].resultContent}
    {#each steps.v[stepsIndexer.v].metaTileContents as tileContent}
      <EmptyTile {tileContent} />
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
