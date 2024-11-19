<template>
  <Page actionBarHidden="true">
    <RadSideDrawer ref="drawer" drawerLocation="Right">
      <GridLayout ~drawerContent>
        <Menu @menuTap="onMenuTap"/>
      </GridLayout>

      <StackLayout ~mainContent>
        <GridLayout rows="auto, *, auto">
          <!-- Search Bar -->
          <GridLayout row="0" columns="auto, *, auto" class="search-container">
            <Image src="~/images/gobackIcon.png"
                   col="0"
                   class="back-icon"
                   @tap="goBack" />
            <SearchBar v-model="searchQuery"
                      hint="Rechercher"
                      col="1"
                      class="search-bar"
                      @submit="performSearch"/>
            <Button text="RECHERCHER"
                    col="2"
                    class="search-button"
                    @tap="performSearch"/>
          </GridLayout>

          <!-- Loading Indicator -->
          <ActivityIndicator v-if="isLoading"
                           :busy="true"
                           row="1"
                           class="activity-indicator" />

          <!-- Error Message -->
          <Label v-if="errorMessage"
                 :text="errorMessage"
                 row="1"
                 class="error-message" />

          <!-- No Results Message -->
          <Label v-if="searchPerformed && !products.length && !isLoading"
                 text="Aucun produit trouvé"
                 row="1"
                 class="no-results"/>

          <!-- Search Results -->
          <ScrollView row="1" v-if="!isLoading && !errorMessage && products.length > 0" orientation="vertical">
            <GridLayout columns="*,*" class="products-wrap">
              <!-- Left Column -->
              <StackLayout col="0" class="product-column">
                <GridLayout v-for="(product, index) in leftColumnProducts"
                           :key="product.id"
                           rows="auto"
                           class="product-item">
                  <StackLayout class="product-container">
                    <!-- Image Container -->
                    <GridLayout height="120" @tap="showProductDetails(product)">
                      <Image :src="getImageUrl(product)"
                             stretch="aspectFill"
                             class="product-image"
                             @error="onImageError($event, index)"
                             loadMode="async"/>
                      <Label :text="formatPrice(product.price)"
                             class="product-price"/>
                    </GridLayout>

                    <!-- Info Container -->
                    <StackLayout class="product-info" @tap="showProductDetails(product)">
                      <Label :text="product.name"
                             class="product-name"
                             textWrap="true"/>
                      <Label :text="getProductCategory(product)"
                             class="product-category"/>
                    </StackLayout>

                    <!-- Actions Container -->
                    <GridLayout columns="auto, auto, *, auto"
                                class="product-actions"
                                height="40">
                      <Image :src="product.isFavorite ? '~/images/favoriteIconFilled.png' : '~/images/favoriteIcon.png'"
                             col="0"
                             class="action-icon"
                             @tap="toggleFavorite(index * 2)"/>
                      <Image src="~/images/panier1.png"
                             col="1"
                             class="action-icon"
                             @tap="addToCart(product)"/>
                      <Label :text="product.rating.toFixed(1)"
                             col="3"
                             class="rating"/>
                    </GridLayout>
                  </StackLayout>
                </GridLayout>
              </StackLayout>

              <!-- Right Column -->
              <StackLayout col="1" class="product-column">
                <GridLayout v-for="(product, index) in rightColumnProducts"
                           :key="product.id"
                           rows="auto"
                           class="product-item">
                  <StackLayout class="product-container">
                    <!-- Image Container -->
                    <GridLayout height="120" @tap="showProductDetails(product)">
                      <Image :src="getImageUrl(product)"
                             stretch="aspectFill"
                             class="product-image"
                             @error="onImageError($event, index)"
                             loadMode="async"/>
                      <Label :text="formatPrice(product.price)"
                             class="product-price"/>
                    </GridLayout>

                    <!-- Info Container -->
                    <StackLayout class="product-info" @tap="showProductDetails(product)">
                      <Label :text="product.name"
                             class="product-name"
                             textWrap="true"/>
                      <Label :text="getProductCategory(product)"
                             class="product-category"/>
                    </StackLayout>

                    <!-- Actions Container -->
                    <GridLayout columns="auto, auto, *, auto"
                                class="product-actions"
                                height="40">
                      <Image :src="product.isFavorite ? '~/images/favoriteIconFilled.png' : '~/images/favoriteIcon.png'"
                             col="0"
                             class="action-icon"
                             @tap="toggleFavorite(index * 2 + 1)"/>
                      <Image src="~/images/panier1.png"
                             col="1"
                             class="action-icon"
                             @tap="addToCart(product)"/>
                      <Label :text="product.rating.toFixed(1)"
                             col="3"
                             class="rating"/>
                    </GridLayout>
                  </StackLayout>
                </GridLayout>
              </StackLayout>
            </GridLayout>
          </ScrollView>

          <!-- NavBar -->
          <NavBar row="2" @menuTap="openDrawer" />
        </GridLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import { Http } from '@nativescript/core';
import { Frame, alert } from '@nativescript/core';
import Menu from './Menu.vue';
import NavBar from './LogoBarre.vue';
import AfficherDetails from './AfficherDetails.vue';

const API_URL = 'http://10.0.2.2:3000/Product';

