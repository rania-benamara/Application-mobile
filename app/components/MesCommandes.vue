<!-- components/SaleCategorie.vue -->
<template>
  <Page backgroundColor="#1C1D53" actionBarHidden="true">
    <GridLayout rows="auto, *">
      <StackLayout row="0" class="action-bar-layout">
        <GridLayout columns="auto, *" rows="auto, auto">
          <Image src="~/images/gobackIcon.png" col="0" row="0" class="back-icon" @tap="goBack" />
          <Label text="Mes Commandes" col="0" row="1" colSpan="2" class="category-title" />
        </GridLayout>
      </StackLayout>
      <ScrollView row="1">
        <GridLayout columns="*, *" rows="auto" class="product-grid">
          <StackLayout v-for="(product, index) in products" :key="index"
                       :col="index % 2" :row="Math.floor(index / 2)"
                       class="product-item">
            <GridLayout rows="auto" columns="*">
              <Image :src="product.image" stretch="aspectFill" class="product-image"/>
              <Label :text="formatPrice(product.price)" class="product-price"/>
            </GridLayout>
            <StackLayout class="product-info">
              <Label :text="product.name" class="product-name"/>
              <Label :text="product.category" class="product-category"/>
            </StackLayout>
            <GridLayout rows="auto" columns="auto, *, auto" class="product-details">
              <Image :src="product.isFavorite ? '~/images/favoriteIcon.png' : '~/images/favoriteIcon.png'"
                     col="0" class="favorite-icon" @tap="toggleFavorite(index)"/>
              <Label :text="product.rating.toFixed(1)" col="2" class="product-rating"/>
            </GridLayout>
          </StackLayout>
        </GridLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
// ... (script remains the same)
</script>

<style scoped>
.action-bar-layout {
  padding: 10 16;
  background-color: #1C1D53;
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
  color: #FFFFFF;
}
.product-grid {
  padding: 10;
  background-color: #1C1D53;
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
  text-align: center;
}
.product-category {
  font-size: 14;
  color: #ACA9A7;
  font-weight: 400;
  margin-top: 2;
  text-align: center;
}
.product-details {
  padding: 10;
}
.favorite-icon {
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
