import { stepListIndexer, stepList, step } from "$lib/refs.svelte";

export const addStep = () => {
  stepListIndexer.v++;
  stepList.v.push($state.snapshot(step.v));
};

export const sanitizeInput = (s: string, allowedChars: string) => {
  const regex = new RegExp(`[^${allowedChars}]`, "g");
  return s.replace(regex, "");
};

export const changeTileContent = (tileIndex: number, newContent: number | null, isStepless?: undefined | boolean) => {
  step.v.tiles[tileIndex].content = newContent;
  if (!isStepless) addStep();
};
