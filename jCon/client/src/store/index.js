import vue from "vue";
import vuex from "vuex";
import axios from "axios";
vue.use(vuex);

const state = {
  status: "",
  access_token: localStorage.getItem("access_token") || "",
  user: {}
};
const getters = {
  isLoggedIn: state => !!state.access_token,
  authStatus: state => state.status
};

const mutations = {
  AUTH_SUCCESS(state, access_token, user) {
    state.access_token = access_token;
    state.user = user;
    state.status = "success";
  },
  AUTH_ERROR(state) {
    state.status = "error";
  },
  LOGOUT(state) {
    state.access_token = "";
    state.status = "";
  }
};

const actions = {
  registerd(context, payload) {
    // USER NEED TO LOGIN AFTER REGISTRATION
    return new Promise(resolve => {
      axios
        .post("http://localhost:3000/api/Owners", payload.user)
        .then(result => {
          // USER SUCCESSFULLY CREATED
          // console.log(result);
          resolve(result);
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  register(context, paylaod) {
    return new Promise((res, rej) => {
      if (paylaod.image) {
        const userImage = new FormData();
        userImage.append("profile", paylaod.image, paylaod.image.name);
        console.log(
          "Image file name inside the request : -> " + paylaod.image.name
        );
        axios
          .post("http://localhost:3000/api/masters/profiles/upload", userImage)
          .then(resolve => {
            console.log("resolve ", resolve);
            const image = resolve.data.result.files.profile;
            this.user.photo = image;
            axios
              .post("http://localhost:3000/api/Owners", this.user)
              .then(result => {
                console.log("REGISTRATION WAS SUCCESSFULL");
                console.log(result);
                res();
              })
              .catch(error => {
                console.log(error);

                console.log("User already exist");
                rej();
              });
          })
          .catch(err => {
            console.log("No Nigger we are fucked up " + err);
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
          const user = result.data.user;

          localStorage.setItem("access_token", access_token);
          axios.defaults.headers.common["Authorization"] = access_token;

          context.commit("AUTH_SUCCESS", access_token, user);

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
      axios
        .post("http://localhost:3000/api/Owners/logout")
        .then(result => {
          console.log("loged out");
          context.commit("LOGOUT");
          localStorage.removeItem("access_token");
          delete axios.defaults.headers.common["Authentication"];
          resolve(result);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
};

export default new vuex.Store({
  state,
  getters,
  mutations,
  actions
});
