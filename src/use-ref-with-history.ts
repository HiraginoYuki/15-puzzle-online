import { MutableRefObject, useMemo, useRef } from "react";

export type MutableRefHistoryObject<T> = MutableRefObject<T> & {
  previous: T;
  history: T[];
  purgeExpectLatestTwo(): void;
};

export function useRefWithHistory<T>(defaultValue?: T | (() => T)) {
  if (typeof defaultValue === "function") defaultValue = (defaultValue as () => T)();
  const historyRef = useRef<T[]>(arguments.length === 1 ? [defaultValue as T] : []);
  const refObject = useMemo(() => ({
    get history() {
      return historyRef.current;
    },
    get previous() {
      return this.history[this.history.length - 2];
    },
    get current() {
      return this.history[this.history.length - 1];
    },
    set current(value: T) {
      this.history.push(value);
    },
    purgeExpectLatestTwo() {
      if (2 < this.history.length) {
        this.history.splice(0, this.history.length - 2);
      }
    }
  }), []) as MutableRefHistoryObject<T>;
  return refObject;
}
