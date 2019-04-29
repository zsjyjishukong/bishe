import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/pages/chat/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chat',
      component: Chat
    }
  ]
})
