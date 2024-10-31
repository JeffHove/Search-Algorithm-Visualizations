<script lang="ts">
  import { ShikiMagicMove } from "shiki-magic-move/svelte";
  import { algorithm, step } from "$lib/refs.svelte";
  import { createHighlighter } from "shiki";
  import "shiki-magic-move/dist/style.css";

  let sidebarOpen = $state(false);

  const highlighter = createHighlighter({
    langs: ["javascript"],
    themes: ["dark-plus"],
  });

  const code = $derived.by(() => {
    const interpolation = `function interpolation(target, A) {
  let leftIndex = 0;
  let rightIndex = A.length - 1;

  while (leftIndex <= rightIndex && target >= A[leftIndex] && target <= A[rightIndex]) {
    if (leftIndex === rightIndex) {
      if (A[leftIndex] === target) return leftIndex;
      return -1;
    }

    const pivot = leftIndex + Math.floor(
      ((target - A[leftIndex]) * (rightIndex - leftIndex)) / (A[rightIndex] - A[leftIndex]),
    );

    if (A[pivot] === target) return pivot;

    if (A[pivot] < target) leftIndex = pivot + 1;
    else rightIndex = pivot - 1;
  }

  return -1;
}
  
// leftIndex = ${step.v.vars["leftIndex"]}
// rightIndex = ${step.v.vars["rightIndex"]}
// pivot = ${step.v.vars["pivot"]}`;

    const exponential = `function exponential(target, A) {
  let i = 1;
  while (i < A.length && A[i] <= target) i *= 2;

  // Binary Search
  let leftIndex = Math.floor(i / 2);
  let rightIndex = Math.min(i, A.length - 1);

  while (rightIndex >= leftIndex) {
    const pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);

    if (target < A[pivot]) rightIndex = pivot - 1;
    else if (target === A[pivot]) return pivot;
    else leftIndex = pivot + 1;
  }

  return -1;
}

// i = ${step.v.vars["i"]}
// leftIndex = ${step.v.vars["leftIndex"]}
// rightIndex = ${step.v.vars["rightIndex"]}
// pivot = ${step.v.vars["pivot"]}`;

    const ubiquitous = `function ubiquitous(target, A) {
  let leftIndex = 0;
  let rightIndex = A.length - 1;

  while (rightIndex - leftIndex > 1) {
    const pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);

    if (A[pivot] <= target) leftIndex = pivot;
    else rightIndex = pivot;
  }

  if (A[leftIndex] === target) return leftIndex;
  if (A[rightIndex] === target) return rightIndex;

  return -1;
}

// leftIndex = ${step.v.vars["leftIndex"]}
// rightIndex = ${step.v.vars["rightIndex"]}`;

    const fibonacci = `function fibonacci(target, A) {
  let fibA = 0;
  let fibB = 1;
  let fibC = fibA + fibB;

  while (fibC < A.length) {
    fibA = fibB;
    fibB = fibC;
    fibC = fibA + fibB;
  }

  let eliminatedFrontIndex = -1;

  while (fibC > 1) {
    const pivot = Math.min(eliminatedFrontIndex + fibA, A.length - 1);

    if (target < A[pivot]) {
      fibC = fibA;
      fibB = fibB - fibA;
      fibA = fibC - fibB;
    }
    else if (A[pivot] === target) return pivot;
    else {
      fibC = fibB;
      fibB = fibA;
      fibA = fibC - fibB;
      eliminatedFrontIndex = pivot;
    }
  }

  if (fibB && A[A.length - 1] === target) return A.length - 1;

  return -1;
}

// fibA = ${step.v.vars["fibA"]}
// fibB = ${step.v.vars["fibB"]}
// fibC = ${step.v.vars["fibC"]}
// eliminatedFrontIndex = ${step.v.vars["eliminatedFrontIndex"]}
// pivot = ${step.v.vars["pivot"]}`;

    const sentinel = `function sentinel(target, A) {
  const last = A[A.length - 1];
  A[A.length - 1] = target;

  let i = 0;
  while (A[i] !== target) i++;

  A[A.length - 1] = last;

  if (i < A.length - 1 || A[A.length - 1] === target) return i;

  return -1;
}

// i = ${step.v.vars["i"]}`;

    const ternary = `function ternary(target, A) {
  let leftIndex = 0;
  let rightIndex = A.length - 1;

  while (rightIndex >= leftIndex) {
    const pivot1 = leftIndex + Math.floor((rightIndex - leftIndex) / 3);
    const pivot2 = rightIndex - Math.floor((rightIndex - leftIndex) / 3);

    if (A[pivot1] === target) return pivot1;
    if (A[pivot2] === target) return pivot2;

    if (target < A[pivot1]) rightIndex = pivot1 - 1;
    else if (target > A[pivot2]) leftIndex = pivot2 + 1;
    else {
      leftIndex = pivot1 + 1;
      rightIndex = pivot2 - 1;
    }
  }

  return -1;
}

// leftIndex = ${step.v.vars["leftIndex"]}
// rightIndex = ${step.v.vars["rightIndex"]}
// pivot1 = ${step.v.vars["pivot1"]}
// pivot2 = ${step.v.vars["pivot2"]}`;

    const binary = `function binary(target, A) {
  let leftIndex = 0;
  let rightIndex = A.length - 1;

  while (rightIndex >= leftIndex) {
    const pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);

    if (target < A[pivot]) rightIndex = pivot - 1;
    else if (target === A[pivot]) return pivot;
    else leftIndex = pivot + 1;
  }

  return -1;
}

// leftIndex = ${step.v.vars["leftIndex"]}
// rightIndex = ${step.v.vars["rightIndex"]}
// pivot = ${step.v.vars["pivot"]}`;

    const linear = `function linear(target, A) {
  for (let i = 0; i < A.length; i++) if (target === A[i]) return i;

  return -1;
}

// i = ${step.v.vars["i"]}`;

    const jump = `function jump(target, A) {
  let leftIndex = 0;
  let rightIndex = Math.floor(Math.sqrt(A.length));

  while (A[Math.min(rightIndex, A.length) - 1] < target) {
    leftIndex = rightIndex;
    rightIndex += Math.floor(Math.sqrt(A.length));
    if (leftIndex >= A.length) return -1;
  }

  while (A[leftIndex] < target) {
    leftIndex++;
    if (leftIndex === Math.min(rightIndex, A.length)) return -1;
  }

  if (A[leftIndex] === target) return leftIndex;

  return -1;
}

// leftIndex = ${step.v.vars["leftIndex"]}
// rightIndex = ${step.v.vars["rightIndex"]}`;

    const meta = `function meta(target, A) {
  const numBitsNeededForMaxIndex = Math.ceil(Math.log2(A.length));

  let cutoff = 0;
  for (let i = numBitsNeededForMaxIndex - 1; i >= 0; i--) {
    if (A[cutoff] === target) return cutoff;

    const cutoffCandidate = cutoff | (1 << i);

    if (cutoffCandidate < A.length && A[cutoffCandidate] <= target) cutoff = cutoffCandidate;
  }

  if (A[cutoff] === target) return cutoff;

  return -1;
}

// numBitsNeededForMaxIndex = ${step.v.vars["numBitsNeededForMaxIndex"]}
// cutoff = ${step.v.vars["cutoff"]}
// i = ${step.v.vars["i"]}
// cutoffCandidate = ${step.v.vars["cutoffCandidate"]}`;

    switch (algorithm.v) {
      case "Interpolation": return interpolation;
      case "Exponential": return exponential;
      case "Ubiquitous": return ubiquitous;
      case "Fibonacci": return fibonacci;
      case "Sentinel": return sentinel;
      case "Ternary": return ternary;
      case "Binary": return binary;
      case "Linear": return linear;
      case "Jump": return jump;
      case "Meta": return meta;
      default: throw new Error("Unreachable: algorithm doesn't match a code string.");
    }
  });
</script>

<div class="flex">
  <div
    class="overflow-auto bg-secondary-color text-[.25rem] transition-all duration-1000 sm:text-[.5rem]"
    style:padding={sidebarOpen ? ".25rem" : "0"}
    style:width={sidebarOpen ? "100%" : "0"}
    tabindex="-1"
  >
    {#await highlighter then highlighter}
      <ShikiMagicMove
        options={{ containerStyle: false, lineNumbers: true, duration: 1000, stagger: 0.3 }}
        theme="dark-plus"
        {highlighter}
        lang="js"
        {code}
      />
    {/await}
  </div>
  <div class="mt-1 h-10 bg-secondary-color">
    <button
      class="h-full p-1 fa-solid fa-arrow-right transition-transform duration-1000"
      style:transform={sidebarOpen ? "rotate(-180deg)" : ""}
      onclick={() => { sidebarOpen = !sidebarOpen; }}
      aria-label="Show code"
    ></button>
  </div>
</div>
