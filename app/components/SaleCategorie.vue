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
 textWrap="true" />
 <Label :text="getProductCategory(product)"
 class="product-category" />
 </StackLayout>

 <!-- Actions Container -->
 <GridLayout columns="auto, auto, *, auto"
 class="product-actions"
 height="40">
 <Image :src="product.isFavorite ? '~/images/favoriteIconFilled.png' : '~/images/favoriteIcon.png'"
 :class="{ 'favorite-icon-red': product.isFavorite }"
 col="0"
 class="action-icon"
 @tap="toggleFavorite(product, index * 2)"/>
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
 textWrap="true" />
 <Label :text="getProductCategory(product)"
 class="product-category" />
 </StackLayout>

 <!-- Actions Container -->
 <GridLayout columns="auto, auto, *, auto"
 class="product-actions"
 height="40">
 <Image :src="product.isFavorite ? '~/images/favoriteIconFilled.png' : '~/images/favoriteIcon.png'"
 :class="{ 'favorite-icon-red': product.isFavorite }"
 col="0"
 class="action-icon"
 @tap="toggleFavorite(product, index * 2 + 1)"/>
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
import { Http, ApplicationSettings, Frame, alert } from '@nativescript/core';
import Menu from './Menu.vue';
import NavBar from './LogoBarre.vue';
import AfficherDetails from './AfficherDetails.vue';

const API_URL = 'http://10.0.2.2:3000/Product';

export default {
 name: 'CategoryProducts',

 components: {
 Menu,
 NavBar,
 },

 props: {
 categoryName: {
 type: String,
 required: true
 },
 token: {
      type: String,
      default: () => ApplicationSettings.getString('userToken', '')
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
 };
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


 const response = await Http.request({
 url: `${API_URL}/category`,
 method: "POST",
 headers: { "Content-Type": "application/json" },
 content: JSON.stringify({ categoryName: this.categoryName })
 });

 const results = response.content.toJSON();


 this.products = results.map(product => ( {
 id: product.id,
 name: product.name,
 category: product.category || 'Sans catégorie',
 price: parseFloat(product.price || 0),
 rating: 4.5,
 image: product.guid || this.defaultImage,
 isFavorite: false,
 description: product.description || "Aucune description disponible",
 quantity: 1
 }));
 } catch (error) {
 this.errorMessage = "Erreur lors du chargement des produits";
 } finally {
 this.isLoading = false;
 }
 },
async toggleFavorite(product, index) {
  try {
    const isFavorite = !this.products[index].isFavorite;
    this.products[index].isFavorite = isFavorite;

    await Http.request({
      url: `http://10.0.2.2:3000/add-favoris`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`
      },
      content: JSON.stringify({ productId: product.id })
    });

    alert({
      title: "Succès",
      message: isFavorite ? `${product.name} ajouté aux favoris` : `${product.name} retiré des favoris`,
      okButtonText: "OK"
    });
  } catch (error) {
    alert({
      title: "Erreur",
      message: "Erreur lors de la mise à jour des favoris",
      okButtonText: "OK"
    });
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
            alert({ title: "Succès", message: error.message || "Une erreur inattendue s'est produite", okButtonText: "OK"
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
addToCart(product) {
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
},
 async toggleFavorite(product, index) {
 try {
 const isFavorite = !this.products[index].isFavorite;
 this.products[index].isFavorite = isFavorite;

 const response = await Http.request({
 url: `http://10.0.2.2:3000/add-favoris`,
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 "Authorization": `Bearer ${this.$store.state.token}`
 },
 content: JSON.stringify({ productId: product.id })
 });

 const result = response.content.toJSON();
 console.log(result.message);

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
 this.$refs.drawer.nativeView?.showDrawer();
    },

    goBack() {
      Frame.topmost().goBack();
    },

    getImageUrl(product) {
 return product.image || this.defaultImage;
    },

    formatPrice(price) {
      return `${parseFloat(price).toFixed(2)}$`;
    },

    getProductCategory(product) {
      return product.category || 'Sans catégorie';
    },

    onImageError(event, index) {
      if (!this.imageLoadErrors.has(index)) {
        this.imageLoadErrors.add(index);
        this.products[index].image = this.defaultImage;
 }
 },

 onMenuTap(item) {
 console.log(`Menu item tapped: ${item}`);
 // Handle menu item tap
 }
 }
};
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

.favorite-icon-red {
  filter: invert(29%) sepia(96%) saturate(7485%) hue-rotate(357deg) brightness(100%) contrast(104%);
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
