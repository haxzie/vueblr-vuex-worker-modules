/**
 * Wraps the modules list, and converts the modules markerd as useWorker
 * as worker functions
 * @param {Object} modules Object containing vuex store modules as key value pairs
 * @param {*} worker Worker which will be running the store
 */
export function wrap(modules, worker) {
  if (!(modules && Object.keys(modules).length > 0)) {
    console.error("No modules found");
  }
  if (!worker) {
    console.error("Invalid worker");
  }

  const updatedModules = Object.keys(modules).reduce((result, moduleId) => {
    const storeModule = {
      ...modules[moduleId],
      actions: { ...modules[moduleId].actions },
    };

    // replace all the actions with a method which posts a message to the worker
    if (storeModule.useWebWorker) {
      console.log(storeModule);
      storeModule.actions = Object.keys(storeModule.actions).reduce(
        (actions, actionKey) => {
          return {
            ...actions,
            [actionKey]: (context, payload) => {
              worker.postMessage({
                action: `${moduleId}/${actionKey}`,
                context: {
                    state: context.state,
                    getters: context.getters,
                    rootState: context.rootState,
                    rootGetters: context.rootGetters,
                },
                payload,
              });
            },
          };
        },
        {}
      );
    }

    return {
        ...result,
        [moduleId]: storeModule
    };
  }, {});
  console.log({ updatedModules })
  return updatedModules;
}

/**
 * Picks up modules marked as useWorker and executes it inside the worker
 * @param {Object} modules Object containing vuex store modules as key value pairs
 */
export function expose(modules) {
  if (!(modules && Object.keys(modules).length > 0)) {
    console.error("No modules present");
    return;
  }

  const workerizedActions = Object.keys(modules).reduce((result, moduleId) => {
    const storeModule = {
      ...modules[moduleId],
      actions: { ...modules[moduleId].actions },
    };

    // Monkey patching commit method to relay it back to the main script
    const commit = (type, payload) => {
      self.postMessage({ moduleId, type, payload });
    };

    // TODO: Write logic to monkeypatch Dispatch too

    if (storeModule.useWebWorker) {
      Object.keys(storeModule.actions).forEach((actionId) => {
        result = {
          ...result,
          [`${moduleId}/${actionId}`]: ({ context, payload }) => {
            storeModule.actions[actionId]({ ...context, commit }, payload);
          },
        };
      });
      return {
          ...result,
          ...storeModule.actions
      }
    }

    return result;
  }, {});

  self.onmessage = (e) => {
      const { action, context, payload } = e.data;
      workerizedActions[action]({ action, context, payload });
  }
}
