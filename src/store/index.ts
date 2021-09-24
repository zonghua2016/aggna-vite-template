import { createStore } from 'vuex';

const defaultState = {
  count: 0,
};

export default createStore({
  state() {
    return defaultState;
  },
  mutations: {
    increment(state: typeof defaultState) {
      state.count++;
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
  },
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count;
    },
  },
});
