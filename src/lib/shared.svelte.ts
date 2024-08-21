import { stepsIndexer, steps } from "$lib/refs.svelte";

export const addStep = () => {
  stepsIndexer.v++;
  steps.v[stepsIndexer.v] = $state.snapshot(steps.v[stepsIndexer.v - 1]);
};

export const sanitizeInput = (s: string, allowedChars: string) => {
  const regex = new RegExp(`[^${allowedChars}]`, "g");
  return s.replace(regex, "");
};

export const changeTileContent = (tileIndex: number, newContent: number | null, isStepless?: undefined | boolean) => {
  if (!isStepless) addStep();
  steps.v[stepsIndexer.v].tileContents[tileIndex] = newContent;
};
