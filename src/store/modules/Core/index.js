function initialState() {
  return {
    result: 0,
  };
}

export default {
  namespaced: true,
  useWebWorker: true,
  state: initialState(),
  getters: {
    getResult: (state) => {
      return state.result;
    },
  },
  actions: {
    expensiveFn: async ({ commit }) => {

      console.time("expensiveFn");
      let result = 0;
      for (var i = Math.pow(12, 7); i >= 0; i--) {
        result += Math.atan(i) * Math.tan(i);
      }
      console.timeEnd("expensiveFn");
      //   return result;
      commit("SET_RESULT", result);
    },
  },
  mutations: {
    SET_RESULT: (state, result) => {
      state.result = result;
    },
  },
};
