import Vue from 'nativescript-vue'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Accueil from './components/Accueil'
import SupprimerProfile from './components/SupprimerProfile'
import Panier from './components/Panier'

new Vue({
  render: (h) => h('frame', [h(Panier)]),
}).$start()
