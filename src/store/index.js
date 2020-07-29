import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prop_info: {},
    reader_info: {}
  },
  mutations: {
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
