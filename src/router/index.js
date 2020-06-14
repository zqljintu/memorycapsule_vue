import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Capsule from '@/components/Capsule'
import More from '@/components/More'
import ItemCapsule from '@/components/Item_Capsule'
import Add from '@/components/Add'
import LoginUp from '@/components/LoginUp'
import Edit from '@/components/Edit'
import ItemDetail from '@/components/Item_Detail'
import Resume from '@/components/Resume'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/Capsule',
      component: Capsule,
      meta: {
        keepAlive: false // 此组件不需要被缓存
      }
    },
    {
      path: '/More',
      component: More
    },
    {
      path: '/ItemCapsule',
      component: ItemCapsule
    },
    {
      name: 'Add',
      path: '/Add',
      component: Add
    },
    {
      name: 'LoginUp',
      path: '/LoginUp',
      component: LoginUp
    },
    {
      name: 'Edit',
      path: '/Edit',
      component: Edit
    },
    {
      name: 'ItemDetail',
      path: '/ItemDetail',
      component: ItemDetail
    },
    {
      name: 'Resume',
      path: '/Resume',
      component: Resume
    },
  ]
})
