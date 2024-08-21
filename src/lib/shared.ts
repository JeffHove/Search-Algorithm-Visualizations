import { stepsIndexer, steps } from "$lib/refs.svelte";

export const addStep = () => {
  stepsIndexer.v++;
  steps.v[stepsIndexer.v] = {
    metaTileContents: [...steps.v[stepsIndexer.v - 1].metaTileContents],
    tileContents: [...steps.v[stepsIndexer.v - 1].tileContents],
    resultContent: steps.v[stepsIndexer.v - 1].resultContent,
    tileColors: [...steps.v[stepsIndexer.v - 1].tileColors],
  };
};

export const sanitizeInput = (s: string, allowedChars: string) => {
  const regex = new RegExp(`[^${allowedChars}]`, "g");
  return s.replace(regex, "");
};

export const changeTileContent = (tileIndex: number, newContent: number | null, isStepless?: undefined | boolean) => {
  if (!isStepless) addStep();
  steps.v[stepsIndexer.v].tileContents[tileIndex] = newContent;
};
