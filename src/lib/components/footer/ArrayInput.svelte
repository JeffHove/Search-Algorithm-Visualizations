<script lang="ts">
  import { sanitizeInput } from "$lib/shared.svelte";
  import { step } from "$lib/refs.svelte";

  const getRandomIntInclusive = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

  const pop = () => {
    if (arrayInput === "") step.v.tiles.pop();
    else {
      for (let i = 0; i < asNumberArray.length; i++) {
        const targetNumIndex = step.v.tiles.map(tile => tile.content).indexOf(asNumberArray[i]);
        if (targetNumIndex !== -1) step.v.tiles.splice(targetNumIndex, 1);
      }
    }
  };

  const push = () => {
    if (arrayInput === "") step.v.tiles.push({ content: getRandomIntInclusive(-9, 99), color: "var(--secondary-color)" });
    else for (let i = 0; i < asNumberArray.length; i++) step.v.tiles.push({ color: "var(--secondary-color)", content: asNumberArray[i] });
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (e.shiftKey) pop();
      else push();
    }
  };

  let arrayInput = $state("");
  let asNumberArray = $derived(arrayInput.split(",").map(str => parseFloat(str.trim())).filter(num => !isNaN(num)));
</script>

{#if step.v.tiles.length > 0}
  <button class="mx-px w-12 bg-secondary-color transition active:bg-primary-color active:transition-none hover:bg-white hover:text-secondary-color" aria-label="Remove array input" onclick={pop}>
    -
    <span class="absolute -ml-2 -mt-12 hidden text-xs text-secondary-color">Shift + Enter</span>
  </button>
{:else}
  <button class="invisible"></button>
{/if}
<input
  oninput={() => { arrayInput = sanitizeInput(arrayInput, "0-9, -"); }}
  aria-label="Array input comma number comma etc."
  onkeydown={handleKeydown}
  placeholder="#, #, ..."
  bind:value={arrayInput}
  class="fa-solid mx-px w-36 min-w-0 text-center text-black focus:placeholder:text-transparent"
  type="text"
/>
<button class="mx-px w-12 bg-secondary-color transition active:bg-primary-color active:transition-none hover:bg-white hover:text-secondary-color" aria-label="Add array input" onclick={push}>
  +
  <span class="absolute -mt-12 ml-2 hidden text-xs text-secondary-color">Enter</span>
</button>

<style>
  input[type="text"]:focus + button span,
  button:has(+ input[type="text"]:focus) span {
    display: block;
  }
</style>
