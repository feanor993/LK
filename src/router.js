import Vue from 'vue'
import Router from 'vue-router'
import Profile from './views/Profile.vue'
import Vebinar from './views/Vebinar.vue'
import Vebinars from './views/Vebinars.vue'
import notFound from './views/notFound.vue'
import course from './views/course.vue'
import form from './views/form.vue'

Vue.use(Router)

export default new Router({

  mode: 'history',
  routes: [
    {
      path: '/profile/',
      name: 'profile',
      component: Profile
    },
    { path: '/vebinar/:path', component: Vebinar },
    {
      path: '/vebinars/',
      name: 'vebinars',
      component: Vebinars
    },
    {
      path: '/course/',
      name: 'course',
      component: course
    },
    {
      path: '/',
      name: 'userForm',
      component: form
    },
    { path: '*', component: notFound }
  ]
})
