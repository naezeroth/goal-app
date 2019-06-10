import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";
import router from "@/router";
import { isContext } from "vm";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    userBHAG: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setUserBHAG(state, payload) {
      state.userBHAG = payload;
    },
  },
  actions: {
    userJoin({ commit }, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit("setUser", user);
          commit("setIsAuthenticated", true);
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
        });
    },
    userLogin({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit("setUser", user);
          commit("setIsAuthenticated", true);
          router.push("/about");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
    },
    userSignOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
    },
    addBHAG({ state }, payload) {
      firebase
        .database()
        .ref("users")
        .child(state.user.user.uid)
        .push(payload);
    },
    getBHAG({ state, commit }) {
      return firebase
        .database()
        .ref("users/" + state.user.user.uid)
        .on("value", snapshot => {
          console.log(snapshot);
          console.log(snapshot.val());
          commit("setUserBHAG", snapshot.val());
        });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    },
    getBHAG(state) {
      return state.userBHAG;
    }
  }
});
