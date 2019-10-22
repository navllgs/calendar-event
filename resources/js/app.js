require('./bootstrap');
import Vue from 'vue'
import '../iview/index'
import store from '../store/index'
import router from '../router/index'
import MainComponent from './views/App'

new Vue({
    el: '#app',
    router,
    store,
    components: { MainComponent }
  })
