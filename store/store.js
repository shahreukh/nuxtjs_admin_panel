/*import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {}
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value
    },
    setUser(state, value) {
      state.user = value
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setLoggedIn', true)
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('setLoggedIn', false)
      commit('setUser', {})
    }
  }
}) */
