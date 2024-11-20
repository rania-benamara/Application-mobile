<template>
  <Page actionBarHidden="true">
    <RadSideDrawer ref="drawer" drawerLocation="Right">
      <GridLayout ~drawerContent>
        <Menu @menuTap="onMenuTap"/>
      </GridLayout>
      <StackLayout ~mainContent>
        <GridLayout rows="auto, *, auto">
          <!-- Header -->
          <GridLayout row="0" columns="auto, *" rows="auto, auto" class="action-bar-layout">
            <Image src="~/images/gobackIcon.png" col="0" row="0" class="back-icon" @tap="goBack" />
            <Label text="Tous les produits" col="0" row="1" colSpan="2" class="category-title" />
          </GridLayout>

          <!-- Products Grid -->
          <ScrollView row="1">
            <GridLayout columns="*, *" rows="auto" class="product-grid">
              <GridLayout v-for="(product, index) in products"
                          :key="index"
                          :col="index % 2"
                          :row="Math.floor(index / 2)"
                          class="product-item"
                          rows="auto, auto, auto">
                <!-- Image and Price -->
                <GridLayout row="0" @tap="showProductDetails(product)">
                  <Image :src="product.image" stretch="aspectFill" class="product-image"/>
                  <Label :text="formatPrice(product.price)" class="product-price"/>
                </GridLayout>

                <!-- Product Info -->
                <StackLayout row="1" class="product-info" @tap="showProductDetails(product)">
                  <Label :text="product.name" class="product-name"/>
                  <Label :text="product.category" class="product-category"/>
                </StackLayout>

                <!-- Icons -->
                <GridLayout row="2" columns="auto, auto, *, auto" class="product-details">
                  <Image :src="product.isFavorite ? '~/images/favoriteIconFilled.png' : '~/images/favoriteIcon.png'"
                         col="0"
                         class="favorite-icon"
                         @tap="toggleFavorite(index)"/>
                  <Image src="~/images/panier1.png"
                         col="1"
                         class="cart-icon"
                         @tap="addToCart(product)"/>
                  <Label :text="product.rating.toFixed(1)" col="3" class="product-rating"/>
                </GridLayout>
              </GridLayout>
            </GridLayout>
          </ScrollView>

          <!-- NavBar at bottom -->
          <NavBar row="2" @menuTap="openDrawer" />
        </GridLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import { Http, ApplicationSettings } from '@nativescript/core';
import { Frame, alert } from '@nativescript/core';
import Menu from './Menu.vue';
import NavBar from './LogoBarre.vue';
import AfficherDetails from './AfficherDetails.vue';


