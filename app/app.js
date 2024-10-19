import Vue from 'nativescript-vue'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import LogoBarre from './components/LogoBarre'
import Search from './components/Search'

new Vue({
  render: (h) => h(Search),
}).$start()
