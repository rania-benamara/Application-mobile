<template>
  <Page actionBarHidden="true">
    <RadSideDrawer ref="drawer" drawerLocation="Right">
      <GridLayout ~drawerContent>
        <Menu @menuTap="onMenuTap" />
      </GridLayout>

      <StackLayout ~mainContent>
        <GridLayout rows="auto, *, auto">
          <!-- Header -->
          <GridLayout row="0" columns="auto, *" rows="auto, auto" class="action-bar-layout">
            <Image src="~/images/gobackIcon.png" col="0" row="0" class="back-icon" @tap="goBack" />
            <Label text="Mes Favoris" col="0" row="1" colSpan="2" class="category-title" />
          </GridLayout>

          <!-- Loading Indicator -->
          <ActivityIndicator v-if="isLoading" :busy="true" row="1" class="activity-indicator" />

          <!-- Error Message -->
          <Label v-if="errorMessage" :text="errorMessage" row="1" class="error-message" />

          <!-- Products List -->
          <ScrollView row="1" v-if="!isLoading && !errorMessage">
            <StackLayout class="product-container">
              <GridLayout v-for="(product, index) in products"
                         :key="index"
                         columns="auto, *"
                         rows="auto"
                         class="product-item">
                <!-- Product Image -->
                <GridLayout col="0" @tap="showProductDetails(product)">
                    <Image :src="product.image"
                           stretch="aspectFill"
                           class="product-image"/>
                </GridLayout>

                <!-- Product Info -->
                <StackLayout col="1" class="product-info">
                    <!-- Info section -->
                    <StackLayout @tap="showProductDetails(product)">
                        <Label :text="product.name" class="product-name"/>
                        <Label :text="product.category" class="product-category"/>
                        <Label :text="formatPrice(product.price)" class="product-price"/>
                    </StackLayout>

                    <!-- Icons section -->
                    <GridLayout columns="auto, auto, *" class="rating-container">
                        <Image :src="product.isFavorite ? '~/images/favoriteIconFilled.png' : '~/images/favoriteIcon.png'"
                               :class="{ 'favorite-icon-red': product.isFavorite }"
                               col="0"
                               class="favorite-icon"
                               @tap="toggleFavorite(product, index)"/>
                        <Image src="~/images/panier1.png"
                               col="1"
                               class="cart-icon"
                               @tap="onCartIconTap(product)"/>
                        <Label :text="product.rating.toFixed(1)"
                               col="2"
                               class="product-rating"/>
                    </GridLayout>
                </StackLayout>
              </GridLayout>
            </StackLayout>
          </ScrollView>

          <!-- NavBar at bottom -->
          <NavBar row="2" @menuTap="openDrawer" />
        </GridLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import Menu from './Menu.vue'
import NavBar from './LogoBarre.vue'
import MesCommandes from './MesCommandes.vue'
import { Frame, alert } from '@nativescript/core'
import Profile from './Profile.vue'
import AddLivraison from './AddLivraison.vue'
import NousContacter from './NousContacter.vue'
import Parametre from './Parametre.vue'
import Login from './Login.vue'
import AfficherDetails from './AfficherDetails.vue'
import axios from 'axios'

