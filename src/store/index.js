import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: '',
    prop_info: {},
    reader_info: {}
  },
  mutations: {
    setBaseUrl(state, url) {
      state.baseUrl = url
    },
    setPropInfo(state, info) {
      state.prop_info = info
    },
    setReaderInfo(state, info) {
      state.reader_info = info
    }
  },
  actions: {},
  modules: {}
})
