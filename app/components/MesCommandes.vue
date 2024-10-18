<!-- components/SaleCategorie.vue -->
<template>
  <Page backgroundColor="#1C1D53" actionBarHidden="true">
    <GridLayout rows="auto, auto, *">
      <StackLayout row="0" class="action-bar-layout">
        <GridLayout columns="auto, *" rows="auto">
          <Image src="~/images/gobackIcon.png" col="0" row="0" class="back-icon" @tap="goBack" />
          <Label text="Mes Commandes" col="1" row="0" class="category-title" />
        </GridLayout>
      </StackLayout>
      <StackLayout row="1" class="underline"></StackLayout>
      <ScrollView row="2">
        <StackLayout class="product-list">
          <GridLayout v-for="(product, index) in products" :key="index"
                      rows="auto, auto, auto, auto" columns="auto, *, auto"
                      class="product-item">
           <Image :src="product.image" row="0" col="0" rowSpan="4" class="product-image"/>
            <Label :text="product.name" row="0" col="1" class="product-name"/>
            <Label :text="product.date" row="1" col="1" class="product-date"/>
            <Label text="Produit expédié" row="2" col="1" class="product-status"/>
            <Button text="Laissez un avis" row="3" col="1" class="review-button" @tap="leaveReview(product)"/>
            <Label :text="formatPrice(product.price)" row="0" col="2" class="product-price"/>
            <Label :text="`${product.quantity} articles`" row="1" col="2" class="product-quantity"/>

          </GridLayout>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          name: "Muffin bleuets",
          price: 19.99,
          quantity: 2,
          date: "15 Mai 2023 à 14:30",
          image: "~/images/cookie2.png"
        },
        {
          name: "Cookies",
          price: 29.99,
          quantity: 1,
          date: "14 Mai 2023 à 10:15",
          image: "~/images/cookie1.png"
        },
        // Add more products as needed
      ]
    };
  },
  methods: {
    formatPrice(price) {
      return `$${price.toFixed(2)}`;
    },
    goBack() {
      this.$navigateBack();
    },
    leaveReview(product) {
      console.log(`Leave review for ${product.name}`);
      // Implement review functionality
    }
  }
}
</script>

<style scoped>
.action-bar-layout {
  padding: 10 16;
  background-color: #1C1D53;
}
.back-icon {
  width: 24;
  height: 24;
  vertical-align: middle;
  margin-right: 10;
}
.category-title {
  font-size: 20;
  font-weight: 700;
  color: #F8F8F8;
  vertical-align: middle;
}
.underline {
  height: 2;
  background-color: #FFD8C7;
  margin: 10 30 25 30;
}
.product-list {
  padding: 10;

}
.product-item {
  margin-bottom: 20;
  background-color: #1C1D53;
  border-radius: 10;
  padding: 10;
}
.product-image {
  width: 80;
  height: 80;
  border-radius: 10;
  margin-right: 10;
}
.product-name {
  font-size: 20;
  color: #FFFEFE;
  font-weight: 500;
}
.product-date {
  font-size: 13;
  color: #FFFEFE;
  font-weight: 300;
}
.product-status {
  font-size: 13;
  color: #E95322;
  margin-top:0;
  margin-bottom:3;
}
.review-button {
  font-size: 10;
  background-color: #FFDECF;
  color: #E95322;
  width: 100;
  height: 30;
  border-radius: 15;
  font-weight: 400;
  padding: 0;
  text-wrap: true;
  text-align: center;
  horizontal-align:left;
}
.product-quantity {
  font-size: 14;
  color: #FFFEFE;
  text-align: right;
  font-weight:300;
}
.product-price {
  font-size: 16;
  font-weight: 700;
  color: #E9AA22;
  text-align: right;
}
</style>
