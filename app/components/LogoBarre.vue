<!-- NavBar.vue -->
<template>
  <GridLayout rows="auto" columns="*, *, *, *, *" class="bottom-nav">
    <Image src="~/images/accueil.png" col="0" class="nav-icon" @tap="navigateTo('Accueil')" />
    <Image src="~/images/chercher.png" col="1" class="nav-icon" @tap="navigateTo('Search')" />
    <Image src="~/images/panier.png" col="2" class="nav-icon" @tap="navigateTo('Panier')" />
    <Image src="~/images/favoris.png" col="3" class="nav-icon"  />
    <Image src="~/images/menu.png" col="4" class="nav-icon"  />
  </GridLayout>
</template>

<script>
import { File, knownFolders, path } from '@nativescript/core';
import Search from './Search.vue';
import Panier from './Panier.vue';
import Accueil from './Accueil.vue';


export default {
  name: 'NavBar',
  mounted() {
    this.checkIconsExistence();
  },
  methods: {
    checkIconsExistence() {
      const iconNames = ['accueil', 'chercher', 'panier', 'favoris', 'menu'];
      iconNames.forEach(name => {
        const imagePath = path.join(knownFolders.currentApp().path, `images/${name}.png`);
        console.log(`${name}.png in images folder:`, File.exists(imagePath));
      });
    },
    navigateTo(page) {
      switch(page) {
        case 'Accueil':
          this.$navigateTo(Accueil);
          break;
        case 'Search':
          this.$navigateTo(Search);
          break;
        case 'Panier':
          this.$navigateTo(Panier);
          break;

        case 'Menu':
          console.log('Navigate to Menu - Not implemented yet');
          break;
        default:
          console.log(`Navigate to ${page} - Not implemented`);
      }
    }
  }
}
</script>

<style scoped>
.bottom-nav {
  background-color: #ffffff;
  height: 60;
}
.nav-icon {
  height: 24;
  width: 24;
  vertical-align: middle;
}
</style>
