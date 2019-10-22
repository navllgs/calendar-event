import Vue from 'vue'
import Router from 'vue-router'
import Example from '../js/components/ExampleComponent'
import Calendar from '../js/components/CalendarEventComponent'
import NotFound from '../js/components/NotFoundComponent'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Calendar,
    },
    { 
      path: "*", 
      redirect: "/"
    }
  ]
});
export default router;