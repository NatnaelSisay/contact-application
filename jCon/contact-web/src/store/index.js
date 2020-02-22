import vue from 'vue';
import vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

vue.use(vuex);

const state = {
  status: '',
  logged_user: {},
  access_token: localStorage.getItem('access_token') || '',
  contactAdded: false,
  contacts: [],
  contactDetail: {},
  profilePicture: null,
};
const getters = {
  isLoggedIn: state => !!state.access_token,
  getToken: state => state.access_token,
  authStatus: state => state.status,
  getLoggedUser: state => state.logged_user,
  getContacts: state => state.contacts,
  getDetail: state => state.contactDetail,
  getProfilePicture: state => state.logged_user.photo,
  getOwnerId: state => state.logged_user.id,
};

const mutations = {
  AUTH_SUCCESS(state, access_token) {
    state.access_token = access_token;
    state.status = 'success';
  },
  AUTH_USER(state, user_info) {
    state.logged_user = user_info;
  },
  AUTH_ERROR(state) {
    state.status = 'error';
  },
  LOGOUT(state) {
    state.access_token = '';
    state.status = '';
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
    state.logged_user.photo = picture;
  },
};

const actions = {
  construcImageUrl(context, imageInformation) {
    /**
     * Build the image url based on the image uploaded return value.
     * return URl of the image loaction.
     */
    const container = imageInformation.data.result.files.profile[0].container;
    const name = imageInformation.data.result.files.profile[0].name;
    const url =
      'http://localhost:3000/api/ContactPictures/' +
      container +
      '/download/' +
      name;

    return url;
  },
  uploadImage(context, upload) {
    /**
		UPLOAD IMAGE TO DESIRED LOCATION
		return :-> Promise containing uploaded image information

    payload should contain where to upload, and the image data
    upload.url :-> url to upload the image
		upload.imageFile :-> the actual image data to send
		
		*/
    const userImage = new FormData(); // we are about to send an image
    // add image we recived from paylaod
    userImage.append('profile', upload.imageFile, upload.imageFile.name);
    return axios.post(upload.url, userImage);
  },

  addOwner(context, ownerInfo) {
    /**
     * Will Add owner to database with Profile picture or not
     * return :-> promise
     *
     * ownerInfo.user :-> all the data of the user
     * ownerInfo.photo :-> the actual image || "avatar"
     */
    ownerInfo.user.photo = ownerInfo.photo || 'avatar';
    axios.post('http://localhost:3000/api/Owners', ownerInfo.user);
  },
  register(context, payload) {
    /**
		 * register : -> will add a new user to the database
		 * payload : -> contain user credential sent from a form
		 * 						contain {
		 *											user : { name, email, passowrd, username, emailVerified: true,realm: "novalue", }
														image : { image }
												}
		 */
    return new Promise((res, rej) => {
      if (payload.image) {
        // USER SELECTED PROFILE PICTURE TO UPLOAD
        /**
         * The method i used to register a user,
         * First upload the picture selected to get the image location,
         * Then try to register the user
         * 	if the user already exist or can't create a user, delete the image also
         * 	if user is created pass the image location to the user.
         */

        // UPLOAD THE IMAGE
        context
          .dispatch('uploadImage', {
            url: 'http://localhost:3000/api/ContactPictures/profiles/upload',
            imageFile: payload.image,
          })
          .then(uploadedImage => {
            // console.log('image uploaded');
            // console.log(resolve);

            // CLEAN OUT THE URL OF IMAGE FOR USER
            context
              .dispatch('construcImageUrl', uploadedImage)
              .then(imageUrl => {
                // REGISTER THE USER
                console.log('The Image Url ' + imageUrl);
                context
                  .dispatch('addOwner', {
                    user: payload.user,
                    photo: imageUrl,
                  })
                  .then(registeredUser => {
                    // ******* NOTIFICATION [ USER REGISTERED SUCCESSFULLY ] ****
                    res(registeredUser);
                    // ******* NOTIFICATION [ USER REGISTERED SUCCESSFULLY ] ****
                  })
                  .catch(() => {
                    // ******* NOTIFICATION [ USER ALREADY EXIST ] ****
                    rej();
                    // ******* NOTIFICATION [ USER ALREADY EXIST ] ****
                  });
              });
          })
          .catch(() => {
            // ******* NOTIFICATION [ IMAGE NOT UPLOADED ] ****
            // SERVER DOWN , TRY AGAIN LETTER
            console.log('image was not uploaded');
            // ******* NOTIFICATION [ IMAGE NOT UPLOADED ] ****
          });
      } else {
        context
          .dispatch('addOwner', {
            user: payload.user,
            photo: null,
          })
          .then(registeredUser => {
            // ******* NOTIFICATION [ USER REGISTERED SUCCESSFULLY ] ****
            res(registeredUser);
            // ******* NOTIFICATION [ USER REGISTERED SUCCESSFULLY ] ****
          })
          .catch(() => {
            // ******* NOTIFICATION [ USER ALREADY EXIST ] ****
            rej();
            // ******* NOTIFICATION [ USER ALREADY EXIST ] ****
          });
      }
    });
  },

  login(context, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3000/api/Owners/login?include=User', payload)
        .then(result => {
          const access_token = result.data.id;
          // const theUser = result.data.user;
          console.log('logged IN user ');
          // console.log(theUser);

          localStorage.setItem('access_token', access_token);
          axios.defaults.headers.common['Authorization'] = access_token;

          context.commit('AUTH_SUCCESS', access_token);
          context.commit('AUTH_USER', result.data.user);

          resolve(result);
        })
        .catch(err => {
          context.commit('AUTH_ERROR');
          localStorage.removeItem('access_token');
          localStorage.removeItem('vuex');
          reject(err);
        });
    });
  },
  logout(context) {
    return new Promise(resolve => {
      context.commit('LOGOUT');
      localStorage.removeItem('access_token');
      localStorage.removeItem('vuex');
      delete axios.defaults.headers.common['Authentication'];
      resolve();
    });
  },

  addNewContact(context, contactInfo) {
    /**
     * addNewContact :-> add a [ cleaned ] contact information to the database
     * mainly requested by 'addContact' action
     */

    return axios.post('http://localhost:3000/api/contacts', contactInfo, {
      params: {
        access_token: context.getters.getToken,
      },
    });
  },
  addContact(context, contact) {
    /**
     * addContact :-> will add a new contact to the databse, with its repsective owner
     *
     * payload :-> { name, phone_number, photo }
     */

    // const url = 'http://localhost:3000/api/contacts?access_token=';
    // payload.ownerId = '5e51088409d899440cf7ec55';

    return new Promise((resolve, reject) => {
      if (contact.photo != 'avatar') {
        // USER HAVE SELECTED A PROFILE PICTURE
        context
          .dispatch('uploadImage', {
            url: 'http://localhost:3000/api/ContactPictures/profiles/upload',
            imageFile: contact.photo,
          })
          .then(uploadedImage => {
            // ****** [ SUCCESS ] IMAGE UPLOADED ****

            context
              .dispatch('construcImageUrl', uploadedImage)
              .then(imageUrl => {
                // ***** IMAGE URL FOUND *****

                contact.photo = imageUrl; // the image location

                context.dispatch('addNewContact', contact).then(result => {
                  // ******* [ SUCCESS ] ADDED CONTACT
                  resolve(result);
                });
              });
          })
          .catch(error => {
            // ******* [ ERROR ] IMAGE UPLOAD FAILED *****

            reject(error);

            // ******* [ ERROR ] IMAGE UPLOAD FAILED *****
          });
      } else {
        context
          .dispatch('addNewContact', contact)
          .then(result => {
            // ******* [ SUCCESS ] ADDED CONTACT ******

            resolve(result);

            // ******* [ SUCCESS ] ADDED CONTACT ******
          })
          .catch(error => {
            // ****** [ ERROR ] DIDN'T ADD CONTACT *****

            reject(error);

            // ****** [ ERROR ] DIDN'T ADD CONTACT *****
          });
      }
    });
  },

  getContactList(context) {
    /**
     * getContactList :-> fetch the contact list that belong to the logged in user
     * return :-> list of the contacts
     *
     * 'filter[where][ownerId]' :-> condition to filter the user list by user id
     * access_token : -> token we get when a user is logged in
     *
     */

    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/contacts';

      axios
        .get(url, {
          params: {
            'filter[where][ownerId]': context.getters.getOwnerId,
            access_token: context.getters.getToken,
          },
        })
        .then(result => {
          // ******* CONTACTS FETCHED WAS SUCCESS FULL *****

          context.commit('ADD_CONTACT_LIST', result.data);

          // ******* CONTACTS FETCHED WAS SUCCESS FULL *****
          resolve();
        })
        .catch(error => {
          // ******* CONTACTS FETCHED FAILED *****

          // SERVER IS DOWN/ CANT' FETCH THE CONTENT
          reject(error);

          // ******* CONTACTS FETCHED FAILED *****
        });
    });
  },
  getContactById(context, id) {
    /**
     * getContactById :-> get contact detail form the database by id
     *
     * return :-> nothing
     * populate the contact detial state.
     */

    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/api/contacts/' + id;
      axios
        .get(url, {
          params: {
            access_token: context.getters.getToken,
          },
        })
        .then(result => {
          // ******** [ SUCCESS ] RETRIVED CONTACT *****

          // context.commit('CONTACT_DETAIL', result.data);
          resolve(result.data);

          // ******** [ SUCCESS ] RETRIVED CONTACT *****
        })
        .catch(error => {
          // ******** [ ERROR ] NO CONTACT WITH THAT ID ****

          reject(error);

          // ******** [ ERROR ] NO CONTACT WITH THAT ID ****
        });
    });
  },
  normalEditContact(context, payload) {
    const contact = payload;
    const id = payload.id;
    const url = 'http://localhost:3000/api/contacts/' + id + '/replace';

    return new Promise((resolve, reject) => {
      axios
        .post(url, contact, {
          params: {
            access_token: context.getters.getToken,
          },
        })
        .then(result => {
          // **** [ SUCCESS ] CONTACT WAS UPDATED *****
          resolve(result);
        })
        .catch(error => {
          // **** [ ERROR ] CONTACT WAS NOT UPDATED ****
          console.log('Cant update contact');
          reject(error);
        });
    });
  },

  profileChangedContact(context, contact) {
    /**
     * profileChangeContact :-> update the profile of the contact we have
     *
     * contact :-> { name, phone_number , id, ownerId, photo : File }
     * the photo is the selected file
     */
    return new Promise((resolve, reject) => {
      // ** UPLOAD PICTURE **

      context
        .dispatch('uploadImage', {
          url: 'http://localhost:3000/api/ContactPictures/profiles/upload',
          imageFile: contact.photo,
        })
        .then(uploadedImage => {
          // *** GENERATE IMAGE URL **
          context
            .dispatch('construcImageUrl', uploadedImage)
            .then(imageUrl => {
              contact.photo = imageUrl;

              // *** EDIT CONTACT WITH THE NEW IMAGE ***
              context
                .dispatch('normalEditContact', contact)
                .then(updatedContact => {
                  // ***** [ SUCCESS ] UPDATED PROFILE **

                  resolve(updatedContact);

                  // ***** [ SUCCESS ] UPDATED PROFILE **
                })
                .catch(error => {
                  // ***** [ ERROR ] DIDN'T UPDATE CONTACT *******
                  reject(error);
                });
            })
            .catch(error => {
              // ****** [ ERROR ] COULDN'T GENERATE IMAGE URL ****
              reject(error);
            });
        })
        .catch(error => {
          // ****** [ ERROR ] **********
          reject(error);
        });
    });
  },
};

export default new vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()],
});
