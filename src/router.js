import Vue from 'vue'
import Router from 'vue-router'
import SignInForm from './views/SignInForm.vue'
import TicketDetails from './views/Details.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignInForm',
      component: SignInForm
    },
    {
      path: '/details',
      name: 'details',
      component: TicketDetails
    }
  ]
})
