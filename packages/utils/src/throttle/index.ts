export default function throttle(
  fn: Function,
  delay: number = 500,
  debounce: boolean = false,
  noTrailing: boolean = false
) {
  let timer: number | null = null;
  let lastExecute = 0;

  const cancel = () => {
    if (timer != null) {
      window.clearTimeout(timer);
      timer = null;
    }
  };

  const callback = function callback(...args: any[]) {
    // @ts-ignore we have to use this inside function
    const context = this;

    const exec = function exec() {
      lastExecute = Date.now();
      fn.apply(context, args);
    };

    if (debounce) {
      cancel();
      timer = window.setTimeout(exec, delay);
    } else {
      const now = Date.now();
      const elapsed = now - lastExecute;
      if (elapsed > delay) {
        exec();
      }
      if (!noTrailing) {
        cancel();
        timer = window.setTimeout(
          exec,
          elapsed > delay ? delay : delay - elapsed
        );
      }
    }
  };

  callback.cancel = cancel;

  return callback;
}
