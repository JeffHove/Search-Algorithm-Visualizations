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

export const algorithm = ref<string>("Linear");
export const target = ref<string>("");
export const step = ref<Step>({ resultContent: "", metaTiles: [], tiles: [], vars: {} });
export const stepList = ref<Step[]>([]);
export const stepListIndexer = ref<number>(0);

const goPressed = $derived(stepList.v.length > 0);
export const getGoPressed = () => goPressed;
