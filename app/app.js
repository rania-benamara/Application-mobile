import Vue from 'nativescript-vue'

import Home from './components/Home'
import Login from './components/Login'

new Vue({
  render: (h) => h('frame', [h(Login)]),
}).$start()
