<template>
  <Page actionBarHidden="true">
    <GridLayout rows="*, auto" columns="*, *, *, *, *" height="100%">
      <!-- Contenu principal avec le compteur de quantité et le détail du produit -->
      <ScrollView row="0" columnSpan="5">
        <StackLayout>
          <Label text="<" class="boutton-retour" @tap="" />

          <!-- Image du produit -->
          <Image src="~/images/photoDetail.png" class="product-image" />

          <!-- Titre du produit -->
          <Label text="Muffin Bleuets" class="pdetails-titre" />

          <!-- Description du produit -->
          <Label
            text="Ingrédients : Farine de riz blanc, Fécule de pommes de terre, Fécule de tapioca, Farine de sorgho entier, Farine de riz brun entier, Farine de quinoa"
            textWrap="true"
            class="pdetails-description"
          />

          <!-- Compteur de quantité -->
          <GridLayout
            columns="auto, *, auto"
            rows="auto"
            horizontalAlignment="center"
            verticalAlignment="center"
            class="counter-container">

            <Button
              text="-"
              @tap="decrement"
              class="btn-counter"
              col="0"
            />

            <Label
              :text="quantity.toString()"
              class="counter-display"
              col="1"
              horizontalAlignment="center"
            />

            <Button
              text="+"
              @tap="increment"
              class="btn-counter"
              col="2"
            />
          </GridLayout>

          <!-- Boutons Ajouter au panier et Favoris -->
          <GridLayout columns="*, auto" rows="auto" class="button-container">
            <Button
              text="Ajouter au panier"
              class="pdetail-ajouter"
              @tap="addToCart"
              col="0"
            />
            <Image
              :src="isFavorite ? '~/images/favoris-rempli.png' : '~/images/favoris.png'"
              class="heart-icon"
              @tap="toggleFavorite"
              col="1"
            />
          </GridLayout>
        </StackLayout>
      </ScrollView>

      <!-- TabView à la position désirée -->
      <TabView androidTabsPosition="bottom" row="1" columnSpan="5" class="custom-tabview">
        <TabViewItem title="Acceuil" iconSource="~/images/acceuil.png">
          <StackLayout orientation="horizontal">
            <!-- Contenu Acceuil -->
          </StackLayout>
        </TabViewItem>

        <TabViewItem title="Explorer" iconSource="~/images/chercher.png">
          <StackLayout orientation="horizontal">
            <!-- Contenu Explorer -->
          </StackLayout>
        </TabViewItem>

        <TabViewItem title="Panier" iconSource="~/images/panier.png">
          <StackLayout orientation="horizontal">
            <!-- Contenu Panier -->
          </StackLayout>
        </TabViewItem>

        <TabViewItem title="Favoris" iconSource="~/images/favoris.png">
          <StackLayout orientation="horizontal">
            <!-- Contenu Favoris -->
          </StackLayout>
        </TabViewItem>

        <TabViewItem title="Menu" iconSource="~/images/menu.png">
          <StackLayout orientation="horizontal">
            <!-- Contenu Menu -->
          </StackLayout>
        </TabViewItem>
      </TabView>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1, // Quantité initiale
      isFavorite: false, // État du favori
    };
  },
  methods: {
    increment() {
      this.quantity++; // Incrémentation
    },
    decrement() {
      if (this.quantity > 0) {
        this.quantity--; // Décrémentation si > 0
      }
    },
    addToCart() {
      // Code d'ajout au panier
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite; // Changement d'état du favori
    },
  },
};
</script>
