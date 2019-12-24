import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    islogin: false,
    userName: '',
    capsuleItem: ''
  },

  getters: {
    getIsLogin: (state) => {
      return state.islogin
    },
    getUsername: (state) => {
      return state.userName
    },
    getCapsuleitem: (state) => {
      return state.capsuleItem
    }
  },

  mutations: {
    setIslogin: (state, islogin) => {
      state.islogin = islogin
    },
    setUsername: (state, username) => {
      state.userName = username
    },
    setCapsuleItem: (state, item) => {
      state.capsuleItem = item
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
