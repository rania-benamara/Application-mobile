<template>
  <Page>
    <GridLayout rows="*, auto">
      <ScrollView row="0">
        <StackLayout>
          <!-- Offres Spéciales Section -->
          <GridLayout columns="*, auto" class="offer-grid">
            <StackLayout class="offer-details" col="0">
              <Label text="Offres Spéciales" class="offer-title" />
              <Label class="offer-subtitle">
                <FormattedString>
                  <Span text="Obtenez une Offre Spéciale Jusqu'à " />
                  <Span text="40%" fontWeight="bold" fontSize="30" />
                </FormattedString>
              </Label>
              <Button text="voir les offres" class="offer-button" />
            </StackLayout>
            <StackLayout class="image-container" col="1">
              <Image src="~/images/1.png" class="offer-image" />
            </StackLayout>
          </GridLayout>

          <!-- Catégories Section -->
          <Label text="Catégories" class="category-title" />

          <!-- Première Grille : 1ère Ligne avec 4 Colonnes -->
          <GridLayout columns="*,*,*,*" rows="auto" class="offer-grid2">
            <StackLayout class="categorie1" row="0" col="0">
              <Image src="~/images/1.png" class="offer-image2" />
              <Label text="Cookies" class="category-label" />
            </StackLayout>
            <StackLayout class="categorie2" row="0" col="1">
              <Image src="~/images/2.png" class="offer-image2" />
              <Label text="Gâteaux personnalisés" class="category-label" />
            </StackLayout>
            <StackLayout class="categorie3" row="0" col="2">
              <Image src="~/images/3.png" class="offer-image2" />
              <Label text="Produits sans gluten" class="category-label" />
            </StackLayout>
            <StackLayout class="categorie4" row="0" col="3">
              <Image src="~/images/4.png" class="offer-image2" />
              <Label text=" Sans produits laitiers" class="category-label" />
            </StackLayout>
          </GridLayout>

          <!-- Deuxième Grille : Reste des éléments avec 4 Colonnes -->
          <GridLayout columns="*,*,*,*" rows="auto" class="offer-grid2">
            <StackLayout class="categorie5" row="0" col="0">
              <Image src="~/images/5.png" class="offer-image2" />
              <Label text="Salés" class="category-label" />
            </StackLayout>
            <StackLayout class="categorie6" row="0" col="1">
              <Image src="~/images/6.png" class="offer-image2" />
              <Label text="Pain" class="category-label" />
            </StackLayout>
            <StackLayout class="categorie7" row="0" col="2">
              <Image src="~/images/7.png" class="offer-image2" />
              <Label text="Jus" class="category-label" />
            </StackLayout>
            <StackLayout class="categorie8" row="0" col="3">
              <Image src="~/images/8.png" class="offer-image2" />
              <Label text="Russes" class="category-label" />
            </StackLayout>
          </GridLayout>

          <Button text="Tous les Produits" class="all-products-button"/>
        </StackLayout>
      </ScrollView>

      <!-- LogoBarre as navbar at the bottom -->
      <LogoBarre row="1" />
    </GridLayout>
  </Page>
</template>

<script>
import LogoBarre from './LogoBarre.vue';

export default {
  name: 'Accueil',
  components: {
    LogoBarre
  },
  mounted() {
    console.log('Accueil component mounted');
  }
};
</script>

<style scoped>
.offer-grid {
  margin: 20px;
  height: 600px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.offer-details {
  padding: 20px;
  background-color: #1C1D534D;
  height: 600px;
  border-radius: 10px;
}
.offer-title {
  width: 130;
  height: 35;
  padding: 10px;
  font-size: 15px;
  border-radius: 20;
  background-color: white;
  color: black;
  margin-bottom: 40px;
  margin-top: 40px;
  horizontal-align: left;
}
.image-container {
  background-color: #1C1D534D;
}
.offer-subtitle, .offer-discount {
  margin-top: 200px;
  margin-bottom: 20px;
  font-size: 16px;
  margin-left: 40px;
  color: black;
  word-wrap: break-word;
  white-space: normal;
  width: 100%;
}
.offer-button {
  text-transform: none;
  width: 130;
  height: 40;
  padding: 10px;
  font-size: 15px;
  border-radius: 20;
  background-color: #1C1D53;
  color: white;
  margin-top: 10px;
  horizontal-align: left;
  margin-left: 66px;
}
.offer-image {
  width: 420px;
  height: 600px;
  border-top-left-radius: 200px;
  border-bottom-left-radius: 200px;
  object-fit: cover;
  background-color: #ddd;
}
.category-title {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #1C1D53;
  font-family: Poppins;
  line-height: 46.8px;
  letter-spacing: -0.01em;
  text-align: left;
  margin-left: 20px;
}
.all-products-button {
  text-transform: none;
  margin-top: 40;
  background-color: #3f51b5;
  color: white;
  text-align: center;
  width: 150;
  height: 40;
  padding: 10px;
  font-size: 15px;
  border-radius: 20;
}
.offer-grid2 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px 0;
}
.categorie1, .categorie2, .categorie3, .categorie4, .categorie5, .categorie6, .categorie7, .categorie8 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid black !important;
}
.offer-image2 {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 40px;
  margin-bottom: 10px;
  border: 3px solid black !important;
}
.category-label {
  font-size: 14px;
  text-align: center;
  color: #333;
  word-wrap: break-word;
  white-space: normal;
  width: 100%;
}
</style>
