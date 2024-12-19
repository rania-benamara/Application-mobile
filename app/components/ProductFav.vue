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

          <!-- Loading Indicator -->
          <ActivityIndicator v-if="isLoading" busy="true" row="1" />

          <!-- Error Message -->
          <Label v-else-if="errorMessage"
                 :text="errorMessage"
                 row="1"
                 class="error-message"
                 textWrap="true" />

          <!-- Empty State -->
          <StackLayout v-else-if="products.length === 0"
                      row="1"
                      class="empty-state">
            <Label text="Aucun produit favori" class="empty-message" />
          </StackLayout>

          <!-- Products List -->
          <ScrollView v-else row="1">
            <StackLayout class="product-container">
              <GridLayout v-for="(product, index) in products"
                         :key="index"
                         columns="auto, *"
                         rows="auto"
                         class="product-item">
                <!-- Product Image -->
                <GridLayout col="0" @tap="showProductDetails(product)">
                  <ActivityIndicator v-if="isImageLoading" busy="true" />
                  <Image :src="getImageUrl(product)"
                         stretch="aspectFill"
                         class="product-image"
                         @loaded="onImageLoaded"
                         @error="onImageError"/>
                </GridLayout>

                <!-- Product Info -->
                <StackLayout col="1" class="product-info">
                  <StackLayout @tap="showProductDetails(product)">
                    <Label :text="product.name" class="product-name"/>
                    <Label :text="product.category" class="product-category"/>
                    <Label :text="formatPrice(product.price)" class="product-price"/>
                  </StackLayout>

                  <GridLayout columns="auto, auto, *" class="rating-container">
                    <Image src="~/images/favoris-rempli.png"
                           col="0"
                           class="favorite-icon"
                           @tap="toggleFavorite(product, index)"/>
                    <Image src="~/images/panier1.png"
                           col="1"
                           class="cart-icon"
                           @tap="onCartIconTap(product)"/>
                    <Label :text="product.rating" col="2" class="product-rating"/>
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
import { Http, ApplicationSettings } from '@nativescript/core'
import { Frame, alert } from '@nativescript/core'
import Menu from './Menu'
import NavBar from './LogoBarre'
import AfficherDetails from './AfficherDetails'

export default {
  name: 'ProductFav',

  components: {
    Menu,
    NavBar
  },

  data() {
    return {
      products: [],
      isLoading: false,
      isImageLoading: true,
      errorMessage: '',
      defaultImage: 'https://wnsansgluten.ca/wp-content/uploads/woocommerce-placeholder.png',
      cart: []
    }
  },

  mounted() {
    this.fetchFavoriteProducts()
  },

  methods: {
    formatPrice(price) {
      return `$${parseFloat(price).toFixed(2)}`
    },

    getImageUrl(product) {
      if (!product.image || product.image.includes('?post_type=product')) {
        console.log(`Using default image for product: ${product.name}`);
        return this.defaultImage;
      }
      console.log(`Using product image for product: ${product.name}, URL: ${product.image}`);
      return product.image;
    },

    onImageLoaded() {
      this.isImageLoading = false
    },

    onImageError(args) {
      console.log("Image loading error:", args.object.src);
      args.object.src = this.defaultImage;
    },

    showProductDetails(product) {
      this.$navigateTo(AfficherDetails, {
        props: {
          productName: product.name,
          productDescription: product.description,
          productImage: product.image,
          productPrice: product.price
        },
        transition: { name: "fade" }
      }).catch(error => {
        console.error("Navigation to AfficherDetails failed:", error)
      })
    },

    onCartIconTap(product) {
      const existingProduct = this.cart.find(item => item.name === product.name)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      alert({
        title: "Succès",
        message: `${product.name} a été ajouté au panier`,
        okButtonText: "OK"
      })
    },

    async toggleFavorite(product, index) {
        try {
            const token = ApplicationSettings.getString('token');

            // Since this is the favorites page, we're only removing items
            const response = await Http.request({
                url: `https://dev-api.wnsansgluten.ca/Clients/remove-favoris/${product.id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const responseData = response.content.toJSON();
            if (responseData.message === "Produit retiré des favoris avec succès") {
                // Remove the product from the local array
                this.products.splice(index, 1);

                alert({
                    title: "Succès",
                    message: `${product.name} a été retiré des favoris`,
                    okButtonText: "OK"
                });
            }
        } catch (error) {
            console.error('Error removing favorite product:', error);
            alert({
                title: "Erreur",
                message: "Erreur lors de la suppression des favoris",
                okButtonText: "OK"
            });
        }
    },

    openDrawer() {
      if (this.$refs.drawer && this.$refs.drawer.nativeView) {
        this.$refs.drawer.nativeView.showDrawer()
      }
    },

    onMenuTap(item) {
      if (this.$refs.drawer && this.$refs.drawer.nativeView) {
        this.$refs.drawer.nativeView.closeDrawer();
      }

      const navigationMap = {
        'Mes commandes': () => import('./MesCommandes'),
        'Mon profile': () => import('./Profile'),
        'Adresse de livraison': () => import('./AddLivraison'),
        'Nous contacter': () => import('./NousContacter'),
        'Paramètres': () => import('./Parametre'),
        'Se déconnecter': () => import('./Login')
      };

      const componentImport = navigationMap[item];
      if (componentImport) {
        componentImport().then(module => {
          this.$navigateTo(module.default, {
            transition: { name: "fade" }
          }).catch(error => {
            console.error(`Navigation to ${item} failed:`, error);
          });
        });
      }
    },

    async fetchFavoriteProducts() {
      try {
        this.isLoading = true;
        this.errorMessage = '';

        const token = ApplicationSettings.getString('token');
        const response = await Http.request({
          url: 'https://dev-api.wnsansgluten.ca/Clients/favoris',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const responseData = response.content.toJSON();
        if (Array.isArray(responseData)) {
          this.products = responseData.map(product => ({
            ...product,
            isFavorite: true,
            price: parseFloat(product.price || 0),
            image: this.getImageUrl(product)
          }));
        } else if (responseData.message === "Unauthorized") {
          throw new Error('Unauthorized');
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching favorite products:', error);
        this.errorMessage = error.message === 'Unauthorized'
          ? "Vous n'êtes pas autorisé à accéder à cette ressource."
          : "Erreur lors de la récupération des produits favoris";
      } finally {
        this.isLoading = false;
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
  background-color: #f5f5f5;
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

.error-message {
  color: red;
  text-align: center;
  font-size: 14;
  margin: 20;
}

.empty-state {
  text-align: center;
  margin: 20;
}

.empty-message {
  color: #666;
  font-size: 16;
}

ActivityIndicator {
  width: 20;
  height: 20;
  color: #FF4A4C;
}
</style>
