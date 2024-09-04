type Step = {
  vars: { [key: string]: number };
  resultContent: string;
  metaTiles: Tile[];
  tiles: Tile[];
};

type Tile = {
  content: number | null;
  color: string;
};

const ref = <T>(initial: T) => {
  let v = $state(initial);
  const reset = () => (v = initial);

  return {
    set v(value) { v = value; },
    get v() { return v; },
    reset,
  };
};

const refStepList = () => {
  const baseRef = ref<Step[]>([]);
  const goPressed = $derived(baseRef.v.length > 0);

  return {
    get goPressed() { return goPressed; },
    set v(value) { baseRef.v = value; },
    get v() { return baseRef.v; },
    reset: baseRef.reset,
  };
};

export const algorithm = ref<string>("Linear");
export const target = ref<string>("");
export const step = ref<Step>({ resultContent: "", metaTiles: [], tiles: [], vars: {} });
export const stepList = refStepList();
export const stepListIndexer = ref<number>(0);
