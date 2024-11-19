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
  name: 'AllProducts',
//f
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

    addToCart(product) {
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

    toggleFavorite(index) {
      this.products[index].isFavorite = !this.products[index].isFavorite;
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
