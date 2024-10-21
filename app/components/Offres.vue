<template>
  <Page class="page">
    <!-- ActionBar avec bouton de retour -->
    <ActionBar title="Offres" class="action-bar">
      <NavigationButton icon="~/images/back_icone.png" @tap="goBack" ios.position="left" />
    </ActionBar>

    <!-- Contenu principal avec la liste des offres -->
    <StackLayout class="offers-content">
      <Label text="Offres" class="title" />


      <!-- Liste des produits favoris -->
      <ListView for="product in favoriteProducts" class="product-list">
        <v-template>
          <GridLayout columns="auto, *" rows="auto, auto, auto" class="product-item">
            <!-- Image du produit -->
            <Image :src="product.image" class="product-image" col="0" rowSpan="3" />

            <!-- Nom du produit -->
            <Label :text="product.name" class="product-name" col="1" row="0" />

            <!-- Catégorie du produit -->
            <Label :text="product.category" class="product-category" col="1" row="1" />

            <!-- Prix original et prix réduit -->
            <StackLayout class="product-pricing" col="1" row="2" orientation="horizontal">
              <Label :text="product.originalPrice" class="original-price" />
              <Label :text="product.currentPrice" class="current-price" />
            </StackLayout>
          </GridLayout>
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      favoriteProducts: [
        {
          name: "American Cookies",
          category: "Cookies",
          originalPrice: "$20.00",
          currentPrice: "$8.00",
          image: "~/images/cookies.png"
        },
        {
          name: "Muffin bleuets",
          category: "Cup Cake",
          originalPrice: "$22.00",
          currentPrice: "$9.00",
          image: "~/images/muffin.png"
        },
        {
          name: "Forêt noire",
          category: "Donut",
          originalPrice: "$25.00",
          currentPrice: "$10.00",
          image: "~/images/foretNoire.png"
        },
        {
          name: "Cheesecake",
          category: "Donut",
          originalPrice: "$18.00",
          currentPrice: "$8.00",
          image: "~/images/cheesecake.png"
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$navigateBack();
    }
  }
};
</script>
