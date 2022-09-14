import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenObj: {},
    mychannels: []
  },
  plugins: [
    createPersistedState({
      key: 'token',
      reducer({ tokenObj, mychannels }) {
        return { tokenObj, mychannels }
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
    },
    SET_MY_CHANNELS(state, channels) {
      state.mychannels = channels
    }
  },
  actions: {},
  modules: {}
})
