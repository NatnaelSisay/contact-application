import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

vue.use(vuex);

const state = {
  status: "",
  logged_user: {},
  access_token: localStorage.getItem("access_token") || "",
  contactAdded: false,
  contacts: [],
  contactDetail: {},
  profilePicture: null
};
const getters = {
  isLoggedIn: state => !!state.access_token,
  authStatus: state => state.status,
  getLoggedUser: state => state.logged_user,
  getContacts: state => state.contacts,
  getDetail: state => state.contactDetail
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
  },
  ADD_CONTACT_LIST(state, contact_list) {
    state.contacts = contact_list;
  },
  CONTACT_DETAIL(state, detail) {
    state.contactDetail = detail;
  },
  SET_PROFILE_PICTURE(state, picture) {
    console.log(picture);
    state.logged_user.profile = picture;
  }
};

const actions = {
  register(context, payload) {
    // console.log(payload.image);
    return new Promise(res => {
      if (payload.image) {
        const userImage = new FormData();
        userImage.append("profile", payload.image, payload.image.name);
        // console.log(
        //   "Image file name inside the request : -> " + payload.image.name
        // );
        axios
          .post("http://localhost:3000/api/masters/profiles/upload", userImage)
          .then(resolve => {
            // console.log("resolve ", resolve);
            const image = resolve.data.result.files.profile;
            payload.user.photo = image;
            axios
              .post("http://localhost:3000/api/Owners", payload.user)
              .then(result => {
                console.log("REGISTRATION WAS SUCCESSFULL");
                // console.log(result);
                res(result);
              })
              .catch(() => {
                console.log("User already exist");
                console.log(resolve);
                const container =
                  resolve.data.result.files.profile[0].container;
                const name = resolve.data.result.files.profile[0].name;
                const url =
                  "http://localhost:3000/api/masters/" +
                  container +
                  "/files/" +
                  name;
                // console.log("Container : " + container + " Name : " + name);
                axios
                  .delete(url)
                  .then(() => {
                    console.log("Imge was deleted");
                  })
                  .catch(() => {
                    console.log("Image deletion problem");
                  });
              });
          })
          .catch(err => {
            console.log("No Nigger we are fucked up " + err);
          });
      } else {
        axios
          .post("http://localhost:3000/api/Owners", payload.user)
          .then(result => {
            console.log("REGISTRATION WAS SUCCESSFULL");
            // console.log(result);
            res(result);
          })
          .catch(() => {
            console.log("User already exist");
            console.log("No Profie picture");
          });
      }
    });
  },
  login(context, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/api/Owners/login?include=User", payload)
        .then(result => {
          const access_token = result.data.id;
          // const theUser = result.data.user;
          console.log("logged IN user ");
          // console.log(theUser);

          localStorage.setItem("access_token", access_token);
          axios.defaults.headers.common["Authorization"] = access_token;

          context.commit("AUTH_SUCCESS", access_token);
          context.commit("AUTH_USER", result.data.user);

          resolve(result);
        })
        .catch(err => {
          context.commit("AUTH_ERROR");
          localStorage.removeItem("access_token");
          localStorage.removeItem("vuex");
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
  },
  getContactList(context) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "http://localhost:3000/api/contacts?access_token=" +
            context.state.access_token
        )
        .then(result => {
          console.log(result.data);
          context.commit("ADD_CONTACT_LIST", result.data);
          // context.commit("CONTACT_ADDED");
          resolve();
        })
        .catch(error => {
          console.log(error);
          reject();
        });
    });
  },
  getContactById(context, id) {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:3000/api/contacts/" + id + "?access_token=";
      axios
        .get(url + context.state.access_token)
        .then(result => {
          console.log(result.data);
          context.commit("CONTACT_DETAIL", result.data);
          // context.commit("CONTACT_ADDED");
          resolve();
        })
        .catch(error => {
          console.log(error);
          reject();
        });
    });
  },
  getProfilePicture(context) {
    console.log(context.state.logged_user.photo[0].container);
    const container = context.state.logged_user.photo[0].container;
    const fileName = context.state.logged_user.photo[0].name;
    const url =
      "http://localhost:3000/api/masters/" +
      container +
      "/download/" +
      fileName +
      "?access_token=asdfsdf";
    axios.get(url).then(result => {
      console.log(result.request.responseURL);
      context.commit("SET_PROFILE_PICTURE", result.request.responseURL);
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
