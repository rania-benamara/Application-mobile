import Vue from 'nativescript-vue'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'


new Vue({
  render: (h) => h('frame', [h(Profile)]),
}).$start()
