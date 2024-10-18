import Vue from 'nativescript-vue'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import SaleCategorie from './components/SaleCategorie'
import ForgotPassword from  './components/ForgotPassword'
import ResetPassword from  './components/ResetPassword'
import AllProducts from  './components/AllProducts'
import MesCommandes from  './components/MesCommandes'

new Vue({
  render: (h) => h('frame', [h(MesCommandes)]),
}).$start()
