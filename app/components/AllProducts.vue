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
                      <Image :src="product.image"
                             stretch="aspectFill"
                             class="product-image"
                             @error="onImageError($event, index)"/>
                      <Label :text="formatPrice(product.price)" class="product-price"/>
                    </GridLayout>

                    <!-- Info Container -->
                    <StackLayout class="product-info" @tap="showProductDetails(product)">
                      <Label :text="product.name" class="product-name" textWrap="true"/>
                      <Label :text="getProductCategory(product)" class="product-category"/>
                    </StackLayout>

                    <!-- Actions Container -->
                    <GridLayout columns="auto, auto, *, auto" class="product-actions" height="40">
                      <!-- In both left and right columns, replace the favorite icon section with: -->
                      <Image :src="product.isFavorite ? '~/images/favoris-rempli.png' : '~/images/favoris.png'"
                             col="0"
                             class="action-icon"
                             @tap="toggleFavorite(product, product.id)"/>

                      <Image src="~/images/panier1.png"
                             col="1"
                             class="action-icon"
                             @tap="addToCart(product)"/>
                      <Label :text="product.rating.toFixed(1)" col="3" class="rating"/>
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
                      <Image :src="product.image"
                             stretch="aspectFill"
                             class="product-image"
                             @error="onImageError($event, index)"/>
                      <Label :text="formatPrice(product.price)" class="product-price"/>
                    </GridLayout>

                    <!-- Info Container -->
                    <StackLayout class="product-info" @tap="showProductDetails(product)">
                      <Label :text="product.name" class="product-name" textWrap="true"/>
                      <Label :text="getProductCategory(product)" class="product-category"/>
                    </StackLayout>

                    <!-- Actions Container -->
                    <GridLayout columns="auto, auto, *, auto" class="product-actions" height="40">
                      <!-- In both left and right columns, replace the favorite icon section with: -->
                      <Image :src="product.isFavorite ? '~/images/favoris-rempli.png' : '~/images/favoris.png'"
                             col="0"
                             class="action-icon"
                             @tap="toggleFavorite(product, product.id)"/>

                      <Image src="~/images/panier1.png"
                             col="1"
                             class="action-icon"
                             @tap="addToCart(product)"/>
                      <Label :text="product.rating.toFixed(1)" col="3" class="rating"/>
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
import { Http, ApplicationSettings } from '@nativescript/core'
import { Frame, alert } from '@nativescript/core'
import Menu from './Menu.vue'
import NavBar from './LogoBarre.vue'
import AfficherDetails from './AfficherDetails.vue'