export default {
  name: 'Search',

  components: {
    Menu,
    NavBar
  },

  data() {
    return {
      searchQuery: '',
      products: [],
      cart: [],
      isLoading: false,
      errorMessage: '',
      defaultImage: "https://wnsansgluten.ca/wp-content/uploads/2023/07/placeholder.jpg",
      imageLoadErrors: new Set(),
      searchPerformed: false,
      isDrawerOpen: false
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

  methods: {
    async performSearch() {
      if (!this.searchQuery.trim()) {
        alert({
          title: "Erreur",
          message: "Veuillez entrer un terme de recherche",
          okButtonText: "OK"
        });
        return;
      }

      try {
        this.isLoading = true;
        this.errorMessage = '';
        this.searchPerformed = true;
        console.log('Searching for:', this.searchQuery);

        const response = await Http.request({
          url: `${API_URL}/search-product`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          content: JSON.stringify({ productName: this.searchQuery })
        });

        const results = response.content.toJSON();
        console.log('Search results:', results);

        this.products = results.map(product => {
          let imageUrl = product.guid || product.image;

          if (imageUrl && typeof imageUrl === 'string') {
            imageUrl = imageUrl.split('?')[0].replace(/-\d+x\d+\.(jpg|jpeg|png|gif)/, '.$1');
          } else {
            imageUrl = this.defaultImage;
          }

          return {
            id: product.id,
            name: product.name,
            category: this.getFirstCategory(product.categories),
            price: parseFloat(product.price || 0),
            rating: 4.5,
            image: imageUrl,
            isFavorite: false,
            description: product.description || "Aucune description disponible",
            quantity: 1
          };
        });

      } catch (error) {
        console.error('Search error:', error);
        this.errorMessage = "Erreur lors de la recherche";
      } finally {
        this.isLoading = false;
      }
    },

    getImageUrl(product) {
      if (!product.image || !this.isValidImageUrl(product.image)) {
        return this.defaultImage;
      }
      return product.image;
    },

    isValidImageUrl(url) {
      if (!url || typeof url !== 'string') return false;
      return url.includes('wp-content/uploads') ||
             url.match(/\.(jpg|jpeg|png|gif)$/i) !== null;
    },

    getFirstCategory(categories) {
      if (!categories) return 'Sans catégorie';
      if (typeof categories === 'string') {
        const categoryArray = categories.split(',').map(cat => cat.trim());
        return categoryArray[0] || 'Sans catégorie';
      }
      if (Array.isArray(categories)) {
        return categories[0] || 'Sans catégorie';
      }
      return 'Sans catégorie';
    },

    getProductCategory(product) {
      return product.category || 'Sans catégorie';
    },

    onImageError(event, index) {
      console.log(`Image loading error for product ${index}`);
      if (this.products[index]) {
        this.products[index].image = this.defaultImage;
        this.imageLoadErrors.add(index);
        this.products = [...this.products];
      }
    },

    formatPrice(price) {
      return `${parseFloat(price).toFixed(2)}$`;
    },

    async addToCart(product) {
      try {
        const existingProduct = this.cart.find(item => item.id === product.id);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          this.cart.push({ ...product, quantity: 1 });
        }
        alert({
          title: "Succès",
          message: `${product.name} ajouté au panier`,
          okButtonText: "OK"
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert({
          title: "Erreur",
          message: "Erreur lors de l'ajout au panier",
          okButtonText: "OK"
        });
      }
    },

    showProductDetails(product) {
      this.$navigateTo(AfficherDetails, {
        props: {
          productId: product.id,
          productName: product.name,
          productDescription: product.description,
          productImage: this.getImageUrl(product),
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
  margin: 5;
}

.search-container {
  padding: 10;
  margin-top: 10;
  background-color: white;
}

.search-bar {
  width: 100%;
  margin: 0 10;
  border-radius: 20;
  border-color: #8E8383;
  height: 40;
  padding: 0 10;
  background-color: white;
}

.search-button {
  color: #ffffff;
  background-color: #1C1D53;
  border-radius: 20;
  height: 40;
  width: 100;
  padding: 0 15;
  font-size: 12;
  text-transform: none;
  margin: 0;
}

.products-wrap {
  padding: 8;
}

.product-column {
  padding: 0 4;
}

.product-item {
  margin-bottom: 8;
}

.product-container {
  background-color: white;
  border-radius: 10;
  elevation: 2;
}

.product-image {
  border-radius: 10 10 0 0;
  height: 120;
  background-color: #f0f0f0;
  object-fit: cover;
}

.product-price {
  font-size: 16;
  font-weight: bold;
  color: #564146;
  background-color: #FFE8E3;
  padding: 5 7;
  border-radius: 0 10 0 10;
  horizontal-align: right;
  vertical-align: top;
  margin: 0;
}

.product-info {
  padding: 8;
  height: 80;
}

.product-name {
  font-size: 14;
  font-weight: bold;
  color: #FF4A4C;
  text-align: center;
  margin: 0;
}

.product-category {
  font-size: 12;
  color: #ACA9A7;
  text-align: center;
  margin-top: 4;
}

.product-actions {
  padding: 8;
  height: 40;
  vertical-align: middle;
}

.action-icon {
  width: 20;
  height: 20;
  margin: 0 8 0 0;
  vertical-align: middle;
}

.rating {
  font-size: 14;
  color: #000000;
  text-align: right;
  font-weight: bold;
  vertical-align: middle;
  margin: 0;
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

.no-results {
  text-align: center;
  font-size: 16;
  color: #666;
  margin: 20;
}

.drawer-content {
  background-color: #1C1D53;
}

.main-content {
  padding: 0;
}
</style>

