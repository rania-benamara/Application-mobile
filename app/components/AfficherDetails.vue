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
<style scoped>
.boutton-retour{
    color:#E95322;
    font-size:28px;
    top: 2px;
    left: 3px;
    }
.product-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 30px; /* Réduction de l'espacement entre l'image et le titre */
}
.pdetails-titre {
    font-family: Inter;
    font-size: 25px;
    font-weight: 500;
    line-height: 24.2px;
    text-align: left;
    margin-left: 30px;
    color: #000000;
    margin: 32px 0; /* Ajoute plus d'espace sous l'image */
}
.pdetails-description {
  font-size: 14px;
  text-align: left;
  margin: 0 16px 24px 16px; /* Ajoute de l'espace au-dessus et au-dessous de la description */
}
.counter-container {
  margin: 24px 0; /* Espacement autour du compteur */
  display: flex;
  justify-content: flex-end; /* Aligne à droite */
  align-items: center; /* Assure que les éléments sont bien alignés verticalement */
}
.btn-counter {
  font-size: 14px;
  color: white; /* Texte blanc */
  background-color: #1a1a6a; /* Même couleur que "Ajouter au panier" */
  border-radius: 5px;
  padding: 5px; /* Taille de padding réduite */
  width: 80px;
  height: 80px;
  text-align: center; /* Centrer le texte */
  margin-left: 10px; /* Ajoute de l'espace entre les boutons */
}

.counter-display {
  font-size: 20px;
  margin: 0 16px;
  text-align: center;
}
.pdetail-ajouter {
  background-color: #1a1a6a;
  color: #ffffff;
  border-radius: 8px;
  font-size: 14px; /* Taille du bouton réduite */
  font-weight: bold;
  text-align: center;
  padding: 8px; /* Taille de padding réduite pour ajuster le bouton */
  width: 60%; /* Réduit la largeur du bouton */
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
}
.pdetail-ajouter-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-heart {
  margin-left: 10px; /* Rapproche le cœur du bouton "Ajouter au panier" */
  vertical-align: middle;
}
</style>
