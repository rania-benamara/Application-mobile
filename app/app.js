import Vue from 'nativescript-vue';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Offres from './components/Offres';
import SaleCategorie from './components/SaleCategorie';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AllProducts from './components/AllProducts';
import MesCommandes from './components/MesCommandes';
import NousContacter from './components/NousContacter';
import Accueil from './components/Accueil';
import SupprimerProfile from './components/SupprimerProfile';
import Panier from './components/Panier';

new Vue({
  render: (h) => h('frame', [
    h(NousContacter),
    h(Panier)
  ]),
}).$start();
