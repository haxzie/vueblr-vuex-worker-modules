import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import modules from "./modules";
import { wrap, attach } from "./utils"
const worker = new Worker("./worker.js", { type: 'module'});

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";
// import the worker

const store = new Vuex.Store({
  // wrap the modules
  modules: wrap(modules, worker),
  state: {},
  actions: {},
  mutations: {},
  strict: debug,
  plugins: debug ? [createLogger()] : [], // set logger only for development
});

// pipe the incoming worker message as root store commits
attach(store, worker);


export default store;
