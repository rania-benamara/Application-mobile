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

<style scoped>
/* Couleur utilisée */
.action-bar {
  background-color: #1A237E; /* Bleu foncé */
  color: #fff; /* Couleur de texte blanc */
}

.page {
  background-color: #fff; /* Fond blanc */
  height: 100%;
  width: 100%;
}

.offers-content {
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #1A237E; /* Bleu foncé */
  margin-bottom: 20px;
}

.product-list {
  margin-top: 10px;
}

.product-item {
  margin-bottom: 20px;
}

.product-image {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin-right: 18px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  color: #1A237E; /* Bleu foncé */
}

.product-category {
  font-size: 14px;
  color: #999; /* Gris */
  margin-top: 4px;
}

.product-pricing {
  margin-top: 5px;
  justify-content: space-between;
}

.original-price {
  font-size: 16px;
  text-decoration: line-through;
  color: #ff0000; /* Rouge */
  margin-right: 10px;
}

.current-price {
  font-size: 16px;
  font-weight: bold;
  color: #1A237E; /* Bleu foncé */
}
</style>
