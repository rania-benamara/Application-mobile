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
            <Label :text="categoryName" col="0" row="1" colSpan="2" class="category-title" />
          </GridLayout>

          <!-- Loading Indicator -->
          <ActivityIndicator v-if="isLoading" :busy="true" row="1" class="activity-indicator" />

          <!-- Error Message -->
          <Label v-if="errorMessage" :text="errorMessage" row="1" class="error-message" />

          <!-- Products Grid -->
          <ScrollView row="1" v-if="!isLoading && !errorMessage" orientation="vertical">
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
import MesCommandes from './MesCommandes.vue';
import Profile from './Profile.vue';
import AddLivraison from './AddLivraison.vue';
import NousContacter from './NousContacter.vue';
import Parametre from './Parametre.vue';
import Login from './Login.vue';

const API_URL = 'http://10.0.2.2:3000/Product';

export default {
  name: 'CategoryProducts',

  components: {
    Menu,
    NavBar
  },

  props: {
    categoryName: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      products: [],
      cart: [],
      isLoading: false,
      errorMessage: '',
      defaultImage: "https://wnsansgluten.ca/wp-content/uploads/2023/07/placeholder.jpg",
      imageLoadErrors: new Set()
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
    this.fetchCategoryProducts();
  },

  methods: {
    async fetchCategoryProducts() {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        console.log(`Fetching products for category: ${this.categoryName}`);

        const response = await Http.request({
          url: `${API_URL}/category`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          content: JSON.stringify({ categoryName: this.categoryName })
        });

        const results = response.content.toJSON();
        console.log('Number of products received:', results.length);

        this.products = results.map(product => {
          let imageUrl = product.guid || product.image;

          // Log the initial image URL for debugging
          console.log(`Initial image URL for ${product.name}:`, imageUrl);

          // Clean up the image URL
          if (imageUrl && typeof imageUrl === 'string') {
            // Remove any size suffixes and query parameters
            imageUrl = imageUrl.split('?')[0].replace(/-\d+x\d+\.(jpg|jpeg|png|gif)/, '.$1');
            console.log(`Cleaned image URL:`, imageUrl);
          } else {
            imageUrl = this.defaultImage;
            console.log(`Using default image for ${product.name}`);
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

        console.log('Processed products:', this.products.length);
      } catch (error) {
        console.error('Error fetching category products:', error);
        this.errorMessage = "Erreur lors du chargement des produits";
      } finally {
        this.isLoading = false;
      }
    },

    getImageUrl(product) {
      if (!product.image || !this.isValidImageUrl(product.image)) {
        console.log(`Invalid image URL for ${product.name}, using default`);
        return this.defaultImage;
      }
      return product.image;
    },

    isValidImageUrl(url) {
      if (!url || typeof url !== 'string') return false;
      return url.match(/\.(jpg|jpeg|png|gif)$/i) !== null ||
             url.includes('/wp-content/uploads/');
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
      console.log('Failed image URL:', this.products[index]?.image);
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
        'Mes commandes': MesCommandes,
        'Mon profile': Profile,
        'Adresse de livraison': AddLivraison,
        'Nous contacter': NousContacter,
        'Paramètres': Parametre,
        'Se déconnecter': Login
      };

      const component = routes[item];
      if (component) {
        this.$navigateTo(component, {
          transition: { name: "fade" }
        })
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
  margin: 5;
}

.category-title {
  font-size: 24;
  font-weight: bold;
  margin: 10;
  color: #000000;
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
</style>
