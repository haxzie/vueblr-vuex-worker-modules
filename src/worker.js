import * as Comlink from "comlink";

const fns = {
  expensiveFn() {
    console.time("expensiveFn");
    let result = 0;
    for (var i = Math.pow(12, 7); i >= 0; i--) {
      result += Math.atan(i) * Math.tan(i);
    }
    console.timeEnd("expensiveFn");
    return result;
  },
};

Comlink.expose(fns);
