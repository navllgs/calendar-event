
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import Store from '../store'
Vue.use(Vuex)

var store = new Vuex.Store({
    modules
})
export default store;