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
            <Label text="Offres Spéciales" col="0" row="1" colSpan="2" class="page-title" />
          </GridLayout>

          <!-- Loading Indicator -->
          <ActivityIndicator v-if="isLoading"
                           :busy="true"
                           row="1"
                           class="activity-indicator" />

          <!-- Connection Error -->
          <StackLayout v-if="!isServerConnected" row="1" class="error-container">
            <Label text="Impossible de se connecter au serveur" class="error-message" />
            <Label text="Vérifiez votre connexion internet" class="error-subtitle" />
            <Button text="Réessayer"
                    @tap="retryConnection"
                    class="retry-button" />
          </StackLayout>

          <!-- Error Message -->
          <StackLayout v-if="errorMessage && isServerConnected" row="1" class="error-container">
            <Label :text="errorMessage" class="error-message" />
            <Button text="Réessayer"
                    @tap="fetchSaleProducts"
                    class="retry-button"
                    v-if="errorMessage !== 'Aucune offre disponible pour le moment'" />
          </StackLayout>

          <!-- Products Grid -->
          <ScrollView v-if="!isLoading && !errorMessage && isServerConnected"
                     row="1"
                     orientation="vertical">
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
                      <!-- Price Display -->
                      <StackLayout class="price-container">
                        <Label :text="formatPrice(product.regular_price)" class="original-price"/>
                        <Label :text="formatPrice(product.sale_price)" class="sale-price"/>
                        <Label :text="`-${getDiscountPercentage(product)}%`"
                               class="discount-badge"
                               v-if="getDiscountPercentage(product) > 0"/>
                      </StackLayout>
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
                      <!-- Price Display -->
                      <StackLayout class="price-container">
                        <Label :text="formatPrice(product.regular_price)" class="original-price"/>
                        <Label :text="formatPrice(product.sale_price)" class="sale-price"/>
                        <Label :text="`-${getDiscountPercentage(product)}%`"
                               class="discount-badge"
                               v-if="getDiscountPercentage(product) > 0"/>
                      </StackLayout>
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

// For Android emulator
const API_URL = 'https://dev-api.wnsansgluten.ca/Product';
// For iOS simulator
// const API_URL = 'http://localhost:3000/Product';

