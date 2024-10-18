import Vue from 'nativescript-vue'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Accueil from './components/Accueil'

new Vue({
  render: (h) => h('frame', [h(Login)]),
}).$start()
