<template>
  <Page>
    <GridLayout rows="*, auto">
      <ScrollView row="0">
        <StackLayout class="page-content">
          <!-- ActionBar avec bouton de retour -->
          <ActionBar title="Mon Panier" class="action-bar">
            <NavigationButton icon="~/images/img.png" @tap="loginlink" ios.position="left" class="back-image" />
          </ActionBar>

          <!-- Liste des produits favoris -->
          <StackLayout class="offers-content">
            <StackLayout v-for="(product, index) in favoriteProducts" :key="index" class="product-list">
              <GridLayout columns="auto, *" rows="auto, auto, auto" class="product-item">
                <Image :src="product.image" class="product-image" col="0" rowSpan="3" />
                <Label :text="product.name" class="product-name" col="1" row="0" />
                <Label :text="product.category" class="product-category" col="1" row="1" />
                <Label :text="product.originalPrice" class="original-price" col="1" row="2" />
                <StackLayout class="offer-subtitle" col="1" row="2" orientation="horizontal">
                  <Image src="~/images/img_1.png" class="qt-image" />
                  <TextField class="input-field" />
                  <Image src="~/images/img_2.png" class="qtt-image" />
                </StackLayout>
              </GridLayout>
            </StackLayout>
          </StackLayout>

          <!-- Section des champs sous-total, frais, etc. -->
          <StackLayout class="summary-section">
            <!-- Champ commentaire avec bouton -->
            <GridLayout columns="*, auto" class="comment-generale">
              <StackLayout class="comment-section" col="0">
                <TextField hint=" Laisser un commentaire" class="comment" />
              </StackLayout>
              <StackLayout class="bouton-section" col="1">
                <Button text="Envoyer" class="bouton" />
              </StackLayout>
            </GridLayout>

            <!-- Sous-total, Frais de livraison, Frais de taxe, Coût total -->
            <GridLayout columns="*, auto" class="summary-item">
              <Label text="Sous-total" class="summary-label" />
              <Label text="$92.00" class="summary-value" />
            </GridLayout>
            <GridLayout columns="*, auto" class="summary-item">
              <Label text="Frais de livraison" class="summary-label" />
              <Label text="$0.00" class="summary-value" />
            </GridLayout>
            <GridLayout columns="*, auto" class="summary-item">
              <Label text="Coût des taxes" class="summary-label" />
              <Label text="$92.00" class="summary-value" />
            </GridLayout>

            <!-- Ligne en pointillés -->
            <GridLayout columns="*" class="dotted-line">
              <Label text="------------------------" class="dotted-line-label" />
            </GridLayout>

            <GridLayout columns="*, auto" class="summary-item">
              <Label text="Coût total" class="summary-label" />
              <Label text="$92.00" class="summary-value" />
            </GridLayout>

            <!-- Bouton Passer à la caisse -->
            <Button text="Passer à la caisse" class="checkout-button" />
          </StackLayout>
        </StackLayout>
      </ScrollView>

      <!-- LogoBarre as navbar at the bottom -->
      <LogoBarre row="1" />
    </GridLayout>
  </Page>
</template>

<script>
import Login from './Login';
import LogoBarre from './LogoBarre.vue';

export default {
  name: 'Panier',
  components: {
    LogoBarre
  },
  data() {
    return {
      favoriteProducts: [
        { name: "American Cookies", category: "Cookies", originalPrice: "$20.00", image: "~/images/4.png" },
        { name: "American Cookies", category: "Cookies", originalPrice: "$20.00", image: "~/images/7.png" },
        { name: "American Cookies", category: "Cookies", originalPrice: "$20.00", image: "~/images/7.png" },
        { name: "American Cookies", category: "Cookies", originalPrice: "$20.00", image: "~/images/7.png" },
        { name: "American Cookies", category: "Cookies", originalPrice: "$20.00", image: "~/images/7.png" },
        { name: "American Cookies", category: "Cookies", originalPrice: "$20.00", image: "~/images/7.png" },
        { name: "American Cookies", category: "Cookies", originalPrice: "$20.00", image: "~/images/7.png" }
      ]
    };
  },
  methods: {
    loginlink() {
      this.$navigateTo(Login);
    }
  }
};
</script>

<style scoped>
.qt-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 20px;
  background-color: #ddd;
  margin-left: 200;
}
.qtt-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 20px;
  background-color: #ddd;
  margin-left: 5;
}
.input-field {
  font-size: 14px;
  border-color: #808080;
  border-radius: 20px;
  border: 3px solid black;
  margin-top: 5px;
  margin-left: 10px;
}
.action-bar {
  color: black;
}
.page {
  background-color: white;
  height: 100%;
  width: 100%;
}
.offers-content {
  padding: 2px;
  margin-top: 40px;
  margin-left: 30px;
}
.product-list {
  margin-bottom: 20px;
}
.product-image {
  width: 170px;
  height: 170px;
  border-radius: 40px;
  margin-right: 18px;
}
.product-name {
  font-size: 18px;
  font-weight: bold;
  color: black;
}
.product-category {
  font-size: 14px;
  color: gray;
}
.original-price {
  font-size: 16px;
  color: black;
}
.comment-section {
  height: 50;
  width: 700;
  margin-left: 20;
}
.comment {
  background-color: #F4F3F3;
  border-radius: 10px;
  height: 50;
  width: 700;
  border-top-left-radius: 200px;
  border-bottom-left-radius: 200px;
}
.bouton {
  background-color: #6F2E00;
  color: white;
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  border-top-left-radius: 200px;
  border-bottom-left-radius: 200px;
  border-top-right-radius: 200px;
  border-bottom-right-radius: 200px;
  height: 70;
  text-transform: none;
  width: 120;
}
.bouton-section {
  height: 50;
  background-color: #F4F3F3;
  margin-right: 10;
}
.comment-generale {
  background-color: white;
}
.summary-item {
  margin-left: 50px;
  height: 30;
}
.summary-label {
  font-size: 16px;
  color: black;
  font-weight: bold;
  text-align: left;
}
.summary-value {
  font-size: 16px;
  color: black;
  font-weight: bold;
  text-align: right;
  margin-right: 40px;
}
.dotted-line {
  margin: 15px 0;
  border-top: 1px dotted gray;
}
.dotted-line-label {
  text-align: center;
  color: gray;
  margin: 0;
}
.checkout-button {
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 20;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  width: 200;
  margin-bottom: 30;
  text-transform: none;
}
.comment-input {
  padding: 10px;
  font-size: 14px;
  background-color: #e0e0e0;
  border-radius: 5px;
  width: 100%;
  border: none;
  box-sizing: border-box;
}
</style>
