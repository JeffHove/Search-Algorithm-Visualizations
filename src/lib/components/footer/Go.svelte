<script lang="ts">
  import { stepListIndexer, algorithm, stepList, target, step } from "$lib/refs.svelte";
  import { type SearchAlgorithm, unsortedAlgos, sortedAlgos } from "$lib/algos";
  import { changeTileContent, addStep } from "$lib/shared.svelte";
  import { fly } from "svelte/transition";

  const finalResult = (target: number, targetIndex: number) => {
    if (targetIndex !== -1) step.v.resultContent = "Target " + target + " is in the array at index " + targetIndex;
    else step.v.resultContent = "Target is not in the array";
    step.v.metaTiles = [];
    addStep();
  };

  const onclick = () => {
    if (target.v === "" || isNaN(Number(target.v))) step.v.resultContent = "Input valid target number";
    else {
      step.v.resultContent = "";
      let returnedIndex = -1;
      const searchFunction: SearchAlgorithm = unsortedAlgos[algorithm.v] || sortedAlgos[algorithm.v];
      if (searchFunction) {
        if (sortedAlgos[algorithm.v]) step.v.tiles.sort((a, b) => Number(a.content) - Number(b.content));
        addStep();
        for (let i = 0; i < step.v.tiles.length; i++) changeTileContent(i, null, true);
        addStep();
        returnedIndex = searchFunction(Number(target.v), stepList.v[0].tiles.map(tile => tile.content) as number[]);
      }
      else throw new Error(`Algorithm ${algorithm.v} has no matching key.`);
      finalResult(Number(target.v), returnedIndex);
      stepListIndexer.v = 1;
      step.v = $state.snapshot(stepList.v[1]);
    }
  };
</script>

<button
  class="mx-px w-12 bg-secondary-color transition active:bg-primary-color active:transition-none hover:bg-white hover:text-secondary-color"
  transition:fly={{ duration: 1000, y: 80 }}
  {onclick}
>Go</button>
