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
            <Label text="Mes Favoris" col="0" row="1" colSpan="2" class="category-title" />
          </GridLayout>

          <!-- Products List -->
          <ScrollView row="1">
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
                               col="0"
                               class="favorite-icon"
                               @tap="onFavoriteIconTap(index)"/>
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

export default {
  name: 'ProductFav',

  components: {
    Menu: () => import('./Menu.vue'),
    NavBar: () => import('./LogoBarre.vue')
  },

  data() {
    return {
      products: [
        {
          name: "Chocolate Chip",
          category: "Cookies",
          price: 19.99,
          rating: 4.9,
          image: "~/images/cookie1.png",
          isFavorite: false,
          description: "Ingrédients : Farine de riz blanc, Fécule de pommes de terre, Fécule de tapioca, Farine de sorgho entier",
          quantity: 1
        },
        {
          name: "Oatmeal Raisin",
          category: "Cookies",
          price: 18.99,
          rating: 4.7,
          image: "~/images/cookie2.png",
          isFavorite: false,
          description: "Ingrédients : Farine d'avoine, Raisins secs, Sucre brun, Cannelle",
          quantity: 1
        },
        {
          name: "Double Chocolate",
          category: "Cookies",
          price: 21.99,
          rating: 4.8,
          image: "~/images/cookie1.png",
          isFavorite: false,
          description: "Double dose de chocolat pour les vrais amateurs",
          quantity: 1
        },
        {
          name: "Sugar Cookie",
          category: "Cookies",
          price: 17.99,
          rating: 4.6,
          image: "~/images/cookie2.png",
          isFavorite: false,
          description: "Le classique cookie sucré qui fait toujours plaisir",
          quantity: 1
        }
      ],
      cart: []
    }
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

    onFavoriteIconTap(index) {
      this.products[index].isFavorite = !this.products[index].isFavorite;
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
</style>
