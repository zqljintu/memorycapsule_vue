import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    islogin: false,
    userName: ''
  },

  getters: {
    getIsLogin: (state) => {
      return state.islogin
    },
    getUsername: (state) => {
      return state.userName
    }
  },

  mutations: {
    setIslogin: (state, islogin) => {
      state.islogin = islogin
    },
    setUsername: (state, username) => {
      state.userName = username
    }
  },

  actions: {
    setDelayIsupdate: (context, islogin) => {
      setTimeout(() => {
        context.commit('setIslogin', islogin)
      }, 2000)
    }
  }

})
