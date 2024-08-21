<script lang="ts">
  import { type SearchAlgorithm, unsortedAlgos, sortedAlgos } from "$lib/algos";
  import { stepsIndexer, algorithm, target, steps } from "$lib/refs.svelte";
  import { changeTileContent, addStep } from "$lib/shared";

  const hideTiles = () => {
    addStep();
    for (let i = 0; i < steps.v[0].tileColors.length; i++) changeTileContent(i, null, true);
  };

  const finalResult = (target: number, targetIndex: number) => {
    addStep();
    if (targetIndex !== -1) steps.v[stepsIndexer.v].resultContent = "Target " + target + " is in the array at index " + targetIndex;
    else steps.v[stepsIndexer.v].resultContent = "Target is not in the array";
    steps.v[stepsIndexer.v].metaTileContents = [];
  };

  const merge = (left: number[], right: number[]) => {
    const sortedArray: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        sortedArray.push(left[leftIndex]);
        leftIndex++;
      }
      else {
        sortedArray.push(right[rightIndex]);
        rightIndex++;
      }
    }

    while (leftIndex < left.length) {
      sortedArray.push(left[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      sortedArray.push(right[rightIndex]);
      rightIndex++;
    }

    return sortedArray;
  };

  const mergeSort = (array: number[]): number[] => {
    if (array.length <= 1) return array;

    const middle = Math.floor(array.length / 2);
    const leftArray = array.slice(0, middle);
    const rightArray = array.slice(middle);

    return merge(mergeSort(leftArray), mergeSort(rightArray));
  };

  const onclick = () => {
    if (target.v === "" || isNaN(Number(target.v))) steps.v[0].resultContent = "Input valid target number";
    else {
      steps.v[0].resultContent = "";
      let returnedIndex = -1;
      const searchFunction: SearchAlgorithm = unsortedAlgos[algorithm.v] || sortedAlgos[algorithm.v];
      if (searchFunction) {
        if (sortedAlgos[algorithm.v]) {
          steps.v[0].tileContents = mergeSort(steps.v[0].tileContents as number[]);
        }
        hideTiles();
        returnedIndex = searchFunction(Number(target.v), [...steps.v[0].tileContents] as number[]);
      }
      else throw new Error(`Algorithm ${algorithm.v} has no matching key.`);
      finalResult(Number(target.v), returnedIndex);
      stepsIndexer.v = 1;
    }
  };
</script>

<button {onclick}>Go</button>