export default {
    name: 'Offres',

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
            defaultImage: "https://wnsansgluten.ca/wp-content/uploads/2023/07/placeholder.jpg",
            imageLoadErrors: new Set(),
            isServerConnected: false
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

    async created() {
        await this.checkServerConnection();
        if (this.isServerConnected) {
            this.fetchSaleProducts();
        }
    },

    methods: {
        async checkServerConnection() {
            try {
                console.log('Testing server connection...');
                const response = await Http.request({
                    url: `${API_URL}/test`,
                    method: "GET",
                    timeout: 5000 // 5 seconds timeout
                });

                console.log('Server test response:', response.content.toString());
                this.isServerConnected = true;
                return true;
            } catch (error) {
                console.error('Server connection test failed:', error);
                this.errorMessage = "Impossible de se connecter au serveur. Vérifiez votre connexion.";
                this.isServerConnected = false;
                return false;
            }
        },

        retryConnection() {
            this.errorMessage = '';
            this.checkServerConnection().then(isConnected => {
                if (isConnected) {
                    this.fetchSaleProducts();
                }
            });
        },

        async fetchSaleProducts() {
            if (!this.isServerConnected) {
                console.log('Attempting to reconnect to server...');
                const isConnected = await this.checkServerConnection();
                if (!isConnected) {
                    return;
                }
            }

            try {
                this.isLoading = true;
                this.errorMessage = '';

                console.log('Fetching sale products...');

                const response = await Http.request({
                    url: `${API_URL}/sales`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    timeout: 10000
                });

                const responseText = response.content.toString();
                console.log('Raw response:', responseText);

                let data;
                try {
                    data = JSON.parse(responseText);
                } catch (parseError) {
                    console.error('JSON Parse Error:', parseError);
                    throw new Error('Réponse invalide du serveur');
                }

                if (!data.success) {
                    throw new Error(data.error || 'Échec de la récupération des produits');
                }

                const products = data.products || [];
                console.log(`Found ${products.length} products on sale`);

                this.products = products.map(product => {
                    let imageUrl = product.image;
                    if (imageUrl && typeof imageUrl === 'string') {
                        imageUrl = imageUrl.split('?')[0].replace(/-\d+x\d+\.(jpg|jpeg|png|gif)/, '.$1');
                    }

                    return {
                        id: product.id,
                        name: product.name,
                        category: this.getFirstCategory(product.categories),
                        regular_price: parseFloat(product.regular_price || 0),
                        sale_price: parseFloat(product.sale_price || 0),
                        rating: 4.5,
                        image: imageUrl || this.defaultImage,
                        isFavorite: false,
                        description: product.description || "Aucune description disponible",
                        quantity: 1
                    };
                });

                if (this.products.length === 0) {
                    this.errorMessage = "Aucune offre disponible pour le moment";
                }

            } catch (error) {
                console.error('Error fetching sale products:', error);
                this.errorMessage = error.message || "Erreur lors du chargement des offres";
                this.products = [];
            } finally {
                this.isLoading = false;
            }
        },

        getDiscountPercentage(product) {
            const regular = parseFloat(product.regular_price);
            const sale = parseFloat(product.sale_price);
            if (regular && sale && regular > sale) {
                return Math.round(((regular - sale) / regular) * 100);
            }
            return 0;
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
            return 'Sans catégorie';
        },

        getProductCategory(product) {
            return product.category || 'Sans catégorie';
        },

        formatPrice(price) {
            return `${parseFloat(price).toFixed(2)}$`;
        },

        onImageError(event, index) {
            console.log(`Image loading error for product ${index}`);
            if (this.products[index]) {
                this.products[index].image = this.defaultImage;
                this.imageLoadErrors.add(index);
                this.products = [...this.products];
            }
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
                    productPrice: product.sale_price,
                    regularPrice: product.regular_price
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

       // ... continuing the script section ...

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

       .page-title {
           font-size: 24;
           font-weight: bold;
           margin: 10;
           color: #1A237E;
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

       .price-container {
           background-color: #FFE8E3;
           padding: 5 7;
           border-radius: 0 10 0 10;
           horizontal-align: right;
           vertical-align: top;
       }

       .original-price {
           font-size: 14;
           text-decoration: line-through;
           color: #ff0000;
           text-align: right;
       }

       .sale-price {
           font-size: 16;
           font-weight: bold;
           color: #564146;
           text-align: right;
       }

       .discount-badge {
           background-color: #FF4A4C;
           color: white;
           font-size: 12;
           font-weight: bold;
           padding: 2 6;
           border-radius: 10;
           margin-top: 2;
           text-align: center;
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

       .error-container {
           padding: 20;
           text-align: center;
       }

       .error-message {
           color: #FF4A4C;
           font-size: 16;
           font-weight: bold;
           text-align: center;
           margin-bottom: 8;
       }

       .error-subtitle {
           color: #666666;
           font-size: 14;
           text-align: center;
           margin-bottom: 16;
       }

       .retry-button {
           background-color: #1A237E;
           color: white;
           padding: 10 20;
           border-radius: 20;
           width: 150;
       }

       .activity-indicator {
           color: #FF4A4C;
           margin: 20;
       }

       .loading-placeholder {
           background-color: #f0f0f0;
           border-radius: 10 10 0 0;
       }

       .image-error {
           background-color: #ffecec;
           border-radius: 10 10 0 0;
       }

       .no-results {
           padding: 20;
           text-align: center;
       }

       .no-results-message {
           color: #666666;
           font-size: 16;
           text-align: center;
       }

       .drawer-content {
           background-color: #1C1D53;
       }

       .main-content {
           padding: 0;
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
       </style>

