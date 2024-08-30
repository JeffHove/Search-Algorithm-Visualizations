import { changeTileContent, addStep } from "$lib/shared.svelte";
import { stepList, step } from "$lib/refs.svelte";

export type SearchAlgorithm = (target: number, A: number[], leftIndex?: number, rightIndex?: number) => number;

const revealTile = (tileIndex: number, isStepless?: undefined | boolean) => {
  changeTileContent(tileIndex, stepList.v[0].tiles[tileIndex].content as number, true);
  if (!isStepless) addStep();
};

const colorTile = (tileIndex: number, color: string, isStepless?: undefined | boolean) => {
  step.v.tiles[tileIndex].color = color;
  revealTile(tileIndex, true);
  if (!isStepless) addStep();
};

const colorTiles = (startIndex: number, endIndex: number, color: string, isStepless?: undefined | boolean) => {
  for (let i = startIndex; i <= endIndex; i++) colorTile(i, color, true);
  if (!isStepless) addStep();
};

const newEmptyTile = () => {
  step.v.metaTiles.push({ content: null, color: "" });
};

const changeEmptyTileContent = (tileIndex: number, content: number | null) => {
  step.v.metaTiles[tileIndex].content = content;
  addStep();
};

// Unsorted Array Algos
const sentinel: SearchAlgorithm = (target, A) => {
  const last = A[A.length - 1];
  A[A.length - 1] = target;
  changeTileContent(A.length - 1, target);

  let i = 0;
  step.v.vars["i"] = i;
  if (A.length !== 1) revealTile(i);
  while (A[i] !== target) {
    colorTile(i, "white");
    i++;
    step.v.vars["i"] = i;
    if (i !== A.length - 1) revealTile(i);
  }

  A[A.length - 1] = last;
  changeTileContent(A.length - 1, null);

  if (i === A.length - 1) colorTile(A.length - 1, "green");
  if (i < A.length - 1 || A[A.length - 1] === target) return i;
  colorTile(A.length - 1, "white");

  return -1;
};

const linear: SearchAlgorithm = (target, A) => {
  for (let i = 0; i < A.length; i++) {
    step.v.vars["i"] = i;
    colorTile(i, "green");
    if (target === A[i]) return i;
    colorTile(i, "white");
  }

  return -1;
};

// Sorted Array Algos
const interpolation: SearchAlgorithm = (target, A, leftIndex = 0, rightIndex = A.length - 1) => {
  step.v.vars["leftIndex"] = leftIndex;
  step.v.vars["rightIndex"] = rightIndex;
  revealTile(leftIndex, true);
  revealTile(rightIndex);
  while (leftIndex <= rightIndex && target >= A[leftIndex] && target <= A[rightIndex]) {
    if (leftIndex === rightIndex) {
      colorTile(leftIndex, "green");
      if (A[leftIndex] === target) return leftIndex;
      colorTile(leftIndex, "white");
      return -1;
    }

    const pivot: number = leftIndex + Math.floor(((target - A[leftIndex]) * (rightIndex - leftIndex)) / (A[rightIndex] - A[leftIndex]));
    step.v.vars["pivot"] = pivot;

    colorTile(pivot, "green");
    if (A[pivot] === target) return pivot;

    if (A[pivot] < target) {
      colorTiles(0, pivot, "white");
      leftIndex = pivot + 1;
      step.v.vars["leftIndex"] = leftIndex;
      if (leftIndex !== rightIndex) revealTile(leftIndex);
    }
    else {
      colorTiles(pivot, A.length - 1, "white");
      rightIndex = pivot - 1;
      step.v.vars["rightIndex"] = rightIndex;
      if (leftIndex !== rightIndex) revealTile(rightIndex);
    }
  }

  colorTiles(0, A.length - 1, "white");
  return -1;
};

const exponential: SearchAlgorithm = (target, A) => {
  let i = 1;
  step.v.vars["i"] = i;
  if (i < A.length) revealTile(i);
  while (i < A.length && A[i] <= target) {
    colorTiles(0, i - 1, "white");
    i *= 2;
    step.v.vars["i"] = i;
    if (i < A.length) revealTile(i);
  }

  if (i < A.length - 1) colorTiles(i + 1, A.length - 1, "white");

  return binary(target, A, Math.floor(i / 2), Math.min(i, A.length - 1));
};

