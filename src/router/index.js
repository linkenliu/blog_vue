import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './../components/Home'
import SuJi from './../components/SuJi'
import Library from './../components/Library'
import Demo from './../components/Demo'
import About from './../components/About'
import Details from './../components/Details'
import Search from './../components/Search'

export default new VueRouter({
  routes: [
    {
      path: '/', component: Home
    },
    {
      path: '/suji', component: SuJi
    },
    {
      path: '/library', component: Library
    },
    {
      path: '/demo', component: Demo
    },
    {
      path: '/about', component: About
    },
    {
      path: '/details/:_id/:type', component: Details
    },
    {
      path: '/search/:searchText/', component: Search
    },
    {
      path: '/tagForPost/:tag', component: Search
    }
  ]
})
