<template>
  <Page actionBarHidden="true">
    <RadSideDrawer ref="drawer" drawerLocation="Right">
      <GridLayout ~drawerContent>
        <Menu @menuTap="onMenuTap"/>
      </GridLayout>

      <StackLayout ~mainContent>
        <GridLayout rows="*, auto">
          <ScrollView row="0">
            <StackLayout>
              <!-- Offres Spéciales Section -->
              <GridLayout columns="auto, *" class="offer-grid">
                <StackLayout class="offer-details" col="0">
                  <Label text="Offres Spéciales" class="offer-title" />
                  <Label class="offer-subtitle">
                    <FormattedString>
                      <Span text="Obtenez une Offre Spéciale" />
                    </FormattedString>
                  </Label>
                  <Label class="offer-discount" text="Jusqu'à 40%" />
                  <Button text="voir les offres" class="offer-button" @tap="goToOffres" />
                </StackLayout>
                <StackLayout class="image-container" col="1">
                  <Image src="~/images/1.png" class="offer-image" @tap="goToOffres" />
                </StackLayout>
              </GridLayout>

              <!-- Catégories Section -->
              <Label text="Catégories" class="category-title" />

              <!-- First Row Categories -->
              <GridLayout columns="*,*,*,*" rows="auto" class="offer-grid2">
                <StackLayout class="categorie1" row="0" col="0" @tap="goToCategory('Cookies')">
                  <Image src="~/images/1.png" class="offer-image2" />
                  <Label text="Cookies" class="category-label" />
                </StackLayout>
                <StackLayout class="categorie2" row="0" col="1" @tap="goToCommand">
                  <Image src="~/images/2.png" class="offer-image2" />
                  <Label text="Gâteaux personnalisés" class="category-label" />
                </StackLayout>
                <StackLayout class="categorie3" row="0" col="2" @tap="goToCategory('Produits sans gluten')">
                  <Image src="~/images/3.png" class="offer-image2" />
                  <Label text="Produits sans gluten" class="category-label" />
                </StackLayout>
                <StackLayout class="categorie4" row="0" col="3" @tap="goToCategory('Sans produits laitiers')">
                  <Image src="~/images/4.png" class="offer-image2" />
                  <Label text="Sans produits laitiers" class="category-label" />
                </StackLayout>
              </GridLayout>

              <!-- Second Row Categories -->
              <GridLayout columns="*,*,*,*" rows="auto" class="offer-grid2">
                <StackLayout class="categorie5" row="0" col="0" @tap="goToCategory('Salés')">
                  <Image src="~/images/5.png" class="offer-image2" />
                  <Label text="Salés" class="category-label" />
                </StackLayout>
                <StackLayout class="categorie6" row="0" col="1" @tap="goToCategory('Pain')">
                  <Image src="~/images/6.png" class="offer-image2" />
                  <Label text="Pain" class="category-label" />
                </StackLayout>
                <StackLayout class="categorie7" row="0" col="2" @tap="goToCategory('Jus')">
                  <Image src="~/images/7.png" class="offer-image2" />
                  <Label text="Jus" class="category-label" />
                </StackLayout>
                <StackLayout class="categorie8" row="0" col="3" @tap="goToCategory('Russes')">
                  <Image src="~/images/8.png" class="offer-image2" />
                  <Label text="Russes" class="category-label" />
                </StackLayout>
              </GridLayout>

              <Button text="Tous les Produits" class="all-products-button" @tap="goToProduits" />
            </StackLayout>
          </ScrollView>
          <NavBar row="1" @menuTap="openDrawer" />
        </GridLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import { alert } from '@nativescript/core';
import Menu from './Menu.vue';
import NavBar from './LogoBarre.vue';
import AllProducts from './AllProducts.vue';

import MesCommandes from './MesCommandes.vue';
import Profile from './Profile.vue';
import Livraison from './Livraison.vue';
import NousContacter from './NousContacter.vue';
import Parametre from './Parametre.vue';
import Login from './Login.vue';
import Offres from './Offres.vue';
import SaleCategorie from './SaleCategorie.vue';
import CommanedPersonaliser from './CommanedPersonaliser.vue';

export default {
  name: 'Accueil',

  components: {
    Menu,
    NavBar
  },

  data() {
    return {
      isDrawerOpen: false
    }
  },

  methods: {
    goToCategory(categoryName) {
      try {
        console.log(`Navigating to category: ${categoryName}`);
        this.$navigateTo(SaleCategorie, {
          props: {
            categoryName: categoryName
          },
          transition: {
            name: "fade"
          }
        });
      } catch (error) {
        console.error(`Error navigating to ${categoryName} category:`, error);
        alert({
          title: "Erreur",
          message: "Une erreur est survenue lors de la navigation",
          okButtonText: "OK"
        });
      }
    },

    openDrawer() {
      if (this.$refs.drawer?.nativeView) {
        this.$refs.drawer.nativeView.showDrawer();
      }
    },

    onMenuTap(item) {
      if (this.$refs.drawer?.nativeView) {
        this.$refs.drawer.nativeView.closeDrawer();
      }

      const navigationMap = {
        'Mes commandes': MesCommandes,
        'Mon profile': Profile,
        'Adresse de livraison': Livraison,
        'Nous contacter': NousContacter,
        'Paramètres': Parametre,
        'Se déconnecter': Login
      };

      const component = navigationMap[item];
      if (component) {
        this.$navigateTo(component, {
          transition: { name: "fade" }
        })
        .catch(error => console.error(`Navigation error: ${error}`));
      }
    },

    goToProduits() {
      this.$navigateTo(AllProducts, {
        transition: { name: "fade" }
      })
      .catch(error => console.error("Navigation to AllProducts failed:", error));
    },

    goToOffres() {
      this.$navigateTo(Offres, {
        transition: { name: "fade" }
      })
      .catch(error => console.error("Navigation to Offres failed:", error));
    },

    goToCommand() {
          this.$navigateTo(CommanedPersonaliser, {
            transition: { name: "fade" }
          })
          .catch(error => console.error("Navigation to Gateux personaliser failed:", error));
    }
  }
}
</script>

<style scoped>
.offer-grid {
  margin: 20px;
  height: 600px;
  align-items: center;
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
  margin-bottom: 10px;
  horizontal-align: left;
}

.image-container {
  background-color: #1C1D534D;
  margin-right: 0;
}

.offer-subtitle {
  margin-top: 30px;
  font-size: 16px;
  color: black;
  margin-bottom: 5px;
  text-align: left;
}

.offer-discount {
  font-size: 25px;
  font-weight: bold;
  color: black;
  margin-bottom: 25px;
  text-align: left;
}

.offer-button {
  text-transform: none;
  width: 300px;
  height: 150px;
  padding: 10px;
  font-size: 14px;
  border-radius: 70px;
  background-color: #1C1D53;
  color: white;
  margin-top: 28px;
  horizontal-align: left;
  margin-left: 70px;
}

.offer-image {
  width: 100%;
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

.offer-grid2 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px 0;
}

.categorie1, .categorie2, .categorie3, .categorie4,
.categorie5, .categorie6, .categorie7, .categorie8 {
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
</style>
