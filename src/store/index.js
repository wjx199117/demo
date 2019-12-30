import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';
import tagsview from "./modules/tagsview";
import getters from "./getters";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  modules:{
    tagsview
  },
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