export default {
  name: 'ProductFav',

  components: {
    Menu: () => import('./Menu.vue'),
    NavBar: () => import('./LogoBarre.vue')
  },

  data() {
    return {
      products: [],
      cart: [],
      isLoading: false,
      errorMessage: ''
    }
  },

  mounted() {
    this.fetchFavoriteProducts();
  },

  methods: {
    formatPrice(price) {
      return `$${price.toFixed(2)}`;
    },

    showProductDetails(product) {
      this.$navigateTo(AfficherDetails, {
        props: {
          productName: product.name,
          productDescription: product.description,
          productImage: product.image,
          productPrice: product.price
        },
        transition: {
          name: "fade"
        }
      }).catch(error => {
        console.error("Navigation to AfficherDetails failed:", error);
      });
    },

    onCartIconTap(product) {
      const existingProduct = this.cart.find(item => item.name === product.name);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({
          ...product,
          quantity: 1
        });
      }

      alert({
        title: "Succès",
        message: `${product.name} a été ajouté au panier`,
        okButtonText: "OK"
      });

      console.log('Cart:', this.cart);
    },

    async toggleFavorite(product, index) {
      try {
        const isFavorite = !this.products[index].isFavorite;
        this.products[index].isFavorite = isFavorite;

        const response = await axios.post('http://10.0.2.2:3000/add-favoris', {
          productId: product.id
        });

        console.log(response.data.message);

        if (isFavorite) {
          alert({
            title: "Succès",
            message: `${product.name} ajouté aux favoris`,
            okButtonText: "OK"
          });
        } else {
          alert({
            title: "Succès",
            message: `${product.name} retiré des favoris`,
            okButtonText: "OK"
          });
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
        alert({
          title: "Erreur",
          message: "Erreur lors de la mise à jour des favoris",
          okButtonText: "OK"
        });
      }
    },

    openDrawer() {
      if (this.$refs.drawer && this.$refs.drawer.nativeView) {
        this.$refs.drawer.nativeView.showDrawer();
      }
    },

    onMenuTap(item) {
      if (this.$refs.drawer && this.$refs.drawer.nativeView) {
        this.$refs.drawer.nativeView.closeDrawer();
      }

      const navigationMap = {
        'Mes commandes': MesCommandes,
        'Mon profile': Profile,
        'Adresse de livraison': AddLivraison,
        'Nous contacter': NousContacter,
        'Paramètres': Parametre,
        'Se déconnecter': Login
      };

      const component = navigationMap[item];
      if (component) {
        this.$navigateTo(component, {
          transition: { name: "fade" }
        }).catch(error => {
          console.error(`Navigation to ${item} failed:`, error);
        });
      }
    },

    goBack() {
      const frame = Frame.topmost();
      if (frame.canGoBack()) {
        frame.goBack();
      }
    },

    async fetchFavoriteProducts() {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        const response = await axios.get('http://10.0.2.2:3000/favoris');
        this.products = response.data.map(product => ({
          ...product,
          isFavorite: true, // Assuming all fetched products are favorites
          price: parseFloat(product.price) // Ensure price is a number
        }));
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn('No favorite products found.');
          this.errorMessage = "Aucun produit favori trouvé.";
        } else {
          console.error('Error fetching favorite products:', error);
          this.errorMessage = "Erreur lors de la récupération des produits favoris";
        }
      } finally {
        this.isLoading = false;
      }
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
  width: 20;
  height: 20;
  margin: 5;
  vertical-align: middle;
}

.category-title {
  font-size: 20;
  font-weight: 700;
  margin: 10;
  color: #000000;
}

.product-container {
  padding: 10;
}

.product-item {
  margin: 10;
  background-color: #ffffff;
  border-radius: 10;
  padding: 13;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0 2;
  shadow-opacity: 0.25;
  shadow-radius: 3.84;
}

.product-image {
  width: 150;
  height: 100;
  border-radius: 10;
  margin: 5;
}

.product-info {
  padding-left: 10;
  justify-content: center;
}

.product-name {
  font-size: 18;
  font-weight: 700;
  color: #FF4A4C;
}

.product-category {
  font-size: 14;
  color: #ACA9A7;
  font-weight: 400;
  margin-top: 2;
}

.product-price {
  font-size: 16;
  font-weight: 600;
  color: #564146;
  margin-top: 5;
}

.rating-container {
  margin-top: 5;
}

.favorite-icon {
  width: 20;
  height: 20;
  vertical-align: center;
  margin-right: 10;
}

.favorite-icon-red {
  filter: invert(29%) sepia(96%) saturate(7485%) hue-rotate(357deg) brightness(100%) contrast(104%);
}

.cart-icon {
  width: 20;
  height: 20;
  vertical-align: center;
  margin-right: 10;
}

.product-rating {
  font-size: 14;
  color: #000000;
  font-weight: 700;
  text-align: right;
}

.error-message {
  color: red;
  text-align: center;
  font-size: 14;
  margin: 20;
}

.activity-indicator {
  color: #FF4A4C;
  margin: 20;
}
</style>
