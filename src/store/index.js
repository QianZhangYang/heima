import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenObj: {},
    mychannels: [],
    historys: []
  },
  plugins: [
    createPersistedState({
      key: 'token',
      reducer({ tokenObj, mychannels, historys }) {
        return { tokenObj, mychannels, historys }
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
    },
    /**
     *
     * @param {*} state
     * @param {*} historys 处理过后的数据 实现功能整合
     */
    SET_HISTROYS(state, historys) {
      state.historys = historys
    }
  },
  actions: {},
  modules: {}
})