const ubiquitous: SearchAlgorithm = (target, A, leftIndex = 0, rightIndex = A.length - 1) => {
  step.v.vars["leftIndex"] = leftIndex;
  step.v.vars["rightIndex"] = rightIndex;
  while (rightIndex - leftIndex > 1) {
    const pivot: number = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    step.v.vars["pivot"] = pivot;
    revealTile(pivot);

    if (A[pivot] <= target) {
      colorTiles(0, pivot - 1, "white");
      leftIndex = pivot;
      step.v.vars["leftIndex"] = leftIndex;
    }
    else {
      colorTiles(pivot + 1, A.length - 1, "white");
      rightIndex = pivot;
      step.v.vars["rightIndex"] = rightIndex;
    }
  }

  colorTile(leftIndex, "green");
  if (A[leftIndex] === target) return leftIndex;
  colorTile(leftIndex, "white");

  colorTile(rightIndex, "green");
  if (A[rightIndex] === target) return rightIndex;
  colorTile(rightIndex, "white");

  return -1;
};

const fibonacci: SearchAlgorithm = (target, A) => {
  let fibA = 0;
  step.v.vars["fibA"] = fibA;
  let fibB = 1;
  step.v.vars["fibB"] = fibB;
  let fibC = fibA + fibB;
  step.v.vars["fibC"] = fibC;

  while (fibC < A.length) {
    fibA = fibB;
    step.v.vars["fibA"] = fibA;
    fibB = fibC;
    step.v.vars["fibB"] = fibB;
    fibC = fibA + fibB;
    step.v.vars["fibC"] = fibC;
  }

  let eliminatedFrontIndex = -1;
  step.v.vars["eliminatedFrontIndex"] = eliminatedFrontIndex;

  while (fibC > 1) {
    const pivot = Math.min(eliminatedFrontIndex + fibA, A.length - 1);
    step.v.vars["pivot"] = pivot;
    colorTile(pivot, "green");

    if (target < A[pivot]) {
      colorTiles(pivot, A.length - 1, "white");
      fibC = fibA;
      step.v.vars["fibC"] = fibC;
      fibB = fibB - fibA;
      step.v.vars["fibB"] = fibB;
      fibA = fibC - fibB;
      step.v.vars["fibA"] = fibA;
    }
    else if (A[pivot] === target) return pivot;
    else {
      colorTiles(0, pivot, "white");
      fibC = fibB;
      step.v.vars["fibC"] = fibC;
      fibB = fibA;
      step.v.vars["fibB"] = fibB;
      fibA = fibC - fibB;
      step.v.vars["fibA"] = fibA;
      eliminatedFrontIndex = pivot;
      step.v.vars["eliminatedFrontIndex"] = eliminatedFrontIndex;
    }
  }

  colorTile(A.length - 1, "green");
  if (fibB && A[A.length - 1] === target) return A.length - 1;
  colorTile(A.length - 1, "white");

  return -1;
};

const ternary: SearchAlgorithm = (target, A, leftIndex = 0, rightIndex = A.length - 1) => {
  step.v.vars["leftIndex"] = leftIndex;
  step.v.vars["rightIndex"] = rightIndex;
  while (rightIndex >= leftIndex) {
    const pivot1: number = leftIndex + Math.floor((rightIndex - leftIndex) / 3);
    step.v.vars["pivot1"] = pivot1;
    const pivot2: number = rightIndex - Math.floor((rightIndex - leftIndex) / 3);
    step.v.vars["pivot2"] = pivot2;

    colorTile(pivot1, "green", true);
    colorTile(pivot2, "green");
    if (A[pivot1] === target) return pivot1;
    if (A[pivot2] === target) return pivot2;

    if (target < A[pivot1]) {
      rightIndex = pivot1 - 1;
      step.v.vars["rightIndex"] = rightIndex;
      colorTiles(pivot1, A.length - 1, "white");
    }
    else if (target > A[pivot2]) {
      leftIndex = pivot2 + 1;
      step.v.vars["leftIndex"] = leftIndex;
      colorTiles(0, pivot2, "white");
    }
    else {
      leftIndex = pivot1 + 1;
      step.v.vars["leftIndex"] = leftIndex;
      rightIndex = pivot2 - 1;
      step.v.vars["rightIndex"] = rightIndex;
      colorTiles(0, pivot1, "white", true);
      colorTiles(pivot2, A.length - 1, "white");
    }
  }

  return -1;
};

