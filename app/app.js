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
import LogoBarre from './components/LogoBarre';
import Search from './components/Search';
import Livraison from './components/Livraison';
import AddLivraison from './components/AddLivraison';
import AfficherDetails from './components/AfficherDetails';
import CommanedPersonaliser from './components/CommanedPersonaliser';
import CodeEnvoye from './components/CodeEnvoye';
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'

// Enable Vue logging
Vue.config.silent = false;
Vue.config.debug = true;

// Register components globally if needed
Vue.component('Home', Home);
Vue.component('Login', Login);
Vue.component('Register', Register);
Vue.component('Profile', Profile);
Vue.component('Offres', Offres);
Vue.component('SaleCategorie', SaleCategorie);
Vue.component('ForgotPassword', ForgotPassword);
Vue.component('ResetPassword', ResetPassword);
Vue.component('AllProducts', AllProducts);
Vue.component('MesCommandes', MesCommandes);
Vue.component('NousContacter', NousContacter);
Vue.component('Accueil', Accueil);
Vue.component('SupprimerProfile', SupprimerProfile);
Vue.component('Panier', Panier);
Vue.component('LogoBarre', LogoBarre);
Vue.component('Search', Search);
Vue.component('Livraison', Livraison);
Vue.component('AddLivraison', AddLivraison);
Vue.component('AfficherDetails', AfficherDetails);
Vue.component('CommanedPersonaliser', CommanedPersonaliser);
Vue.component('CodeEnvoye', CodeEnvoye);

Vue.use(RadSideDrawer);

new Vue({
    render: h => h('frame', [h(Login)])
}).$start();
