<template>
  <Page actionBarHidden="true">
    <RadSideDrawer ref="drawer" drawerLocation="Right">
      <GridLayout ~drawerContent>
        <Menu @menuTap="onMenuTap"/>
      </GridLayout>
      <StackLayout ~mainContent>
        <GridLayout rows="*, auto">
          <!-- Contenu principal avec le compteur de quantité et le détail du produit -->
          <ScrollView row="0">
            <StackLayout>
              <Label text="<" class="boutton-retour" @tap="goBack" />

              <!-- Image du produit -->
              <Image :src="productImage" class="product-image" />

              <!-- Titre du produit -->
              <Label :text="productName" class="pdetails-titre" />

              <!-- Description du produit -->
              <Label :text="productDescription" textWrap="true" class="pdetails-description" />

              <!-- Compteur de quantité -->
              <GridLayout columns="auto, *, auto" rows="auto" horizontalAlignment="center"
                          verticalAlignment="center" class="counter-container">
                <Button text="-" @tap="decrement" class="btn-counter" col="0" />
                <Label :text="quantity.toString()" class="counter-display" col="1"
                       horizontalAlignment="center" />
                <Button text="+" @tap="increment" class="btn-counter" col="2" />
              </GridLayout>

              <!-- Boutons Ajouter au panier et Favoris -->
              <GridLayout columns="*, auto" rows="auto" class="button-container">
                <Button text="Ajouter au panier" class="pdetail-ajouter" @tap="addToCart" col="0" />
                <Image :src="isFavorite ? '~/images/favoris-rempli.png' : '~/images/favoris.png'"
                       class="heart-icon" @tap="toggleFavorite" col="1" />
              </GridLayout>
            </StackLayout>
          </ScrollView>

          <!-- NavBar at bottom -->
          <NavBar row="1" @menuTap="openDrawer" />
        </GridLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import { Frame } from '@nativescript/core'
import NavBar from './LogoBarre.vue'
import Menu from './Menu.vue'
import MesCommandes from './MesCommandes.vue'
import Profile from './Profile.vue'
import AddLivraison from './AddLivraison.vue'
import NousContacter from './NousContacter.vue'
import Parametre from './Parametre.vue'
import Login from './Login.vue'

export default {
  name: 'AfficherDetails',

  components: {
    Menu: () => import('./Menu.vue'),
    NavBar: () => import('./LogoBarre.vue')
  },

  props: {
    productName: {
      type: String,
      required: true
    },
    productDescription: {
      type: String,
      required: true
    },
    productImage: {
      type: String,
      required: true
    },
    productPrice: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      quantity: 1,
      isFavorite: false,
    };
  },

  methods: {
    increment() {
      this.quantity++;
    },

    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    addToCart() {
      // Code d'ajout au panier
      console.log(`Adding ${this.quantity} of ${this.productName} to cart`);
    },

    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },

    goBack() {
      const frame = Frame.topmost();
      if (frame.canGoBack()) {
        frame.goBack();
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
    }
  }
};
</script>


<style scoped>
.boutton-retour {
  color: #E95322;
  font-size: 28px;
  top: 2px;
  left: 3px;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 30px;
}

.pdetails-titre {
  font-family: Inter;
  font-size: 25px;
  font-weight: 500;
  line-height: 24.2px;
  text-align: left;
  margin-left: 30px;
  color: #000000;
  margin: 32px 0;
}

.pdetails-description {
  font-size: 14px;
  text-align: left;
  margin: 0 16px 24px 16px;
}

.counter-container {
  margin: 24px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.btn-counter {
  font-size: 14px;
  color: white;
  background-color: #1a1a6a;
  border-radius: 5px;
  padding: 5px;
  width: 80px;
  height: 80px;
  text-align: center;
  margin-left: 10px;
}

.counter-display {
  font-size: 20px;
  margin: 0 16px;
  text-align: center;
}

.pdetail-ajouter {
  background-color: #1a1a6a;
  color: #ffffff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
}

.pdetail-ajouter-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-heart {
  margin-left: 10px;
  vertical-align: middle;
}

.button-container {
  margin: 16px;
}

.heart-icon {
  width: 24;
  height: 24;
  margin-right: 16;
}
</style>