const binary: SearchAlgorithm = (target, A, leftIndex = 0, rightIndex = A.length - 1) => {
  step.v.vars["leftIndex"] = leftIndex;
  step.v.vars["rightIndex"] = rightIndex;
  while (rightIndex >= leftIndex) {
    const pivot: number = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    step.v.vars["pivot"] = pivot;
    colorTile(pivot, "green");

    if (target < A[pivot]) {
      colorTiles(pivot, A.length - 1, "white");
      rightIndex = pivot - 1;
      step.v.vars["rightIndex"] = rightIndex;
    }
    else if (target === A[pivot]) return pivot;
    else {
      colorTiles(0, pivot, "white");
      leftIndex = pivot + 1;
      step.v.vars["leftIndex"] = leftIndex;
    }
  }

  return -1;
};

const jump: SearchAlgorithm = (target, A) => {
  let leftIndex = 0;
  step.v.vars["leftIndex"] = leftIndex;
  let rightIndex = Math.floor(Math.sqrt(A.length));
  step.v.vars["rightIndex"] = rightIndex;

  revealTile(Math.min(rightIndex, A.length) - 1);
  while (A[Math.min(rightIndex, A.length) - 1] < target) {
    colorTiles(0, Math.min(rightIndex, A.length) - 1, "white");
    leftIndex = rightIndex;
    step.v.vars["leftIndex"] = leftIndex;
    rightIndex += Math.floor(Math.sqrt(A.length));
    step.v.vars["rightIndex"] = rightIndex;
    if (leftIndex >= A.length) return -1;
    revealTile(Math.min(rightIndex, A.length) - 1);
  }

  if (rightIndex < A.length - 1) {
    colorTiles(rightIndex, A.length - 1, "white");
    revealTile(leftIndex);
  }
  while (A[leftIndex] < target) {
    colorTile(leftIndex, "white");
    leftIndex++;
    step.v.vars["leftIndex"] = leftIndex;
    if (leftIndex === Math.min(rightIndex, A.length)) return -1;
    if (leftIndex !== rightIndex - 1 && leftIndex !== A.length - 1) revealTile(leftIndex);
  }

  colorTile(leftIndex, "green");
  if (A[leftIndex] === target) return leftIndex;
  colorTiles(0, A.length - 1, "white");

  return -1;
};

const meta: SearchAlgorithm = (target, A) => {
  const numBitsNeededForMaxIndex = Math.ceil(Math.log2(A.length));
  step.v.vars["numBitsNeededForMaxIndex"] = numBitsNeededForMaxIndex;

  for (let i = 0; i < numBitsNeededForMaxIndex; i++) newEmptyTile();

  let cutoff = 0;
  step.v.vars["cutoff"] = cutoff;
  for (let i = numBitsNeededForMaxIndex - 1; i >= 0; i--) {
    step.v.vars["i"] = i;
    colorTile(cutoff, "green");
    if (A[cutoff] === target) return cutoff;
    colorTiles(0, cutoff, "white");

    const cutoffCandidate = cutoff | (1 << i);
    step.v.vars["cutoffCandidate"] = cutoffCandidate;

    if (cutoffCandidate < A.length) revealTile(cutoffCandidate);

    if (cutoffCandidate < A.length && A[cutoffCandidate] <= target) {
      cutoff = cutoffCandidate;
      step.v.vars["cutoff"] = cutoff;
      changeEmptyTileContent(numBitsNeededForMaxIndex - 1 - i, 1);
      continue;
    }
    colorTiles(cutoffCandidate, A.length - 1, "white", true);
    changeEmptyTileContent(numBitsNeededForMaxIndex - 1 - i, 0);
  }

  colorTile(cutoff, "green");
  if (A[cutoff] === target) return cutoff;
  colorTile(cutoff, "white");

  return -1;
};

export const unsortedAlgos: { [key: string]: SearchAlgorithm } = {
  Sentinel: sentinel,
  Linear: linear,
};

export const sortedAlgos: { [key: string]: SearchAlgorithm } = {
  Interpolation: interpolation,
  Exponential: exponential,
  Ubiquitous: ubiquitous,
  Fibonacci: fibonacci,
  Ternary: ternary,
  Binary: binary,
  Jump: jump,
  Meta: meta,
};
