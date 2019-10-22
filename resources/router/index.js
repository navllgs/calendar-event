import Vue from 'vue'
import Router from 'vue-router'
import Example from '../js/components/ExampleComponent'
import NotFound from '../js/components/NotFoundComponent'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Example,
    },
    { 
      path: "*", 
      component: NotFound 
    }
  ]
});
export default router;