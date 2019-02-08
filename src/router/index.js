import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Chat from '@/pages/chat/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'chat',
      component: Chat
    }
  ]
})
