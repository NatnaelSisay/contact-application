import vue from "vue";
import vuex from "vuex";

vue.use(vuex);
const state = {
  isAuthenticated: false,
  access_token: null,
  user: null
};

const getters = {
  isLogedIn: state => {
    return state.isAuthenticated;
  },
  getToken: state => {
    return state.access_token;
  }
};
const mutations = {
  SET_TOKEN(state, payload) {
    state.access_token = payload.id;
  },
  SET_USER(state, payload) {
    state.user = payload;
  }
};
const actions = {
  setToken(context, payload) {
    context.commit("SET_TOKEN", payload);
  }
};

export default new vuex.Store({
  state,
  getters,
  mutations,
  actions
});
