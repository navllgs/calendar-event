require('./bootstrap');
import Vue from 'vue'
import '../iview/index'
import ExampleComponent from './components/ExampleComponent'

new Vue({
    el: '#app',
    components: { ExampleComponent }
  })
