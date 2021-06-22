export function wrap<O extends object, P extends object>(o: O, p: P): O & P {
  return Object.assign(Object.create(o), p);
}
