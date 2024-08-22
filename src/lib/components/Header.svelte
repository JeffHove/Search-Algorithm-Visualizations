<script lang="ts">
  import { stepList, algorithm, step } from "$lib/refs.svelte";
  import { unsortedAlgos, sortedAlgos } from "$lib/algos";
</script>

{#if stepList.v.length === 0}
  <header aria-label="Header algorithms checklist">
    <div>
      {#each Object.keys(unsortedAlgos) as key}
        <input bind:group={algorithm.v} name="algorithm" type="radio" value={key} id={key} />
        <label for={key}>{key}</label>
      {/each}
    </div>

    <div>
      {#each Object.keys(sortedAlgos) as key}
        <input bind:group={algorithm.v} name="algorithm" type="radio" value={key} id={key} />
        <label for={key}>{key}</label>
      {/each}
    </div>
  </header>
{/if}

<style>
  header {
    border-bottom: white 2px solid;
    font-size: 0.75rem;

    div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      input[type="radio"],
      label {
        /* input[type="radio"] needs this, set opacity to 1 to see. */
        cursor: pointer;
      }

      input[type="radio"] {
        opacity: 0;
        position: fixed;

        &:checked + label {
          background-color: var(--hover-color);
          color: var(--secondary-color);
        }
      }

      label {
        background-color: var(--secondary-color);
        padding: 0.25rem 0.5rem;
        transition: var(--transition);

        &:hover {
          background-color: var(--hover-color);
          color: var(--secondary-color);
        }
      }
    }
  }
</style>
