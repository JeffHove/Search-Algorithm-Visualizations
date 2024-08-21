import { stepsIndexer, steps } from "./refs.svelte";

const addStep = (): void => {
  stepsIndexer.v++;
  steps.v[stepsIndexer.v] = {
    metaTileContents: [...steps.v[stepsIndexer.v - 1].metaTileContents],
    tileContents: [...steps.v[stepsIndexer.v - 1].tileContents],
    resultContent: steps.v[stepsIndexer.v - 1].resultContent,
    tileColors: [...steps.v[stepsIndexer.v - 1].tileColors],
  };
};

// algos.ts functions:
export const changeTileContent = (tileIndex: number, newContent: number | null, isStepless?: undefined | boolean): void => {
  if (!isStepless) addStep();
  steps.v[stepsIndexer.v].tileContents[tileIndex] = newContent;
};

export const revealTile = (tileIndex: number, isStepless?: undefined | boolean): void => {
  if (!isStepless) addStep();
  changeTileContent(tileIndex, steps.v[0].tileContents[tileIndex] as number, true);
};

export const colorTile = (tileIndex: number, color: string, isStepless?: undefined | boolean): void => {
  if (!isStepless) addStep();
  steps.v[stepsIndexer.v].tileColors[tileIndex] = color;
  revealTile(tileIndex, true);
};

export const colorTiles = (startIndex: number, endIndex: number, color: string, isStepless?: undefined | boolean): void => {
  if (!isStepless) addStep();
  for (let i: number = startIndex; i <= endIndex; i++) colorTile(i, color, true);
};

export const newEmptyTile = (): void => {
  steps.v[stepsIndexer.v].metaTileContents.push(null);
};

export const changeEmptyTileContent = (tileIndex: number, content: number | null, isStepless?: undefined | boolean): void => {
  if (!isStepless) addStep();
  steps.v[stepsIndexer.v].metaTileContents[tileIndex] = content;
};

// Go.svelte functions:
export const hideTiles = (): void => {
  addStep();
  for (let i: number = 0; i < steps.v[0].tileColors.length; i++) changeTileContent(i, null, true);
};

export const finalResult = (target: number, targetIndex: number): void => {
  addStep();
  if (targetIndex !== -1) steps.v[stepsIndexer.v].resultContent = "Target " + target + " is in the array at index " + targetIndex;
  else steps.v[stepsIndexer.v].resultContent = "Target is not in the array";
  steps.v[stepsIndexer.v].metaTileContents = [];
};
