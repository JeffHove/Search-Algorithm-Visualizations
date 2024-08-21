type Step = {
  metaTileContents: (number | null)[];
  tileContents: (number | null)[];

  resultContent: string;

  tileColors: string[];
};

type Ref<T> = {
  reset: () => void;
  v: T;
};

const deepCopy = (obj: object): object => JSON.parse(JSON.stringify(obj)) as object;

const ref = <T>(initial: T): Ref<T> => {
  const isObj: boolean = typeof initial === "object" ? true : false;
  let v: T = $state(isObj ? (deepCopy(initial!) as T) : initial);
  const reset = (): T => (v = isObj ? (deepCopy(initial!) as T) : initial);

  return {
    set v(value: T) { v = value; },
    get v(): T { return v; },
    reset,
  };
};

export const algorithm: Ref<string> = ref<string>("Linear");
export const target: Ref<string> = ref<string>("");
export const stepsIndexer: Ref<number> = ref<number>(0);
export const steps: Ref<Step[]> = ref<Step[]>([{ metaTileContents: [], resultContent: "", tileContents: [], tileColors: [] }]);
