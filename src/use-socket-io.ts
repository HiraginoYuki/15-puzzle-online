import { io, Socket } from "socket.io-client";
import { defineOnGlobal } from "./define-on-global";

let socket: Socket;

export function useSocketIO() {
  if (!socket) {
    socket = io(":3250");
  }
  defineOnGlobal({socket});
  return socket;
  /*const forceUpdate = useForceUpdate();
  const socketInstance = useMemo(() => io(...args), []);
  const depsRef = useRefWithHistory<CallbackData[]>();
  depsRef.current = [];
  depsRef.purgeExpectLatestTwo();

  let i = 0;

  const wrapped = wrap(socketInstance, {
    on(...args: [...Parameters<(typeof socketInstance)["on"]>, DependencyList?]) {
      const self = this as typeof wrapped;
      const hyper = (self as any).__proto__ as typeof socketInstance;
      const [event, func] = args;
      const deps: DependencyList = args[2] || [];
      depsRef.current.push({ func, deps });
      if (depsRef.previous) {
        const previousData = depsRef.previous[i++];
        if (previousData && !compareArrays(deps, previousData.deps)) {
          hyper.off(event, previousData.func);
          hyper.on(event, func);
          forceUpdate();
        }
      } else {
        hyper.on(event, func);
      }
      return self;
    }
  });

  return wrapped;*/
}

export function getSocketIO() {
  return socket;
}