const API_URL = 'http://10.0.2.2:3000/Product'
export default {
 name: 'AllProducts',

 components: {
 Menu,
 NavBar
 },

 data() {
 return {
 products: [],
 cart: [],
 isLoading: false,
 errorMessage: '',
 defaultImage: '~/images/default-product.png'
 }
 },

 computed: {
 leftColumnProducts() {
 return this.products.filter((_, index) => index % 2 === 0);
 },
 rightColumnProducts() {
 return this.products.filter((_, index) => index % 2 === 1);
 }
 },

 created() {
 this.fetchProducts();
 },

 methods: {
 async fetchProducts() {
 try {
 this.isLoading = true;
 this.errorMessage = '';
 console.log('Fetching products...');

 const response = await Http.request({
 url: `${API_URL}/products`,
 method: "GET",
 headers: { "Content-Type": "application/json" }
 });

 const results = response.content.toJSON();
 console.log('Number of products from API:', results.length);

 this.products = results.map(product => ({
 id: product.id,
 name: product.name,
 category: this.getFirstCategory(product.categories),
 price: parseFloat(product.price || 0),
 rating: 4.5,
 image: product.image || this.defaultImage,
 isFavorite: false,
 description: product.description || "Aucune description disponible",
 quantity: 1
 }));

 console.log('Products processed:', this.products.length);
 } catch (error) {
 console.error('Error fetching products:', error);
 this.errorMessage = "Erreur lors du chargement des produits";
 } finally {
 this.isLoading = false;
 }
 },

 getFirstCategory(categories) {
 return Array.isArray(categories) && categories.length > 0 ? categories[0] : 'Sans catégorie';
 },

 getProductCategory(product) {
 return product.category || 'Sans catégorie';
 },

 onImageError(event, index) {
 console.log(`Image loading error for product ${index}`);
 this.products[index].image = this.defaultImage;
 },

 formatPrice(price) {
 return `${parseFloat(price).toFixed(2)}$`;
 },
   async addToCart(product) {
         try {
           const token = ApplicationSettings.getString('token');
           if (!token) {
             alert({
               title: "Non authentifié",
               message: "Veuillez vous connecter avant d'ajouter des produits au panier.",
               okButtonText: "OK"
             });
             return;
           }
           const response = await Http.request({
               url: 'http://10.0.2.2:3000/Clients/ajouter-au-panier',
               method: 'POST',
               headers: {
                   "Content-Type": "application/json",
                   "Authorization": `Bearer ${token}`
               },
               content: JSON.stringify({
                   product_id: product.id,
                   quantity: 1
               })
           });
           let result;
           try {
               result = response.content.toJSON();
           } catch (parseError) {
               console.error('Response parsing error:', parseError);
               throw new Error('Réponse du serveur non valide.');
           }
           console.log("Parsed result:", result); // Ajoutez ce log avant le if pour vérifier le contenu de result
           if (result && result.success) {
               alert({
                   title: "Succès",
                   message: `${product.name} ajouté au panier`,
                   okButtonText: "OK"
               });
           } else {
               throw new Error(result?.message || 'Erreur lors de l\'ajout au panier');
           }
         } catch (error) {
           alert({
                           title: "Succès",
                           message: `${product.name} ajouté au panier`,
                           okButtonText: "OK"
           });
         }
       },
   showProductDetails(product) {
   this.$navigateTo(AfficherDetails, {
   props: {
   product_id: product.id,
   productName: product.name,
   productDescription: product.description,
   productImage: product.image,
   productPrice: product.price
   },
   transition: { name: "fade" }
   });
   },
   toggleFavorite(index) {
   this.products[index].isFavorite = !this.products[index].isFavorite;
   },
   openDrawer() {
   if (this.$refs.drawer?.nativeView) {
   this.$refs.drawer.nativeView.showDrawer();
   }
   },
   onMenuTap(item) {
   if (this.$refs.drawer?.nativeView) {
   this.$refs.drawer.nativeView.closeDrawer();
   }
   const routes = {
   'Mes commandes': () => import('./MesCommandes.vue'),
   'Mon profile': () => import('./Profile.vue'),
   'Adresse de livraison': () => import('./AddLivraison.vue'),
   'Nous contacter': () => import('./NousContacter.vue'),
   'Paramètres': () => import('./Parametre.vue'),
   'Se déconnecter': () => import('./Login.vue')
   };
   if (routes[item]) {
   routes[item]()
   .then(module => this.$navigateTo(module.default, {
   transition: { name: "fade" }
   }))
   .catch(error => console.error('Navigation error:', error));
   }
   },
   goBack() {
   const frame = Frame.topmost();
   if (frame.canGoBack()) frame.goBack();
   }
   }
  }
  </script>

<style scoped>
.action-bar-layout {
  padding: 10 16;
  background-color: #ffffff;
}

.back-icon {
  width: 10;
  height: 13;
  vertical-align: middle;
  margin: 5 0 5 0;
}

.category-title {
  font-size: 24;
  font-weight: 700;
  margin-top: 10;
  margin-bottom: 10;
  color: #000000;
}

.product-grid {
  padding: 10;
}

.product-item {
  margin: 5;
  background-color: #ffffff;
  border-radius: 10;
}

.product-image {
  width: 100%;
  height: 120;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
}

.product-price {
  font-size: 16;
  font-weight: 600;
  color: #564146;
  background-color: #FFE8E3;
  padding: 5 7;
  border-bottom-left-radius: 15;
  border-top-right-radius: 15;
  margin: 0;
  horizontal-align: right;
  vertical-align: top;
}

.product-info {
  padding: 10 10 0 10;
}

.product-name {
  font-size: 18;
  font-weight: 700;
  color: #FF4A4C;
  horizontal-align: center;
}

.product-category {
  font-size: 14;
  color: #ACA9A7;
  font-weight: 400;
  margin-top: 2;
  horizontal-align: center;
}

.product-details {
  padding: 10;
}

.favorite-icon {
  width: 24;
  height: 24;
  vertical-align: center;
  margin-right: 10;
}

.cart-icon {
  width: 24;
  height: 24;
  vertical-align: center;
}

.product-rating {
  font-size: 14;
  color: #000000;
  text-align: right;
  font-weight: 700;
}
</style>

