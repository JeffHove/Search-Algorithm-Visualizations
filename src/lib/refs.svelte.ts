type Step = {
  resultContent: string;
  metaTiles: Tile[];
  tiles: Tile[];
};

type Ref<T> = {
  reset: () => void;
  v: T;
};

type Tile = {
  content: number | null;
  color: string;
};

type RefStepList = {
  goPressed: boolean;
} & Ref<Step[]>;

const deepCopy = (obj: object): object => JSON.parse(JSON.stringify(obj)) as object;

const ref = <T>(initial: T): Ref<T> => {
  const isObj = typeof initial === "object" ? true : false;
  let v: T = $state(isObj ? (deepCopy(initial!) as T) : initial);
  const reset = (): T => (v = isObj ? (deepCopy(initial!) as T) : initial);

  return {
    set v(value: T) { v = value; },
    get v(): T { return v; },
    reset,
  };
};

const refStepList = (): RefStepList => {
  const baseRef: Ref<Step[]> = ref<Step[]>([]);
  const goPressed: boolean = $derived(baseRef.v.length > 0);

  return {
    get goPressed(): boolean { return goPressed; },
    set v(value: Step[]) { baseRef.v = value; },
    get v(): Step[] { return baseRef.v; },
    reset: baseRef.reset,
  };
};

export const algorithm: Ref<string> = ref<string>("Linear");
export const target: Ref<string> = ref<string>("");
export const step: Ref<Step> = ref<Step>({ resultContent: "", metaTiles: [], tiles: [] });
export const stepList: RefStepList = refStepList();
export const stepListIndexer: Ref<number> = ref<number>(0);
