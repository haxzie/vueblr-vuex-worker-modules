import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import modules from "./modules";
import {wrap} from "./utils";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";
// import the worker
const worker = new Worker("./worker", { type: "module" });

const store = new Vuex.Store({
  // wrap the modules
  modules: wrap(modules, worker),
  state: {},
  actions: {},
  mutations: {},
  strict: debug,
  plugins: debug ? [createLogger()] : [], // set logger only for development
});

// pipe the message as store commits
worker.onmessage = (e) => {
  const { moduleId, type, payload } = e.data;
  store.commit(`${moduleId}/${type}`, payload, { root: true });
}


export default store;
