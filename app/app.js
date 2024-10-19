import Vue from 'nativescript-vue'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import LogoBarre from './components/LogoBarre'


new Vue({
  render: (h) => h(LogoBarre),
}).$start()