const API_URL = 'https://dev-api.wnsansgluten.ca/Product'

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
      return this.products.filter((_, index) => index % 2 === 0)
    },
    rightColumnProducts() {
      return this.products.filter((_, index) => index % 2 === 1)
    }
  },

  created() {
      this.fetchProducts(); // This will now handle checking favorites as well
  },

  methods: {
    async fetchProducts() {
        try {
            this.isLoading = true;
            this.errorMessage = '';

            const response = await Http.request({
                url: `${API_URL}/products`,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const results = response.content.toJSON();

            this.products = results.map(product => ({
                id: product.id,
                name: product.name,
                category: this.getFirstCategory(product.categories),
                price: parseFloat(product.price || 0),
                rating: 4.5,
                image: product.image || this.defaultImage,
                isFavorite: false, // Initialize as false
                description: product.description || "Aucune description disponible",
                quantity: 1
            }));

            // Check initial favorites right after loading products
            await this.checkInitialFavorites();
        } catch (error) {
            console.error('Error fetching products:', error);
            this.errorMessage = "Erreur lors du chargement des produits";
        } finally {
            this.isLoading = false;
        }
    },

    async checkInitialFavorites() {
        try {
            const token = ApplicationSettings.getString('token');
            if (!token) return;

            const response = await Http.request({
                url: 'https://dev-api.wnsansgluten.ca/Clients/favoris',
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const favorites = response.content.toJSON();
            if (Array.isArray(favorites)) {
                const favoriteIds = new Set(favorites.map(fav => fav.id));
                this.products.forEach((product, index) => {
                    this.$set(this.products[index], 'isFavorite', favoriteIds.has(product.id));
                });
            }
        } catch (error) {
            console.error('Error checking initial favorites:', error);
        }
    },

    async toggleFavorite(product, productId) {
        try {
            const token = ApplicationSettings.getString('token');
            if (!token) {
                alert({
                    title: "Non authentifié",
                    message: "Veuillez vous connecter pour ajouter aux favoris",
                    okButtonText: "OK"
                });
                return;
            }

            // Find the product in the main products array
            const productIndex = this.products.findIndex(p => p.id === productId);
            if (productIndex === -1) {
                console.error('Product not found:', productId);
                return;
            }

            // Store the current favorite status
            const currentFavoriteStatus = this.products[productIndex].isFavorite;

            // Update the UI optimistically
            this.$set(this.products[productIndex], 'isFavorite', !currentFavoriteStatus);

            let response;
            if (!currentFavoriteStatus) {
                // Adding to favorites
                response = await Http.request({
                    url: 'https://dev-api.wnsansgluten.ca/Clients/add-favoris',
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    content: JSON.stringify({
                        productId: productId  // Make sure this matches your backend expectation
                    })
                });
            } else {
                // Removing from favorites
                response = await Http.request({
                    url: `https://dev-api.wnsansgluten.ca/Clients/remove-favoris/${productId}`,
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            }

            const result = response.content.toJSON();
            console.log('API Response:', result); // Add this for debugging

            if (result.message) {
                alert({
                    title: "Succès",
                    message: !currentFavoriteStatus
                        ? `${product.name} ajouté aux favoris`
                        : `${product.name} retiré des favoris`,
                    okButtonText: "OK"
                });
            } else {
                // Revert the UI change if the API doesn't return a success message
                this.$set(this.products[productIndex], 'isFavorite', currentFavoriteStatus);
                throw new Error(result.message || "Erreur lors de la mise à jour des favoris");
            }
        } catch (error) {
            console.error('Error in toggleFavorite:', error);

            // If we have a productIndex, revert the UI change
            if (typeof productIndex !== 'undefined') {
                this.$set(this.products[productIndex], 'isFavorite', currentFavoriteStatus);
            }

            alert({
                title: "Erreur",
                message: "Erreur lors de la mise à jour des favoris",
                okButtonText: "OK"
            });
        }
    },



    getFirstCategory(categories) {
      return Array.isArray(categories) && categories.length > 0 ? categories[0] : 'Sans catégorie'
    },

    getProductCategory(product) {
      return product.category || 'Sans catégorie'
    },

    onImageError(event, index) {
      console.log(`Image loading error for product ${index}`)
      this.products[index].image = this.defaultImage
    },

    formatPrice(price) {
      return `${parseFloat(price).toFixed(2)}$`
    },

    async addToCart(product) {
      try {
        const token = ApplicationSettings.getString('token')
        if (!token) {
          alert({
            title: "Non authentifié",
            message: "Veuillez vous connecter avant d'ajouter des produits au panier.",
            okButtonText: "OK"
          })
          return
        }

        const response = await Http.request({
          url: 'https://dev-api.wnsansgluten.ca/Clients/ajouter-au-panier',
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          content: JSON.stringify({
            product_id: product.id,
            quantity: 1
          })
        })

        const result = response.content.toJSON()

        alert({
          title: "Succès",
          message: `${product.name} ajouté au panier`,
          okButtonText: "OK"
        })
      } catch (error) {
        console.error('Error adding to cart:', error)
        alert({
          title: "Erreur",
          message: error.message || "Erreur lors de l'ajout au panier",
          okButtonText: "OK"
        })
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
      })
    },

    openDrawer() {
      if (this.$refs.drawer?.nativeView) {
        this.$refs.drawer.nativeView.showDrawer()
      }
    },

    onMenuTap(item) {
      if (this.$refs.drawer?.nativeView) {
        this.$refs.drawer.nativeView.closeDrawer()
      }

      const routes = {
        'Mes commandes': () => import('./MesCommandes.vue'),
        'Mon profile': () => import('./Profile.vue'),
        'Adresse de livraison': () => import('./AddLivraison.vue'),
        'Nous contacter': () => import('./NousContacter.vue'),
        'Paramètres': () => import('./Parametre.vue'),
        'Se déconnecter': () => import('./Login.vue')
      }

      if (routes[item]) {
        routes[item]()
          .then(module => this.$navigateTo(module.default, {
            transition: { name: "fade" }
          }))
          .catch(error => console.error('Navigation error:', error))
      }
    },

    goBack() {
      const frame = Frame.topmost()
      if (frame.canGoBack()) {
        frame.goBack()
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
