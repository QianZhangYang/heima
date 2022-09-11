import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenObj: {}
  },
  plugins: [
    createPersistedState({
      key: 'token',
      reducer({ tokenObj }) {
        return { tokenObj }
      }
    })
  ],
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  },
  actions: {},
  modules: {}
})
