<template>
  <Page>
    <ActionBar flat="true">
      <StackLayout orientation="horizontal" class="action-bar-layout">
        <Image src="~/images/back_icone.png" class="back-icon" @tap="goBack" />
        <Label text="Salé" class="category-title" />
      </StackLayout>
    </ActionBar>

    <StackLayout class="top-container">
      <!-- Back button icon at the top -->
      <Image src="~/images/back_icone.png" class="back-icon-top" @tap="goBack" />

      <ScrollView>
        <StackLayout class="container">
          <StackLayout v-for="(product, index) in products" :key="index" class="product-item">
            <GridLayout columns="auto, *" rows="auto" class="product-layout">
              <Image :src="product.image" stretch="aspectFill" class="product-image" col="0" />
              <StackLayout class="product-info" col="1">
                <Label :text="product.name" class="product-name" />
                <Label :text="product.category" class="product-category" />
                <Label :text="formatPrice(product.price)" class="product-price" />
                <Label :text="product.rating.toFixed(1)" class="product-rating" />
              </StackLayout>
            </GridLayout>
            <GridLayout rows="auto" columns="auto, *, auto" class="product-details">
              <Image :src="product.isFavorite ? '~/images/favoriteIcon.png' : '~/images/favoriteIcon.png'"
                col="0" class="favorite-icon" @tap="toggleFavorite(index)" />
            </GridLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
export default {
  name: 'ProductFav',
  data() {
    return {
      products: [
        { name: "Chocolate Chip", category: "Cookies", price: 19.99, rating: 4.9, image: "~/images/cookie1.png", isFavorite: false },
        { name: "Oatmeal Raisin", category: "Cookies", price: 29.99, rating: 3.7, image: "~/images/cookie2.png", isFavorite: true },
        { name: "Peanut Butter", category: "Cookies", price: 15.99, rating: 5.0, image: "~/images/cookie1.png", isFavorite: false },
        { name: "Sugar Cookie", category: "Cookies", price: 24.99, rating: 4.2, image: "~/images/cookie2.png", isFavorite: true },
      ]
    };
  },
  methods: {
    formatPrice(price) {
      return `$${price.toFixed(2)}`;
    },
    toggleFavorite(index) {
      this.products[index].isFavorite = !this.products[index].isFavorite;
    },
    goBack() {
      this.$navigateBack();
    }
  }
}
</script>

<style scoped>
.action-bar-layout {
  padding: 10 16;
  background-color: #ffffff;
  align-items: center;
}

.back-icon {
  width: 24;
  height: 24;
  margin: 5 0;
}

.back-icon-top {
  width: 50;
  height: 50;
  margin: 20 auto;
  align-self: center;
}

.category-title {
  font-size: 24;
  font-weight: 700;
  margin-left: 10;
  color: #000000;
}

.top-container {
  margin-top: 20;
}

.container {
  padding: 10;
}

.product-item {
  margin: 5;
  background-color: #ffffff;
  border-radius: 10;
  padding: 10;
}

.product-layout {
  columns: auto, *;
  rows: auto;
}

.product-image {
  width: 80;
  height: 80;
  border-radius: 10;
  margin-left: 10;
  object-fit: cover;
}

.product-info {
  justify-content: center;
  margin-left: 10;
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

.product-rating {
  font-size: 14;
  color: #000000;
  font-weight: 700;
  margin-top: 5;
}

.product-details {
  padding: 10;
}

.favorite-icon {
  width: 24;
  height: 24;
  vertical-align: center;
}
</style>
