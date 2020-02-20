import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

vue.use(vuex);

const state = {
  status: "",
  logged_user: {},
  access_token: localStorage.getItem("access_token") || "",
  contactAdded: false
};
const getters = {
  isLoggedIn: state => !!state.access_token,
  authStatus: state => state.status,
  getLoggedUser: state => state.logged_user
};

const mutations = {
  AUTH_SUCCESS(state, access_token) {
    state.access_token = access_token;
    state.status = "success";
  },
  AUTH_USER(state, user_info) {
    state.logged_user = user_info;
  },
  AUTH_ERROR(state) {
    state.status = "error";
  },
  LOGOUT(state) {
    state.access_token = "";
    state.status = "";
  },

  CONTACT_ADDED(state) {
    state.contactAdded = true;
  }
};

const actions = {
  register(context, payload) {
    // logged_user NEED TO LOGIN AFTER REGISTRATION
    return new Promise(resolve => {
      axios
        .post("http://localhost:3000/api/Owners", payload.logged_user)
        .then(result => {
          // logged_user SUCCESSFULLY CREATED
          // console.log(result);
          resolve(result);
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  login(context, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/api/Owners/login?include=User", payload)
        .then(result => {
          const access_token = result.data.id;
          const theUser = result.data.user;
          console.log("logged IN user ");
          console.log(theUser);

          localStorage.setItem("access_token", access_token);
          axios.defaults.headers.common["Authorization"] = access_token;

          context.commit("AUTH_SUCCESS", access_token);
          context.commit("AUTH_USER", result.data.user);

          resolve(result);
        })
        .catch(err => {
          context.commit("AUTH_ERROR");
          localStorage.removeItem("access_token");
          reject(err);
        });
    });
  },
  logout(context) {
    return new Promise(resolve => {
      context.commit("LOGOUT");
      localStorage.removeItem("access_token");
      localStorage.removeItem("vuex");
      delete axios.defaults.headers.common["Authentication"];
      resolve();
    });
  },

  addContact({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://localhost:3000/api/contacts?access_token=" +
            state.access_token,
          payload
        )
        .then(result => {
          console.log(result);
          // context.commit("CONTACT_ADDED");
          resolve();
        })
        .catch(error => {
          console.log(error);
          reject();
        });
    });
  }
};

export default new vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
});
